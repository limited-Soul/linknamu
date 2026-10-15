type LinkCardProps = {
  title: string;
  url: string;
  emoji?: string;
};

export default function LinkCard({ title, url, emoji }: LinkCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="relative flex w-full items-center justify-center rounded-3xl border border-white/70 bg-white/45 px-14 py-[18px] text-[15px] font-medium shadow-[0_6px_24px_-10px_rgba(140,80,45,0.25)] backdrop-blur-xl transition duration-300 ease-out hover:-translate-y-0.5 hover:bg-white/60 hover:shadow-[0_10px_28px_-10px_rgba(140,80,45,0.3)] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70"
    >
      {emoji && (
        <span className="absolute left-6 text-lg leading-none" aria-hidden="true">
          {emoji}
        </span>
      )}
      {title}
    </a>
  );
}
