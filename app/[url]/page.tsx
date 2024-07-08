import SpaceHeader from './space-header';

export default function SpacePage({
  params: { url },
}: {
  params: { url: string };
}) {
  return (
    <div>
      <SpaceHeader url={url} />
    </div>
  );
}
