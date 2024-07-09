import { db } from '@/drizzle/db';
import { spaceTable } from '@/drizzle/schema';
import { currentUser } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { space } from 'postcss/lib/list';

export async function GET(
  req: Request,
  { params: { id } }: { params: { id: string } }
) {
  const user = await currentUser();
  if (!user || !user.id) {
    return Response.json({ message: 'You are not authenticated!' });
  }
  return Response.json({
    message: await db
      .select({ imageUrl: spaceTable.imageUrl })
      .from(spaceTable)
      .where(eq(spaceTable.id, id)),
  });
}
