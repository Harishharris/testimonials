import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function Home() {
  return (
    <div className="text-center text-6xl font-bold text-gray-300 mt-20 m-auto">
      <div className="max-w-4xl m-auto">
        <div className="mb-6">Get feedback from your customers with ease</div>
        <p className="text-3xl text-gray-600 font-semibold">
          "Read Stories, Real Impack - Discover the difference."
        </p>
        <Button variant={'default'}>
          <Link href={'/dashboard'}>Try Now</Link>
        </Button>
      </div>

      <div className="mt-6 max-w-6xl m-auto mb-8">
        <hr></hr>
      </div>

      <div className="max-w-4xl m-auto text-gray-300">
        <p className="mb-8">
          Add testimonials for your website with no coding at all.
        </p>
        <p className="text-4xl text-gray-600 font-semibold">
          Copy and paste your favorite fronted framework component right into
          your website
        </p>
      </div>
    </div>
  );
}
