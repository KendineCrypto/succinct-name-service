import pinataSDK from '@pinata/sdk'; // pinata-sdk yerine @pinata/sdk kullan

const pinata = new pinataSDK(
  process.env.PINATA_API_KEY,
  process.env.PINATA_SECRET_KEY
);

export const uploadToPinata = async (file, domain) => {
  try {
    const result = await pinata.pinFileToIPFS(file, {
      pinataMetadata: {
        name: `${domain}.json`,
      },
    });
    return result.IpfsHash;
  } catch (error) {
    console.error('Pinata upload error:', error);
    throw error;
  }
};

export default pinata;
