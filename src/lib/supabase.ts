import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

const NOT_CONFIGURED = { message: 'Supabase not configured' };
const ERROR_RESULT = { data: null, error: NOT_CONFIGURED };

function chainable() {
  const builder: Record<string, unknown> = {};
  const chain = () => builder;
  const methods = [
    'select', 'insert', 'update', 'delete', 'upsert',
    'eq', 'neq', 'order', 'limit', 'range', 'single', 'maybeSingle',
    'in', 'like', 'ilike', 'is', 'not', 'or', 'filter', 'match',
    'contains', 'containedBy', 'rangeGte', 'rangeLte', 'rangeGt', 'rangeLt',
    'overlaps', 'textSearch', 'columns',
  ];
  for (const m of methods) builder[m] = chain;
  builder.then = (resolve: (v: typeof ERROR_RESULT) => void) =>
    Promise.resolve(ERROR_RESULT).then(resolve);
  builder.catch = (reject: (e: unknown) => void) =>
    Promise.resolve(ERROR_RESULT).catch(reject);
  return builder;
}

function createSupabase(): SupabaseClient {
  if (supabaseUrl && supabaseAnonKey) {
    return createClient(supabaseUrl, supabaseAnonKey);
  }
  console.warn('Supabase env vars missing — running in offline mode.');
  const stub = {
    from: () => chainable(),
    storage: {
      from: () => ({
        upload: () => ERROR_RESULT,
        remove: () => ERROR_RESULT,
        getPublicUrl: () => ({ data: { publicUrl: '' } }),
        list: () => ERROR_RESULT,
      }),
    },
    channel: () => ({
      on: () => ({
        on: () => ({ subscribe: () => undefined }),
        subscribe: () => undefined,
      }),
      subscribe: () => undefined,
    }),
    removeChannel: () => undefined,
  };
  return stub as unknown as SupabaseClient;
}

export const supabase = createSupabase();
