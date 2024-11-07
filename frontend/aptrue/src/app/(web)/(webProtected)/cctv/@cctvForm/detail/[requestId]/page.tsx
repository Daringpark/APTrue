import CCTVDetail from '@/components/cctv/cctvDetail';

export default function Page({ params }: { params: { requestId: string } }) {
  const { requestId } = params;

  return (
    <>
      <CCTVDetail />
    </>
  );
}
