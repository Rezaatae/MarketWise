import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import type { components } from "../types/api";

type PricePoint = components["schemas"]["OHLCVRow"]

type PriceChartProps = {
  data: PricePoint[];
};

function PriceChart({ data }: PriceChartProps) {
  return (
    <LineChart width={800} height={400} data={data}>
      <Line type="monotone" dataKey="price.close" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip formatter={(value: any) => value?.close ?? value} />
      <Line type="monotone" dataKey="price.close" stroke="#8884d8" />
    </LineChart>

  );
}

export default PriceChart;