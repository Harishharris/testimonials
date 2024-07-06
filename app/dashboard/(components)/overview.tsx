import { Video, Images, Book } from 'lucide-react';

export default function Overview() {
  return (
    <div className="mt-4">
      <div className="text-4xl font-semibold">Overview</div>

      <div className="flex items-center justify-between gap-4 mt-8">
        <div className="bg-gray-800 flex flex-col px-10 py-2 border rounded-lg border-slate-400">
          <div className="flex items-center justify-between gap-8">
            <div>
              <Video />
            </div>
            <div className="text-xl text-semibold">
              Videos
              <p>0</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 flex flex-col px-10 py-2 border rounded-lg border-slate-400">
          <div className="flex items-center justify-between gap-8">
            <div>
              <Images />
            </div>
            <div className="text-xl text-semibold">
              Photos
              <p>0</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 flex flex-col px-10 py-2 border rounded-lg border-slate-400">
          <div className="flex items-center justify-between gap-8">
            <div>
              <Book />
            </div>
            <div className="text-xl text-semibold">
              Reviews
              <p>0</p>
            </div>
          </div>
        </div>
      </div>

      <div className="h-[2px] bg-gray-800 mt-10">
        <hr></hr>
      </div>
    </div>
  );
}
