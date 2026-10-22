"use client";

import { useEffect, useState } from "react";
import LinkCard from "@/components/LinkCard";
import type { LinkItem } from "@/data/profile";

type LinkListProps = {
  links: LinkItem[];
};

export default function LinkList({ links }: LinkListProps) {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/clicks", { signal: controller.signal, cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: Record<string, number> | null) => {
        // 응답 전에 눌린 클릭이 사라지지 않도록 더 큰 값을 유지
        if (data) {
          setCounts((prev) => {
            const next = { ...data };
            for (const [id, count] of Object.entries(prev)) {
              next[id] = Math.max(next[id] ?? 0, count);
            }
            return next;
          });
        }
      })
      .catch(() => {});

    return () => controller.abort();
  }, []);

  function handleClick(id: string) {
    setCounts((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));

    // 새 탭으로 이동해도 요청이 끊기지 않도록 keepalive 사용
    fetch(`/api/clicks/${encodeURIComponent(id)}`, { method: "POST", keepalive: true })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { id: string; count: number } | null) => {
        if (data) {
          setCounts((prev) => ({ ...prev, [data.id]: Math.max(prev[data.id] ?? 0, data.count) }));
        }
      })
      .catch(() => {});
  }

  return (
    <ul className="mt-12 flex flex-col gap-4">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard
            title={link.title}
            url={link.url}
            emoji={link.emoji}
            clickCount={counts[link.id] ?? 0}
            onClick={() => handleClick(link.id)}
          />
        </li>
      ))}
    </ul>
  );
}
