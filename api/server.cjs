const express = require('express');
const cors = require('cors');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
const upload = multer();

console.log('PINATA_API_KEY:', process.env.PINATA_API_KEY);
console.log("=== SNS BACKEND BAŞLADI ===");

app.post('/mint-image', upload.single('file'), async (req, res) => {
  try {
    const { domain } = req.body;
    const imageBuffer = req.file?.buffer;

    if (!imageBuffer) {
      console.error('Backend: Görsel dosyası gelmedi!');
      return res.status(400).json({ error: 'No image file received' });
    }
    console.log('Gelen dosya:', req.file);
    console.log('imageBuffer boyutu:', imageBuffer.length);

    // 1. Görseli Pinata'ya yükle (AXIOS ile)
    const formData = new FormData();
    formData.append('file', imageBuffer, req.file.originalname);

    const pinataRes = await axios.post(
      'https://api.pinata.cloud/pinning/pinFileToIPFS',
      formData,
      {
        maxBodyLength: 'Infinity',
        headers: {
          ...formData.getHeaders(),
          pinata_api_key: process.env.PINATA_API_KEY,
          pinata_secret_api_key: process.env.PINATA_API_SECRET,
        },
      }
    );

    const imageHash = pinataRes.data.IpfsHash;
    const imageUrl = `ipfs://${imageHash}`;

    // 2. Metadata oluştur
    const metadata = {
      name: `${domain}.succ`,
      description: `Succinct Name Service domain: ${domain}.succ`,
      image: imageUrl,
      attributes: [{ trait_type: 'Domain', value: `${domain}.succ` }]
    };

    // 3. Metadata'yı Pinata'ya yükle (AXIOS ile)
    const metadataRes = await axios.post(
      'https://api.pinata.cloud/pinning/pinJSONToIPFS',
      metadata,
      {
        headers: {
          pinata_api_key: process.env.PINATA_API_KEY,
          pinata_secret_api_key: process.env.PINATA_API_SECRET,
        },
      }
    );

    const metadataHash = metadataRes.data.IpfsHash;
    const tokenURI = `ipfs://${metadataHash}`;

    res.json({ tokenURI });
  } catch (err) {
    console.error('Backend genel hata:', err);
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
});

app.listen(3001, () => console.log('Backend running on port 3001'));