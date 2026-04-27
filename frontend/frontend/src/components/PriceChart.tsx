import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import type { PricePoint } from "../types/ui";
import styles from './PriceChart.module.css'

type PriceChartProps = {
  data: PricePoint[];
};

function PriceChart({ data }: PriceChartProps) {
  const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const rawDate = payload[0].payload.date;
    const formattedDate = new Date(rawDate).toLocaleDateString('en-GB', {
      month: 'short',
      day: 'numeric',
    });

    return (
      <div className={styles.tooltip}>
        <p className={styles.tooltipDate}>{formattedDate}</p>
        <p className={styles.tooltipPrice}>
          Price: ${payload[0].value.toFixed(2)}
        </p>
      </div>
    );
  }
  return null;
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Price Chart</h2>
        <div className={styles.legend}>
          <div className={styles.legendItem}>
            <div className={`${styles.legendLine} ${styles.priceLine}`}></div>
            <span>Price</span>
          </div>
        </div>
      </div>
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis
              dataKey="date"
              stroke="#9CA3AF"
              style={{ fontSize: '10px' }}
              tickFormatter={(value) => {
              const date = new Date(value);
              return date.toLocaleDateString('en-GB', {
                month: 'short',
                day: 'numeric',
              });
            }}
            />
        <YAxis
              stroke="#9CA3AF"
              style={{ fontSize: '10px' }}
              domain={['auto', 'auto']}
            />
        <Tooltip content={<CustomTooltip />} />
        <Line
              type="monotone"
              dataKey="close"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
      </LineChart>
    </ResponsiveContainer>
    </div>
  );
}

export default PriceChart;