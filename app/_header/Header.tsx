import { Button } from '@/components/ui/button';
import {
  SignIn,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import Image from 'next/image';
import { currentUser } from '@clerk/nextjs/server';
import { db } from '@/drizzle/db';
import { userTable } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';

export default async function Header() {
  const user = await currentUser();
  if (!user) {
    return <SignIn />;
  }

  if (!db.select().from(userTable).where(eq(userTable.id, user.id))) {
    await db.insert(userTable).values({
      id: user.id,
      username: user.firstName!,
      email: user.emailAddresses[0].emailAddress,
    });
  }

  return (
    <>
      <div className="mt-4 text-lg px-4 font-semibold flex items-center justify-between">
        <Image src="/logo2.svg" alt="Logo" height="200" width="200" />
        <div className="flex gap-4">
          <SignedOut>
            <Button variant="secondary">
              <SignInButton />
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
      <div className="h-[1px] bg-gray-700 mt-2"></div>
    </>
  );
}
