require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const pinataSDK = require('@pinata/sdk');
const fs = require('fs');
const rateLimit = require('express-rate-limit');
const NodeCache = require('node-cache');

const app = express();
const cache = new NodeCache({ stdTTL: 3600 }); // 1 saat cache süresi

// Rate limiter ayarları
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 100 // IP başına maksimum istek sayısı
});

app.use(limiter);
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

// Pinata istek sayacı
let requestCount = 0;
const MAX_REQUESTS_PER_MINUTE = 30;
let lastResetTime = Date.now();

// Pinata rate limit kontrolü
async function checkPinataRateLimit() {
  const now = Date.now();
  if (now - lastResetTime >= 60000) { // 1 dakika geçtiyse sayacı sıfırla
    requestCount = 0;
    lastResetTime = now;
  }
  
  if (requestCount >= MAX_REQUESTS_PER_MINUTE) {
    throw new Error('Pinata rate limit exceeded. Please try again in a minute.');
  }
  
  requestCount++;
}

app.post('/mint-image', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    const domain = req.body.domain;

    // Cache kontrolü
    const cacheKey = `mint-${domain}`;
    const cachedResult = cache.get(cacheKey);
    if (cachedResult) {
      return res.json(cachedResult);
    }

    // Rate limit kontrolü
    await checkPinataRateLimit();

    // 1. Görseli yükle
    const fileStream = fs.createReadStream(file.path);
    const imageResult = await pinata.pinFileToIPFS(fileStream, {
      pinataMetadata: { name: `${domain}.png` }
    });
    fs.unlinkSync(file.path);

    // Rate limit kontrolü
    await checkPinataRateLimit();

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

    const result = { tokenURI: `ipfs://${metadataResult.IpfsHash}` };
    
    // Sonucu cache'e kaydet
    cache.set(cacheKey, result);

    // 4. Yanıtı döndür
    res.json(result);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message,
      details: error.reason === 'RATE_LIMITED' ? 'Please try again in a minute' : error.message
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});