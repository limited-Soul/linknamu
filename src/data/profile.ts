export type LinkItem = {
  id: string;
  title: string;
  url: string;
  emoji?: string;
};

export type Profile = {
  name: string;
  bio: string;
  imageUrl: string;
  links: LinkItem[];
};

// TODO: 실제 프로필 사진과 링크로 교체
export const profile: Profile = {
  name: "유한솔",
  bio: "풀스택 개발자/BA | 업무프로세스 및 개발에 AI 도입에 관심이 많아요",
  imageUrl: "/profile.jpg",
  links: [
    { id: "github", title: "GitHub", url: "https://github.com/limited-Soul", emoji: "🐙" },
    { id: "instagram", title: "Instagram", url: "https://www.instagram.com/_limited_soul__", emoji: "📸" },
    { id: "email", title: "Email", url: "mailto:withyourluv@gmail.com", emoji: "📧" },
  ],
};
