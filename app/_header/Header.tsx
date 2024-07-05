import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function Header() {
  return (
    <>
      <div className="mt-4 text-lg px-4 font-semibold flex items-center justify-between">
        <Image src="/logo2.svg" alt="Logo" height="200" width="200" />
        <div className="flex gap-4">
          <Button variant="secondary">Login</Button>
          <Button>Sign Up</Button>
        </div>
      </div>
      <div className="h-[1px] bg-gray-700 mt-2"></div>
    </>
  );
}
