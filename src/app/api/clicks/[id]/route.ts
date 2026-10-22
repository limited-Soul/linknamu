import { getClicksCollection } from "@/lib/mongodb";
import { profile } from "@/data/profile";

// 해당 링크의 클릭 수를 1 증가시키고 증가된 값을 반환
export async function POST(_req: Request, ctx: RouteContext<"/api/clicks/[id]">) {
  const { id } = await ctx.params;

  if (!profile.links.some((link) => link.id === id)) {
    return Response.json({ error: "존재하지 않는 링크입니다." }, { status: 404 });
  }

  const clicks = await getClicksCollection();
  const doc = await clicks.findOneAndUpdate(
    { _id: id },
    { $inc: { count: 1 } },
    { upsert: true, returnDocument: "after" },
  );

  return Response.json({ id, count: doc?.count ?? 1 });
}
