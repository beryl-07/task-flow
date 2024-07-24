import TableExample from "@/pages/data-table/data";

export default function MainPage() {
  // TODO: Add Suspense block to show Loading skeleton
  return (
    <div className='container mx-auto py-4'>
      <TableExample />
    </div>
  );
}
