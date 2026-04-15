import React from "react";
import "./OHLCVTable.css";

type OHLCVTableRow = {
  date: string;
  price: {
            /** Open */
            open: number;
            /** High */
            high: number;
            /** Low */
            low: number;
            /** Close */
            close: number;
            /** Volume */
            volume: number;
        };
};

type Props = {
  data: OHLCVTableRow[];
};

const OHLCVTable: React.FC<Props> = ({ data }) => {
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
};

export default OHLCVTable;