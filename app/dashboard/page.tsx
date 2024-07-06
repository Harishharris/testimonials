import { db } from '@/drizzle/db';
import { spaceTable } from '@/drizzle/schema';
import { currentUser } from '@clerk/nextjs/server';
import Overview from './(components)/overview';
import CreateButton from './(components)/create-new-space-button';
import YourSpaces from './(components)/your-spaces';

export default async function Page() {
  const user = await currentUser();
  if (!user) {
    return null;
  }

  return (
    <div className="max-w-[70%] m-auto">
      <Overview />
      <CreateButton />
      <YourSpaces />
    </div>
  );
}
