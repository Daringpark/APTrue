import CCTVDetail from '@/components/cctv/cctvDetail';

export default function Page({ params }: { params: { clipRQId: string } }) {
  const { clipRQId } = params;

  return (
    <>
      <CCTVDetail />
    </>
  );
}
