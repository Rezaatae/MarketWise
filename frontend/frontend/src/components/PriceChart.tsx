import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

type PricePoint = {
  date: string;
  close: number;
};

type PriceChartProps = {
  data: PricePoint[];
};

function PriceChart({ data }: PriceChartProps) {
  return (
    <LineChart width={800} height={400} data={data}>
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="close" stroke="#8884d8" />
    </LineChart>
  );
}

export default PriceChart;