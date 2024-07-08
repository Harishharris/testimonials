import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { testimonial, spaceTable } from '@/drizzle/schema';
import { db } from '@/drizzle/db';
import { eq, and } from 'drizzle-orm';

export async function POST(req: Request) {
  const user = await currentUser();
  if (!user || !user.id) {
    return redirect('/sign-up');
  }
  const { url } = await req.json();
  const spaceUrl = await db
    .select({ id: spaceTable.id })
    .from(spaceTable)
    .where(eq(spaceTable.userId, user.id));

  const data = await db
    .select({
      id: testimonial.id,
      testimonal: testimonial.testimonial,
      images: testimonial.images,
      name: testimonial.name,
      email: testimonial.email,
      createdAt: testimonial.createdAt,
    })
    .from(testimonial)
    .where(and(eq(testimonial.userId, user.id)));

  return Response.json({ data });
}
