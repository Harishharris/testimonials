import { db } from '@/drizzle/db';
import { testimonialTable } from '@/drizzle/schema';
import { currentUser } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  const user = await currentUser();
  if (!user || !user.id) {
    return Response.json('You are not authenticated!');
  }
  const { name, email, testimonial, photos, videoUrl, spaceId } =
    await req.json();
  const data = await db.insert(testimonialTable).values({
    userId: user.id,
    name,
    email,
    testimonial,
    images: photos,
    video: videoUrl,
    spaceId: spaceId,
  });
  return Response.json(data);
}
