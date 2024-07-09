import Image from 'next/image';
import { currentUser, User } from '@clerk/nextjs/server';
import { db } from '@/drizzle/db';
import { userTable } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import LoginButton from './login-button';
import Link from 'next/link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default async function Header() {
  const user = await currentUser();

  if (
    user &&
    (await db.select().from(userTable).where(eq(userTable.id, user.id)))
      .length === 0
  ) {
    await db.insert(userTable).values({
      id: user.id,
      username: user.firstName!,
      email: user.emailAddresses[0].emailAddress,
    });
  }

  return (
    <>
      <div className="mt-4 text-lg px-4 font-semibold flex items-center justify-between">
        <Link href={'/'}>
          <Image src="/logo2.svg" alt="Logo" height="200" width="200" />
        </Link>
        <div className="flex gap-4">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <LoginButton />
          </SignedOut>
        </div>
      </div>
      <div className="h-[1px] bg-gray-700 mt-2"></div>
    </>
  );
}
