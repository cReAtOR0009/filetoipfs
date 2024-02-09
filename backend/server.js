// server.js
const express = require("express");
const dotEnv = require("dotenv").config();
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const { ThirdwebStorage } = require("@thirdweb-dev/storage");
const PORT = process.env.PORT || 3000;
const app = express();
const path = require("path");

const storage = new ThirdwebStorage({
  secretKey: process.env.SECRET_KEY,
});

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const myMiddleware = (req, res, next) => {
  console.log("Server Request");
  next();
};
// Set up multer for handling file uploads
// const upload = multer();
const upload = multer({ dest: "uploads/" }); // Set the destination folder where files will be stored temporarily

// POST endpoint for uploading files to IPFS
app.post("/upload", upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Access uploaded file details using req.file
    const file = req.file;
    console.log(file)

    // Read the contents of the uploaded file
    const fileContent = fs.readFileSync(file.path);

    // Call your storage function passing the file content
    const result = await storage.upload(fileContent);

    // Resolve the IPFS URL
    const ipfsUrl = storage.resolveScheme(result);

    // Send the IPFS URL as response
    res.json({ ipfsUrl });

    // Delete the temporary file after uploading
    fs.unlinkSync(file.path);
  } catch (error) {
    console.error("Error uploading file to IPFS:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



app.get("/", myMiddleware, (req, res, next) =>
  res.send("ipfs Server is Running")
);

app.get("/home", (req, res) => {
  // res.sendFile(path.resolve(__dirname, '../frontend', 'index.html'));
});

app.use((err, res, req, next) => {
  res.status(500).send({
    status: 500,
    message: err.message,
    data: {},
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
