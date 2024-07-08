export default function FeedbackPage({
  params: { url },
}: {
  params: { url: string };
}) {
  return (
    <div>
      <div>Give Feedback for {url}</div>
    </div>
  );
}
