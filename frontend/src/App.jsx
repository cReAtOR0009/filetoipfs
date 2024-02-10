import "./styles/Home.css";
import { useState } from "react";
import { toast } from "react-toastify"; // Import toast directly
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDropzone } from "react-dropzone";

export default function Home() {
  const [ipfsUrl, setIpfsUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    try {
      setLoading(true);

      // Create a new XMLHttpRequest object
      const xhr = new XMLHttpRequest();

      // Add event listener to track upload progress
      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const percentCompleted = Math.round(
            (event.loaded * 100) / event.total
          );
          setProgress(percentCompleted);
        }
      });

      xhr.open("POST", "https://creatoz-ipfs.onrender.com/upload"); 

      // Create FormData and append the file
      const formData = new FormData();
      formData.append("file", file);

      // Send the request with FormData
      xhr.send(formData);

      xhr.onload = function () { 
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          // console.log("data: ", data)
SON.parse(xhr.responseText);
   toast.success("File uploaded to IPFS!", {
            autoClose: 3000,
          });
        } else {
          toast.error("Failed to upload File to IPFS!", {
            autoClose: 3000,
          });
        }
      };
    } catch (error) {
      console.error("Error uploading file to IPFS:", error);
      toast.error("Error uploading file to IPFS. Please try again later.", {
        autoClose: 3000,
      });
    } finally {
      setLoading(false); // Set loading state to false when uploading completes
      setProgress(0); // Reset progress state
    }
  };

  const { getRootProps, getInputProps, open } = useDropzone({ onDrop });

  return (
    <main className="main">
      <ToastContainer />
      <div className="container">
        <div className="header">
          <h1 className="title gradient-text-0">
            Upload Files to IPFS{" "}
            <span className="gradient-text-0">
              <a href="#" target="_blank" rel="noopener noreferrer">
                _creatoz.
              </a>
            </span>
          </h1>
        </div>

        <div className="grid">
          <div className="inputContainer">
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop a file here, or click to select a file</p>
            </div>
            {/* Show loading animation if loading state is true */}
            {loading && <div className="loading">Uploading...</div>}
            {/* <button onClick={open}>Upload</button> */}
            {/* Show progress bar if progress state is greater than 0 */}
            {progress > 0 && (
              <div className="progressBarContainer">
                <div
                  className="progressBar"
                  style={{ width: `${progress}%` }}
                >{`${progress}%`}</div>
              </div>
            )}
          </div>
          <div id="ipfsUrlContainer">
            <div>
              <i
                className="fa fa-2x fa-copy"
                onClick={() => {
                  navigator.clipboard.writeText(ipfsUrl);
                  toast.info("Copied to clipboard!", {
                    autoClose: 2000,
                  });
                }}
              >
                copy
              </i>{" "}
            </div>
            <div>
              <p id="ipfsUrl">{ipfsUrl} </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
