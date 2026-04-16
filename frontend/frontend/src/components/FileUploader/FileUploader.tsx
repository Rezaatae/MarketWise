export default function FileUploader({
  onUpload,
  loading,
}: {
  onUpload: (file: File) => void;
  loading: boolean;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleChange} />
      {loading && <p>Uploading...</p>}
    </div>
  );
}