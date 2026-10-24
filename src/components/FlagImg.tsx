type FlagImgProps = {
  code: string;
  name?: string;
  size?: number;
  className?: string;
};

export default function FlagImg({ code, name, size = 24, className = '' }: FlagImgProps) {
  const lower = code.toLowerCase();
  return (
    <img
      src={`https://flagcdn.com/w40/${lower}.png`}
      srcSet={`https://flagcdn.com/w80/${lower}.png 2x`}
      width={size}
      height={Math.round((size * 3) / 4)}
      alt={name ? `${name} flag` : `${code} flag`}
      loading="lazy"
      className={`rounded-[3px] object-cover flex-shrink-0 shadow-sm ring-1 ring-black/20 ${className}`}
    />
  );
}
