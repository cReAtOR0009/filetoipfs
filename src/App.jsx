import "./styles/Home.css";
import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState(null);
  const [ipfsUrl, setIpfsUrl] = useState(null);

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:3000/upload", { // Update the URL to match your backend URL
        method: "POST",
        body: formData,
        headers: {
          "Accept": "application/json",
        },
      }); 
      const data = await response.json();
      setIpfsUrl(data.ipfsUrl);
      console.log("File uploaded to IPFS:", data.ipfsUrl);
      alert("File uploaded to IPFS!");
    } catch (error) {
      console.error("Error uploading file to IPFS:", error);
      alert("Error uploading file to IPFS. Please try again later.");
    }
  };

  return (
    <main className="main">
      <div className="container">
        <div className="header">
          <h1 className="title">
            Welcome to{" "}
            <span className="gradient-text-0">
              <a href="#" target="_blank" rel="noopener noreferrer">
                _creatoz.
              </a>
            </span>
          </h1>
        </div>

        <div className="grid">
          <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>upload</button>
            <p>{ipfsUrl}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
