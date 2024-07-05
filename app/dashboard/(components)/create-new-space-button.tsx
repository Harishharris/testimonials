import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function CreateButton() {
  return (
    <div className="mt-6">
      <Link href="/dashboard/create">
        <Button className="flex gap-2">
          <Plus />
          Create new space
        </Button>
      </Link>
    </div>
  );
}
