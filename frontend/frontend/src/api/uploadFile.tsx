
export async function uploadFile(file: File){
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://localhost:8000/api/upload/upload-csv", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
        throw new Error("Upload failed");
    }

    return res.json();
  };