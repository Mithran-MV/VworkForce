import { useState } from "react";
import axios from "axios";

export default function Upload() {
  const [docName, setDocName] = useState("");
  const [docContent, setDocContent] = useState("");
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    try {
      const res = await axios.post("http://localhost:5002/store-document", { documentName: docName, documentContent: docContent });
      setMessage(`Document stored with ID: ${res.data.documentId}`);
    } catch (error) {
      setMessage("Error storing document");
    }
  };

  return (
    <div>
      <h1>Secure Document Storage</h1>
      <input type="text" value={docName} onChange={(e) => setDocName(e.target.value)} placeholder="Document Name" />
      <textarea value={docContent} onChange={(e) => setDocContent(e.target.value)} placeholder="Document Content"></textarea>
      <button onClick={handleUpload}>Upload</button>
      <p>{message}</p>
    </div>
  );
}
