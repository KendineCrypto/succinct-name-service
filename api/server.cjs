require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const pinataSDK = require('@pinata/sdk');
const fs = require('fs');

const app = express();
app.use(cors({
  origin: '*', // Geliştirme için. Güvenlik için sadece frontend domainini yazabilirsin.
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
const upload = multer({ dest: 'uploads/' });

// Pinata API anahtarlarını kontrol et
if (!process.env.PINATA_API_KEY || !process.env.PINATA_SECRET_KEY) {
  console.error('Pinata API anahtarları eksik! Lütfen .env.local dosyasını kontrol et.');
  process.exit(1);
}

const pinata = new pinataSDK(
  process.env.PINATA_API_KEY,
  process.env.PINATA_SECRET_KEY
);

console.log('PINATA_API_KEY:', process.env.PINATA_API_KEY);
console.log('PINATA_SECRET_KEY:', process.env.PINATA_SECRET_KEY);
console.log("=== SNS BACKEND BAŞLADI ===");

app.post('/mint-image', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    const domain = req.body.domain;

    // 1. Görseli yükle
    const fileStream = fs.createReadStream(file.path);
    const imageResult = await pinata.pinFileToIPFS(fileStream, {
      pinataMetadata: { name: `${domain}.png` }
    });
    fs.unlinkSync(file.path);

    // 2. Metadata oluştur
    const metadata = {
      name: `${domain}.succ`,
      description: "Succinct Name Service domain",
      image: `ipfs://${imageResult.IpfsHash}`
    };

    // 3. Metadata'yı yükle
    const metadataResult = await pinata.pinJSONToIPFS(metadata, {
      pinataMetadata: { name: `${domain}.json` }
    });

    // 4. Yanıtı döndür
    res.json({ tokenURI: `ipfs://${metadataResult.IpfsHash}` });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});