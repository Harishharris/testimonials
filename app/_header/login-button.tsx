'use client';

import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default function LoginButton() {
  console.log('hi');
  return (
    <Button>
      <Link href="/sign-in">Log In</Link>
    </Button>
  );
}
