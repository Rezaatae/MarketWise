type Props = {
  onUpload: (file: File) => void;
};

export default function FileUploader({ onUpload }: Props) {
  return (
    <input
      type="file"
      accept=".csv"
      onChange={(e) => {
        if (e.target.files?.[0]) {
          onUpload(e.target.files[0]);
        }
      }}
    />
  );
}