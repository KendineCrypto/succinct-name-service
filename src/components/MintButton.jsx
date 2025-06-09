import toast from 'react-hot-toast';
import { useAccount, useContractWrite, useWaitForTransaction } from 'wagmi';

const contractAddress = '0x1A49964E0748E84346997582b3E98Adb0268aB35'
const contractAbi = [
  {
    inputs: [
      { internalType: 'string', name: 'domainName', type: 'string' },
      { internalType: 'string', name: 'metadata', type: 'string' },
    ],
    name: 'mintDomain',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

// Sadece görsel oluşturma fonksiyonu (canvas)
async function createImageWithText(domain) {
  const img = new window.Image();
  img.crossOrigin = "anonymous";
  img.src = "/pink-bg.png";
  await new Promise((resolve) => { img.onload = resolve; });

  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);

  ctx.font = "bold 48px Arial";
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(`${domain}.succ`, canvas.width / 2, canvas.height / 2);

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(new File([blob], `${domain}.png`, { type: "image/png" }));
    }, "image/png");
  });
}

// Backend'e görsel ve domain gönderip tokenURI alan fonksiyon
async function uploadDomainMetadata(domain) {
  const imageFile = await createImageWithText(domain);
  console.log('Oluşan görsel dosyası:', imageFile, 'Boyut:', imageFile.size);
  const formData = new FormData();
  formData.append('file', imageFile);
  formData.append('domain', domain);

  const res = await fetch('http://localhost:3001/mint-image', {
    method: 'POST',
    body: formData
  });
  if (!res.ok) {
    const text = await res.text();
    console.error('Mint API failed:', text);
    throw new Error(`Mint API failed: ${res.status}`);
  }
  const data = await res.json();
  return data.tokenURI;
}

const MintButton = ({ domainName }) => {
  const { isConnected } = useAccount()

  const {
    write: mintDomain,
    isLoading: isMinting,
    data,
  } = useContractWrite({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'mintDomain',
    onError(error) {
      console.error('Contract Write Error:', error)
      toast.error(error.message)
    },
    onSuccess(data) {
      console.log('Transaction sent:', data)
      toast.success('Transaction sent! Please confirm in your wallet.')
    },
    args: [domainName, ''], // ilk başta boş, handleMint'te güncellenecek
  })

  const { isLoading: isTransactionLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess(data) {
      console.log('Transaction confirmed:', data)
      toast.success('Domain minted successfully!')
    },
    onError(error) {
      console.error('Transaction failed:', error)
      toast.error('Transaction failed!')
    },
  })

  const handleMint = async () => {
    if (!isConnected) {
      toast.error('Please connect your wallet first')
      return
    }
    if (!domainName) {
      toast.error('Domain name is required')
      return
    }

    try {
      toast.loading('IPFS\'e yükleniyor...')
      const tokenURI = await uploadDomainMetadata(domainName)
      console.log('Mint edilecek tokenURI:', tokenURI)
      toast.dismiss()
      mintDomain({ args: [domainName, tokenURI] })
    } catch (error) {
      console.error('Mint Error:', error)
      toast.error('Failed to mint domain')
    }
  }

  return (
    <button
      onClick={handleMint}
      className="mt-4 w-full max-w-xs bg-gradient-to-r from-pink-200 via-pink-400 to-pink-300 text-pink-900 font-extrabold py-4 px-8 rounded-full shadow-xl hover:brightness-110 hover:scale-105 transition-all duration-200 flex items-center gap-3 justify-center text-xl tracking-wide border-2 border-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-300 disabled:opacity-60 disabled:cursor-not-allowed"
      disabled={isMinting || isTransactionLoading}
    >
      <span className="text-2xl">✨</span> Mint Domain
    </button>
  )
}

export default MintButton