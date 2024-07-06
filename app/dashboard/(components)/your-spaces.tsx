import { Images } from 'lucide-react';

export default function YourSpaces() {
  return (
    <div className="mt-6 hover:cursor-pointer">
      <div className="bg-gray-800 flex flex-col px-10 py-2 border rounded-lg border-slate-400 w-80">
        <div className="flex items-center justify-between gap-8">
          <div>
            <Images />
          </div>
          <div className="text-xl text-semibold">
            your-website-link
            <p>0</p>
          </div>
        </div>
      </div>
    </div>
  );
}
