import SpaceHeader from './space-header';
import MainPage from './main-page';

export default function SpacePage({
  params: { url },
}: {
  params: { url: string };
}) {
  return (
    <div>
      <SpaceHeader url={url} />
      <MainPage />
    </div>
  );
}
