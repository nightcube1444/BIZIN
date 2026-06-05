import { useState } from "react";
import API from "../services/api";

function FileUpload({ setReport }) {
  const [file, setFile] = useState(null);

  const uploadFile = async () => {
    if (!file) {
      alert("Please choose a file");
      return;
    }

    const formData = new FormData();

    formData.append("file", file);

    try {
      const response = await API.post(
        "/upload",
        formData
      );

      setReport(response.data);

      alert("Upload Successful");
    } catch (error) {
      console.error(error);
      alert("Upload Failed");
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        type="file"
        onChange={(e) =>
          setFile(e.target.files[0])
        }
      />

      <button onClick={uploadFile}>
        Upload Report
      </button>
    </div>
  );
}

export default FileUpload;