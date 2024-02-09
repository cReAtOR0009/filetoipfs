// server.js
const express = require('express');
const multer = require('multer');
const cors = require("cors")
const { ThirdwebStorage } = require('@thirdweb-dev/storage');

const app = express();
const storage = new ThirdwebStorage({
  secretKey: process.env.SECRET_KEY,
});

app.use(cors());
app.use(express.json());

// Set up multer for handling file uploads
const upload = multer();

app.get("/test", (req, res) => {
res.json("working server")
})

// POST endpoint for uploading files to IPFS
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const content = Buffer.from(req.file.buffer);
    const result = await storage.upload(content);
    res.json({ ipfsUrl: result });
  } catch (error) {
    console.error('Error uploading file to IPFS:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
