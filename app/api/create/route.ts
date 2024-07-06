import { db } from '@/drizzle/db';
import { spaceTable } from '@/drizzle/schema';
import { currentUser } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  const user = await currentUser();
  if (!user || !user.id) {
    return Response.json({ message: 'You are not authenticated' });
  }
  const { name, url } = await req.json();
  await db.insert(spaceTable).values({
    userId: user.id,
    spacename: name,
    spaceUrl: url,
    imageUrl: '',
  });
  return Response.json({ message: 'New Space created successfully.' });
}
