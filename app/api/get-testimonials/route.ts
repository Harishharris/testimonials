import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { testimonialTable, spaceTable } from '@/drizzle/schema';
import { db } from '@/drizzle/db';
import { eq, and } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const user = await currentUser();
  if (!user || !user.id) {
    return redirect('/sign-up');
  }
  const { url } = await req.json();
  // const spaceUrl = await db
  //   .select({ id: spaceTable.id })
  //   .from(spaceTable)
  //   .where(eq(spaceTable.userId, user.id));

  const data = await db
    .select({
      id: testimonialTable.id,
      testimonal: testimonialTable.testimonial,
      images: testimonialTable.images,
      name: testimonialTable.name,
      email: testimonialTable.email,
      createdAt: testimonialTable.createdAt,
    })
    .from(testimonialTable)
    .where(
      and(
        eq(testimonialTable.userId, user.id),
        eq(testimonialTable.spaceId, url)
      )
    );

  return Response.json({ data });
}
