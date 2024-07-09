import { Button } from '@/components/ui/button';
import { db } from '@/drizzle/db';
import { spaceTable } from '@/drizzle/schema';
import { currentUser } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { Pen } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function SpaceHeader({ url }: { url: string }) {
  const user = await currentUser();
  if (!user || !user.id) {
    return redirect('/sign-in');
  }
  const data = await db
    .select({
      spacename: spaceTable.spacename,
      url: spaceTable.spaceUrl,
      imageUrl: spaceTable.imageUrl,
    })
    .from(spaceTable)
    .where(eq(spaceTable.userId, user.id))
    .limit(1);

  return (
    <div className="mt-4 ">
      <div className="flex gap-12 max-w-[80%] m-auto items-center">
        <Image
          src={data[0].imageUrl!}
          alt="image"
          width={200}
          height={100}
          className="rounded-lg"
        />
        <div className="flex flex-col gap-8 items-start justify-center">
          <div className="font-bold text-4xl">{data[0].spacename}</div>
          <div className="text-md">
            Share Public Testimonial Link:{' '}
            <Link href={`http://testimonials-steel.vercel.app/feedback/${url}`}>
              <span className="underline cursor-pointer">{`http://testimonials-steel.vercel.app/feedback/${url}`}</span>
            </Link>
          </div>
        </div>
        <Link href={`/${url}/edit`}>
          <Button className="flex gap-2 items-center justify-center">
            <Pen />
            Edit Space
          </Button>
        </Link>
      </div>
      <div className="h-[1px] bg-gray-800 mt-4"></div>
    </div>
  );
}
