import CCTVListItem from './cctvListItem';

export default function CCTVList({ data }: { data: CCTVItem[] }) {
  console.log(data);

  const items = [...data, ...Array(10 - data.length).fill(undefined)];
  return (
    <>
      {items.map((item, index) =>
        item ? (
          <CCTVListItem key={`${item.clipRQId}`} item={item} num={index + 1} />
        ) : (
          <CCTVListItem key={`empty-${index}`} num={index + 1} />
        ),
      )}
    </>
  );
}
