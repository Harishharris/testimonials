import { Video, Images, Book } from 'lucide-react';
import { db } from '@/drizzle/db';
import { testimonialTable } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';

export default async function Overview() {
  const data = await db
    .select({
      id: testimonialTable.id,
      images: testimonialTable.images,
      videos: testimonialTable.video,
    })
    .from(testimonialTable);
  const videoCount = data.filter((item) => item.videos?.length !== 0).length;
  const photoCount = data.filter((item) => item.images?.length !== 0).length;

  return (
    <div className="mt-4">
      <div className="text-4xl font-semibold">Overview</div>

      <div className="flex items-center justify-between gap-4 mt-8">
        <div className="bg-gray-800 flex flex-col px-10 py-2 border rounded-lg border-slate-400">
          <div className="flex items-center justify-between gap-8">
            <div>
              <Video />
            </div>
            <div className="text-xl text-semibold">
              Videos
              <p>{videoCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 flex flex-col px-10 py-2 border rounded-lg border-slate-400">
          <div className="flex items-center justify-between gap-8">
            <div>
              <Images />
            </div>
            <div className="text-xl text-semibold">
              Photos
              <p>{photoCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 flex flex-col px-10 py-2 border rounded-lg border-slate-400">
          <div className="flex items-center justify-between gap-8">
            <div>
              <Book />
            </div>
            <div className="text-xl text-semibold">
              Reviews
              <p>{photoCount + videoCount}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="h-[2px] bg-gray-800 mt-10">
        <hr></hr>
      </div>
    </div>
  );
}
