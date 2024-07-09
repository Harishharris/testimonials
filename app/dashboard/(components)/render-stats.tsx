import { db } from '@/drizzle/db';
import { testimonialTable } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';

export default async function RenderStats({ url }: { url: string }) {
  const statsCount = await db
    .select({
      id: testimonialTable.id,
      images: testimonialTable.images,
      videos: testimonialTable.video,
    })
    .from(testimonialTable)
    .where(eq(testimonialTable.spaceId, url));

  const videoCount = statsCount.filter(
    (item) => item.videos?.length !== 0
  ).length;
  const photoCount = statsCount.filter(
    (item) => item.images?.length !== 0
  ).length;

  return (
    <div className="flex gap-4">
      <p>Videos: {videoCount}</p>
      <p>Text: {photoCount}</p>
    </div>
  );
}
