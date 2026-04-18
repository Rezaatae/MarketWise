type Props = {
  value: string;
  onChange: (val: string) => void;
};

export default function SymbolInput({ value, onChange }: Props) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Enter symbol"
    />
  );
}