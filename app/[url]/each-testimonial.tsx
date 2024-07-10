import { Star } from 'lucide-react';
import { TestimoniaType } from './all-testimonials';
import Image from 'next/image';
import RenderImageWithPopOver from './render-image-with-popover';
import { Button } from '@/components/ui/button';
import ExportButton from './export-button';

export default function EachTestimonialPage({
  testimonial,
}: {
  testimonial: TestimoniaType;
}) {
  console.log(testimonial);
  function whichMediaUsed() {
    if (testimonial.video) {
      return 'Video';
    }
    if (testimonial.images) {
      return 'Images';
    }
    return 'Text';
  }

  return (
    <div className="flex-1 bg-gray-800 p-6 rounded-md gap-2 md-4 hover:bg-gray-700 cursor-pointer">
      <span className="font-bold text-xl text-black bg-orange-300 px-3 rounded-full">
        {whichMediaUsed()}
      </span>
      <div className="flex items-center justify-start gap-1 mb-2">
        <Star fill="yellow" className="mt-4" />
        <Star fill="yellow" className="mt-4" />
        <Star fill="yellow" className="mt-4" />
        <Star fill="yellow" className="mt-4" />
        <Star fill="yellow" className="mt-4" />
      </div>
      <p className="mb-2">{testimonial.testimonal}</p>
      <div className="flex gap-4 my-4">
        {testimonial?.images?.map((item) => (
          <RenderImageWithPopOver src={item} key={item} />
        ))}
      </div>
      <div>
        {testimonial.video && (
          <iframe
            allowFullScreen
            allowTransparency
            src={testimonial.video}
          ></iframe>
        )}
      </div>
      <div className="flex items-center gap-[40%]">
        <div>
          <p className="font-semibold">Name</p>
          <p>{testimonial.name}</p>
        </div>
        <div>
          <p className="font-semibold">Email</p>
          <p>{testimonial.email}</p>
        </div>
      </div>
      <br />
      <div className="flex gap-[40%]">
        <div>
          <p className="font-semibold">Submitted At:</p>
          <p>{testimonial.createdAt.toString()}</p>
        </div>
        <ExportButton testimonial={testimonial.testimonal} />
      </div>
    </div>
  );
}
