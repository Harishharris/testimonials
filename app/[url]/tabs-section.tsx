export default function CurrentTabSection({
  currentTab,
}: {
  currentTab: string;
}) {
  return (
    <div>
      <div>Current Tab section</div>
      <div>{currentTab}</div>
    </div>
  );
}
