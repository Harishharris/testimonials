import { Images } from 'lucide-react';
import { db } from '@/drizzle/db';
import { spaceTable, testimonialTable, userTable } from '@/drizzle/schema';
import { currentUser } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import RenderStats from './render-stats';
import Image from 'next/image';

export default async function YourSpaces() {
  const user = await currentUser();

  if (!user || !user.id) {
    return redirect('/sign-in');
  }

  const data = await db
    .select({
      id: spaceTable.id,
      url: spaceTable.spaceUrl,
      imageUrl: spaceTable.imageUrl,
    })
    .from(spaceTable)
    .where(eq(spaceTable.userId, user.id));

  return (
    <div className="mt-6 hover:cursor-pointer grid grid-cols-3 gap-6">
      {data.map((item) => (
        <Link href={item.id} key={item.id}>
          <div className="bg-gray-800 flex px-10 py-4 border rounded-lg border-slate-400 w-80">
            <div className="flex items-center justify-between gap-8">
              <div>
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl!}
                    height={40}
                    width={60}
                    alt="Image"
                  />
                ) : (
                  <Images />
                )}
              </div>

              <div className="text-xl text-semibold flex flex-col gap-2">
                {item.url}
                <RenderStats url={item.id} />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
