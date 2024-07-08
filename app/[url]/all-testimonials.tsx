import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import EachTestimonialPage from './each-testimonial';

export interface TestimoniaType {
  id: string;
  testimonal: string;
  images: string[];
  video: string;
  name: string;
  email: string;
  createdAt: Date;
}

export default function RenderAllTestimonials({
  currentTab,
}: {
  currentTab: string;
}) {
  const params = useParams();
  const [testimonials, setTestimonials] = useState<TestimoniaType[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/get-testimonials', {
          method: 'POST',
          body: JSON.stringify({
            url: params.url,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        setTestimonials(data.data);
      } catch (err: any) {
        console.log(err.message);
      }
    };
    fetchData();
  }, [params, params.url]);

  return (
    <div className="flex-1">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Search />
        <Input placeholder="Search by name, email or testimonial keywords" />
      </div>
      {testimonials?.length === 0 ? (
        <div>No Testimonials to show..</div>
      ) : (
        <div className="flex-1 flex flex-col gap-4">
          {testimonials?.map((item) => (
            <div key={item.id} className="flex-1">
              <EachTestimonialPage testimonial={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
