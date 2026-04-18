type Row = {
  date: string;
  price: {
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
  };
};

export default function OHLCVTable({ data }: { data: Row[] }) {
  if (!data || data.length === 0) return <p>No data</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Open</th>
          <th>High</th>
          <th>Low</th>
          <th>Close</th>
          <th>Volume</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.date}>
            <td>{row.date}</td>
            <td>{row.price.open}</td>
            <td>{row.price.high}</td>
            <td>{row.price.low}</td>
            <td>{row.price.close}</td>
            <td>{row.price.volume}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}