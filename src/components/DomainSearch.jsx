import { useState } from 'react'
import { useContractRead } from 'wagmi'
import MintButton from './MintButton'

// Geçici olarak sabit değerler kullanalım
const contractAddress = '0x1A49964E0748E84346997582b3E98Adb0268aB35'
const contractAbi = {
  abi: [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "domainName",
          "type": "string"
        }
      ],
      "name": "isDomainAvailable",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]
}

const DomainSearch = () => {
  const [searchDomain, setSearchDomain] = useState('')

  // Debug için console.log'ları state tanımından sonra yapalım
  console.log('Contract Address:', contractAddress)
  console.log('Contract ABI:', contractAbi.abi)
  console.log('Search Domain:', searchDomain)

  const {
    data: isAvailable,
    isFetching: isLoading,
    error
  } = useContractRead({
    address: contractAddress,
    abi: contractAbi.abi,
    functionName: 'isDomainAvailable',
    args: [searchDomain],
    enabled: !!searchDomain && searchDomain.length > 0,
    onError: (error) => {
      console.error('Contract Read Error:', error)
    }
  })

  return (
    <div className="w-full flex flex-col items-center space-y-4">
      <div className="flex flex-col items-center w-full mb-2">
        <span className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-pink-400 via-purple-400 to-lime-400 text-transparent bg-clip-text drop-shadow-lg flex items-center gap-3 mb-3 animate-fade-in">
          <span role="img" aria-label="search" className="text-4xl animate-bounce">🔎</span>
          Search your <span className="underline decoration-pink-400">.succ</span> domain
        </span>
      </div>
      <form
        className="flex justify-center items-center mt-4 shadow-lg rounded-full overflow-hidden bg-white/10 backdrop-blur-md"
        onSubmit={e => { e.preventDefault(); }}
        autoComplete="off"
      >
        <input
          type="text"
          placeholder="Search your .succ domain"
          className="px-4 py-2 w-64 text-black rounded-l-full bg-white outline-none"
          value={searchDomain}
          onChange={(e) => setSearchDomain(e.target.value)}
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-pink-500 to-fuchsia-500 px-4 py-2 rounded-r-full text-white font-semibold hover:scale-105 transition-transform"
          disabled={isLoading || !searchDomain}
        >
          🔍
        </button>
      </form>
      {error && (
        <p className="text-sm text-red-500 font-semibold">
          Error checking domain availability
        </p>
      )}
      {!isLoading && searchDomain && (
        <div className="w-full flex flex-col items-center space-y-2">
          <p className={`text-base font-semibold ${isAvailable ? 'text-green-400' : 'text-red-400'}`}
          >
            {isAvailable ? 'Domain is available!' : 'Domain is taken'}
          </p>
          {isAvailable && (
            <MintButton domainName={searchDomain} />
          )}
        </div>
      )}
      {isAvailable === true && (
        <p className="text-green-400 text-xl font-bold mt-3 animate-pulse">
          ✅ Domain is available!
        </p>
      )}
    </div>
  )
}

export default DomainSearch