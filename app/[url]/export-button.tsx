import { Button } from '@/components/ui/button';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function ExportButton({ testimonial }: { testimonial: string }) {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>Export</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>React.js</DialogTitle>
          <DialogDescription className="text-wrap">
            <pre className="text-wrap">
              {`export default function Testimonial() {
  return (
    <div>
      <p>
        ${testimonial}
      </p>
    </div>
  )
}`}
            </pre>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
