import { useEffect, useState, useCallback, useRef } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Plus,
  UploadCloud,
  Trash2,
  Pencil,
  Loader2,
  Image as ImageIcon,
  ExternalLink,
  LayoutGrid,
  Columns3,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

type Photo = {
  id: string;
  url: string;
  caption: string | null;
  title: string | null;
  description: string | null;
  category: string | null;
  link_url: string | null;
  link_label: string | null;
};

type EditData = {
  caption: string;
  title: string;
  description: string;
  category: string;
  link_url: string;
  link_label: string;
};

const ADMIN_CODE = 'A2YOrx@1';
const STORAGE_KEY = 'ccc_admin_session';

const CATEGORIES = ['Tournament', 'Trophy', 'Training', 'Event', 'News'];
const FILTERS = ['All', ...CATEGORIES];

const inputCls =
  'w-full rounded-xl bg-ink-950 border border-ink-700/60 px-4 py-3 text-ink-100 placeholder-ink-500 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500/40 transition-colors text-sm';

const labelCls = 'block text-xs uppercase tracking-wider text-ink-300 mb-1.5';

export default function Gallery() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<number | null>(null);
  const [adminOpen, setAdminOpen] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<Photo | null>(null);
  const [isAdmin, setIsAdmin] = useState(() => sessionStorage.getItem(STORAGE_KEY) === '1');
  const [uploading, setUploading] = useState(false);
  const [filter, setFilter] = useState('All');
  const [layout, setLayout] = useState<'masonry' | 'grid'>('masonry');

  const fetchPhotos = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('gallery_photos')
      .select('id, url, caption, title, description, category, link_url, link_label')
      .order('created_at', { ascending: false });
    if (!error && data) setPhotos(data as Photo[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  const filtered =
    filter === 'All'
      ? photos
      : photos.filter((p) => (p.category || '').toLowerCase() === filter.toLowerCase());

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
      if (e.key === 'ArrowRight')
        setActive((i) => (i === null ? i : (i + 1) % filtered.length));
      if (e.key === 'ArrowLeft')
        setActive((i) => (i === null ? i : (i - 1 + filtered.length) % filtered.length));
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [active, filtered.length]);

  async function handleUpload(files: FileList, edit: EditData) {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}.${fileExt}`;
        const filePath = `gallery/${fileName}`;

        const { error: upErr } = await supabase.storage.from('gallery').upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });
        if (upErr) throw upErr;

        const { data: pub } = supabase.storage.from('gallery').getPublicUrl(filePath);
        const { error: dbErr } = await supabase.from('gallery_photos').insert({
          url: pub.publicUrl,
          caption: edit.caption || null,
          title: edit.title || null,
          description: edit.description || null,
          category: edit.category || null,
          link_url: edit.link_url || null,
          link_label: edit.link_label || null,
        });
        if (dbErr) throw dbErr;
      }
      await fetchPhotos();
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : 'Upload failed. Please try again.';
      const friendly =
        /failed to fetch|networkrequestfailed|load failed/i.test(msg)
          ? 'Could not reach the server. Please check your internet connection and try again.'
          : /storage.*not found|bucket/i.test(msg)
            ? 'The photo storage is not available. Please contact support.'
            : msg;
      alert(friendly);
    } finally {
      setUploading(false);
    }
  }

  async function handleEdit(id: string, edit: EditData) {
    const { error } = await supabase
      .from('gallery_photos')
      .update({
        caption: edit.caption || null,
        title: edit.title || null,
        description: edit.description || null,
        category: edit.category || null,
        link_url: edit.link_url || null,
        link_label: edit.link_label || null,
      })
      .eq('id', id);
    if (error) {
      alert(error.message);
      return;
    }
    await fetchPhotos();
  }

  async function handleDelete(id: string, url: string) {
    if (!confirm('Remove this photo?')) return;
    try {
      const match = url.match(/gallery\/(.+)$/);
      if (match) {
        await supabase.storage.from('gallery').remove([`gallery/${match[1]}`]);
      }
      await supabase.from('gallery_photos').delete().eq('id', id);
      setPhotos((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Could not delete photo.');
    }
  }

  const current = active !== null ? filtered[active] : null;

  return (
    <section id="gallery" className="relative py-28 bg-gradient-to-b from-ink-900 to-ink-950">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto reveal">
          <span className="text-xs uppercase tracking-[0.3em] text-gold-600">News & Gallery</span>
          <h2 className="mt-4 font-display text-4xl lg:text-5xl font-semibold text-ink-50 text-balance">
            Tournaments, trophies & moments
          </h2>
          <p className="mt-4 text-ink-300">
            A peek into life at the centre — click any photo to open the full-screen
            viewer and flip through with the arrows or your keyboard.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 reveal">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => {
                  setFilter(f);
                  setActive(null);
                }}
                className={`px-4 py-1.5 rounded-full text-sm transition-all duration-300 ${
                  filter === f
                    ? 'bg-gradient-to-r from-gold-500 to-gold-400 text-white font-semibold shadow-glow-gold'
                    : 'border border-ink-700/60 text-ink-300 hover:border-gold-500/40 hover:text-gold-700'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex rounded-full border border-ink-700/60 p-0.5">
              <button
                onClick={() => setLayout('masonry')}
                className={`grid place-items-center w-8 h-8 rounded-full transition-colors ${
                  layout === 'masonry' ? 'bg-gold-500/20 text-gold-400' : 'text-ink-400 hover:text-ink-200'
                }`}
                title="Masonry layout"
              >
                <Columns3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setLayout('grid')}
                className={`grid place-items-center w-8 h-8 rounded-full transition-colors ${
                  layout === 'grid' ? 'bg-gold-500/20 text-gold-400' : 'text-ink-400 hover:text-ink-200'
                }`}
                title="Grid layout"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={() => setAdminOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-ink-700/60 text-ink-300 hover:border-gold-500/40 hover:text-gold-700 text-sm transition-all"
            >
              <Plus className="w-4 h-4" /> Admin
            </button>
          </div>
        </div>

        {loading ? (
          <div className="mt-14 grid place-items-center py-20">
            <Loader2 className="w-8 h-8 text-gold-600 animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="mt-14 grid place-items-center py-20 text-ink-400">
            <ImageIcon className="w-10 h-10 mb-3 opacity-50" />
            <p>No photos in this category yet.</p>
          </div>
        ) : layout === 'masonry' ? (
          <div className="mt-10 columns-2 md:columns-3 lg:columns-4 gap-4 [&>*]:mb-4">
            {filtered.map((p, i) => (
              <GalleryThumb
                key={p.id}
                photo={p}
                index={i}
                isAdmin={isAdmin}
                onClick={() => setActive(i)}
                onDelete={() => handleDelete(p.id, p.url)}
                onEdit={() => setEditingPhoto(p)}
              />
            ))}
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((p, i) => (
              <GalleryThumb
                key={p.id}
                photo={p}
                index={i}
                isAdmin={isAdmin}
                square
                onClick={() => setActive(i)}
                onDelete={() => handleDelete(p.id, p.url)}
                onEdit={() => setEditingPhoto(p)}
              />
            ))}
          </div>
        )}
      </div>

      {current && (
        <Lightbox
          photo={current}
          index={active!}
          total={filtered.length}
          onClose={() => setActive(null)}
          onPrev={() => setActive((i) => (i === null ? i : (i - 1 + filtered.length) % filtered.length))}
          onNext={() => setActive((i) => (i === null ? i : (i + 1) % filtered.length))}
        />
      )}

      {adminOpen && (
        <AdminModal
          onClose={() => setAdminOpen(false)}
          isAdmin={isAdmin}
          onAuthed={() => {
            setIsAdmin(true);
            sessionStorage.setItem(STORAGE_KEY, '1');
          }}
          onUpload={handleUpload}
          uploading={uploading}
        />
      )}

      {editingPhoto && (
        <EditModal
          photo={editingPhoto}
          onClose={() => setEditingPhoto(null)}
          onSave={(edit) => {
            handleEdit(editingPhoto.id, edit);
            setEditingPhoto(null);
          }}
        />
      )}
    </section>
  );
}

function GalleryThumb({
  photo,
  isAdmin,
  square,
  onClick,
  onDelete,
  onEdit,
}: {
  photo: Photo;
  index: number;
  isAdmin: boolean;
  square?: boolean;
  onClick: () => void;
  onDelete: () => void;
  onEdit: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`group relative w-full overflow-hidden rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500 shadow-soft ${
        square ? 'aspect-square' : ''
      }`}
    >
      <img
        src={photo.url}
        alt={photo.title || photo.caption || 'Gallery photo'}
        loading="eager"
        className={`w-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ${
          square ? 'h-full' : ''
        }`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
      {(photo.title || photo.caption) && (
        <span className="absolute bottom-3 left-3 right-3 text-left text-xs text-ink-100 line-clamp-2">
          {photo.title || photo.caption}
        </span>
      )}
      {photo.category && (
        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-ink-950/70 backdrop-blur-sm text-[10px] uppercase tracking-wider text-gold-300 border border-gold-500/20">
          {photo.category}
        </span>
      )}
      {photo.link_url && (
        <span className="absolute top-2 right-2 grid place-items-center w-6 h-6 rounded-full bg-gold-500/80 text-white opacity-0 group-hover:opacity-100 transition-opacity">
          <ExternalLink className="w-3 h-3" />
        </span>
      )}
      {isAdmin && (
        <div className="absolute bottom-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <span
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="grid place-items-center w-7 h-7 rounded-full bg-ink-800/90 text-gold-300 hover:bg-ink-700"
            title="Edit photo"
          >
            <Pencil className="w-3.5 h-3.5" />
          </span>
          <span
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="grid place-items-center w-7 h-7 rounded-full bg-red-500/80 text-white hover:bg-red-600"
            title="Delete photo"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </span>
        </div>
      )}
    </button>
  );
}

function Lightbox({
  photo,
  index,
  total,
  onClose,
  onPrev,
  onNext,
}: {
  photo: Photo;
  index: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const touchStartX = useRef<number | null>(null);

  return (
    <div
      className="fixed inset-0 z-[100] bg-ink-950/95 backdrop-blur-md flex items-center justify-center animate-fade-in"
      onClick={onClose}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        if (dx > 50) onPrev();
        else if (dx < -50) onNext();
        touchStartX.current = null;
      }}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-5 right-5 z-10 grid place-items-center w-11 h-11 rounded-full bg-ink-800/80 text-ink-100 hover:text-gold-300 hover:bg-ink-700 transition-colors"
        aria-label="Close"
      >
        <X className="w-6 h-6" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-3 sm:left-6 z-10 grid place-items-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-ink-800/80 text-ink-100 hover:text-gold-300 hover:bg-ink-700 hover:scale-110 transition-all duration-200 shadow-lg"
        aria-label="Previous"
      >
        <ChevronLeft className="w-7 h-7 sm:w-8 sm:h-8" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-3 sm:right-6 z-10 grid place-items-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-ink-800/80 text-ink-100 hover:text-gold-300 hover:bg-ink-700 hover:scale-110 transition-all duration-200 shadow-lg"
        aria-label="Next"
      >
        <ChevronRight className="w-7 h-7 sm:w-8 sm:h-8" />
      </button>

      <figure
        className="max-w-5xl w-full px-16 sm:px-20 flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={photo.url}
          alt={photo.title || photo.caption || 'Gallery photo'}
          className="max-w-full max-h-[68vh] object-contain rounded-lg shadow-2xl"
        />

        <div className="mt-5 w-full max-w-2xl text-center">
          {photo.category && (
            <span className="inline-block px-3 py-1 rounded-full bg-gold-500/15 text-gold-300 text-[10px] uppercase tracking-wider border border-gold-500/20 mb-3">
              {photo.category}
            </span>
          )}
          {photo.title && (
            <h3 className="font-display text-2xl font-semibold text-ink-50">{photo.title}</h3>
          )}
          {photo.description && (
            <p className="mt-2 text-ink-200 text-sm leading-relaxed">{photo.description}</p>
          )}
          {!photo.title && !photo.description && photo.caption && (
            <p className="mt-2 text-ink-200 text-sm leading-relaxed">{photo.caption}</p>
          )}

          {photo.link_url && (
            <a
              href={photo.link_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 text-white text-sm font-semibold hover:shadow-glow-gold transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              {photo.link_label || 'View Details'}
            </a>
          )}

          <div className="mt-4 flex items-center justify-center gap-3 text-xs text-ink-400">
            <span>
              {index + 1} / {total}
            </span>
            <span className="text-ink-600">|</span>
            <span className="hidden sm:inline">Use arrow keys to navigate</span>
          </div>
        </div>
      </figure>
    </div>
  );
}

function AdminModal({
  onClose,
  isAdmin,
  onAuthed,
  onUpload,
  uploading,
}: {
  onClose: () => void;
  isAdmin: boolean;
  onAuthed: () => void;
  onUpload: (files: FileList, edit: EditData) => void;
  uploading: boolean;
}) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [files, setFiles] = useState<FileList | null>(null);
  const [edit, setEdit] = useState<EditData>({
    caption: '',
    title: '',
    description: '',
    category: 'Tournament',
    link_url: '',
    link_label: '',
  });

  function auth(e: React.FormEvent) {
    e.preventDefault();
    if (code === ADMIN_CODE) {
      onAuthed();
      setError('');
    } else {
      setError('Incorrect admin code.');
    }
  }

  return (
    <div
      className="fixed inset-0 z-[110] bg-ink-950/80 backdrop-blur-sm grid place-items-center p-6 animate-fade-in overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl border border-gold-500/20 bg-ink-900 p-7 shadow-card my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display text-xl font-semibold text-ink-50">Admin Upload</h3>
          <button onClick={onClose} className="text-ink-400 hover:text-gold-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isAdmin ? (
          <form onSubmit={auth} className="space-y-4">
            <p className="text-sm text-ink-300">Enter the admin code to upload photos.</p>
            <input
              type="password"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Admin code"
              className={inputCls}
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              className="w-full px-5 py-3 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 text-white font-semibold"
            >
              Unlock
            </button>
          </form>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (files) onUpload(files, edit);
            }}
            className="space-y-4"
          >
            <div>
              <label className={labelCls}>Photos</label>
              <label className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-ink-700/60 hover:border-gold-500/40 px-4 py-8 cursor-pointer transition-colors">
                <UploadCloud className="w-8 h-8 text-gold-600/70" />
                <span className="text-sm text-ink-300">
                  {files ? `${files.length} file(s) selected` : 'Click to choose images'}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => setFiles(e.target.files)}
                />
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Title (optional)</label>
                <input
                  value={edit.title}
                  onChange={(e) => setEdit({ ...edit, title: e.target.value })}
                  className={inputCls}
                  placeholder="e.g. State Championship 2026"
                />
              </div>
              <div>
                <label className={labelCls}>Category</label>
                <select
                  value={edit.category}
                  onChange={(e) => setEdit({ ...edit, category: e.target.value })}
                  className={inputCls}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className={labelCls}>Description (optional)</label>
              <textarea
                value={edit.description}
                onChange={(e) => setEdit({ ...edit, description: e.target.value })}
                className={`${inputCls} resize-none`}
                rows={2}
                placeholder="A longer caption shown in the lightbox"
              />
            </div>

            <div>
              <label className={labelCls}>Short Caption (optional)</label>
              <input
                value={edit.caption}
                onChange={(e) => setEdit({ ...edit, caption: e.target.value })}
                className={inputCls}
                placeholder="Brief overlay text on the thumbnail"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Link URL (optional)</label>
                <input
                  value={edit.link_url}
                  onChange={(e) => setEdit({ ...edit, link_url: e.target.value })}
                  className={inputCls}
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className={labelCls}>Link Button Label</label>
                <input
                  value={edit.link_label}
                  onChange={(e) => setEdit({ ...edit, link_label: e.target.value })}
                  className={inputCls}
                  placeholder="View Tournament Details"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!files || uploading}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Uploading...
                </>
              ) : (
                <>
                  <UploadCloud className="w-4 h-4" /> Upload
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function EditModal({
  photo,
  onClose,
  onSave,
}: {
  photo: Photo;
  onClose: () => void;
  onSave: (edit: EditData) => void;
}) {
  const [edit, setEdit] = useState<EditData>({
    caption: photo.caption || '',
    title: photo.title || '',
    description: photo.description || '',
    category: photo.category || 'Tournament',
    link_url: photo.link_url || '',
    link_label: photo.link_label || '',
  });

  return (
    <div
      className="fixed inset-0 z-[110] bg-ink-950/80 backdrop-blur-sm grid place-items-center p-6 animate-fade-in overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl border border-gold-500/20 bg-ink-900 p-7 shadow-card my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display text-xl font-semibold text-ink-50">Edit Photo</h3>
          <button onClick={onClose} className="text-ink-400 hover:text-gold-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-4 rounded-xl overflow-hidden max-h-48">
          <img src={photo.url} alt="" className="w-full object-cover" />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(edit);
          }}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Title</label>
              <input
                value={edit.title}
                onChange={(e) => setEdit({ ...edit, title: e.target.value })}
                className={inputCls}
                placeholder="Photo title"
              />
            </div>
            <div>
              <label className={labelCls}>Category</label>
              <select
                value={edit.category}
                onChange={(e) => setEdit({ ...edit, category: e.target.value })}
                className={inputCls}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className={labelCls}>Description</label>
            <textarea
              value={edit.description}
              onChange={(e) => setEdit({ ...edit, description: e.target.value })}
              className={`${inputCls} resize-none`}
              rows={2}
              placeholder="Longer description for the lightbox"
            />
          </div>

          <div>
            <label className={labelCls}>Short Caption</label>
            <input
              value={edit.caption}
              onChange={(e) => setEdit({ ...edit, caption: e.target.value })}
              className={inputCls}
              placeholder="Brief overlay text"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Link URL</label>
              <input
                value={edit.link_url}
                onChange={(e) => setEdit({ ...edit, link_url: e.target.value })}
                className={inputCls}
                placeholder="https://..."
              />
            </div>
            <div>
              <label className={labelCls}>Link Button Label</label>
              <input
                value={edit.link_label}
                onChange={(e) => setEdit({ ...edit, link_label: e.target.value })}
                className={inputCls}
                placeholder="View Tournament Details"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 text-white font-semibold"
          >
            <Pencil className="w-4 h-4" /> Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
