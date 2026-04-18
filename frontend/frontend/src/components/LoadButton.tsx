type Props = {
  onClick: () => void;
  loading: boolean;
};

export default function LoadButton({ onClick, loading }: Props) {
  return (
    <button onClick={onClick} disabled={loading}>
      {loading ? "Loading..." : "Load Data"}
    </button>
  );
}