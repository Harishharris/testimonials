import { Star } from 'lucide-react';
import { TestimoniaType } from './all-testimonials';

export default function EachTestimonialPage({
  testimonial,
}: {
  testimonial: TestimoniaType;
}) {
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
      <span className="font-bold text-xl bg-orange-300 px-3 rounded-full ">
        {whichMediaUsed()}
      </span>
      <Star fill="yellow" />
      <p>{testimonial.testimonal}</p>
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
      {/* <p>{testimonial.createdAt?.toDateString() || 'Date not provided'}</p>*/}
    </div>
  );
}
