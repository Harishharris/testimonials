import Image from 'next/image';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export default function RenderImageWithPopOver({ src }: { src: string }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Image src={src} alt="image" height={100} width={200} />
      </AlertDialogTrigger>
      <AlertDialogContent className="m-auto w-auto">
        <AlertDialogDescription>
          <img src={src} alt="image" className="h-full w-full" />
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
