import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

type Props = {
  timestamps: string[];
  returns: (number | null)[];
};

function ReturnsChart({ timestamps, returns }: Props) {
  // Combine arrays into chart-friendly format
  const chartData = timestamps.map((date, i) => ({
    date,
    value: returns[i],
  }));

  return (
    <div>
      <h3>Simple Returns</h3>
      <LineChart width={800} height={400} data={chartData}>
        <Line
          type="monotone"
          dataKey="value"
          stroke="#82ca9d"
          dot={false}
        />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip
          formatter={(value: number | null) =>
            value != null ? value.toFixed(4) : "N/A"
          }
        />
      </LineChart>
    </div>
  );
}

export default ReturnsChart;