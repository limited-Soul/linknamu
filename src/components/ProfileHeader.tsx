import Image from "next/image";

type ProfileHeaderProps = {
  name: string;
  bio: string;
  imageUrl: string;
};

export default function ProfileHeader({ name, bio, imageUrl }: ProfileHeaderProps) {
  return (
    <header className="flex flex-col items-center text-center">
      <div className="rounded-full bg-gradient-to-b from-white/90 to-white/40 p-1.5 shadow-[0_18px_40px_-14px_rgba(140,80,45,0.45),0_2px_6px_rgba(140,80,45,0.08)]">
        <Image
          src={imageUrl}
          alt={`${name} 프로필 사진`}
          width={112}
          height={112}
          preload
          className="h-28 w-28 rounded-full object-cover"
        />
      </div>
      <h1 className="mt-6 text-2xl font-semibold tracking-tight">{name}</h1>
      <p className="mt-2 max-w-xs text-[15px] leading-relaxed text-stone-600 break-keep">{bio}</p>
    </header>
  );
}
