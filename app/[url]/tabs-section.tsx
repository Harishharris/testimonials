import RenderAllTestimonials from './all-testimonials';

export default function CurrentTabSection({
  currentTab,
}: {
  currentTab: string;
}) {
  return (
    <div className="flex-1">
      <RenderAllTestimonials currentTab={currentTab} />
    </div>
  );
}
