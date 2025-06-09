// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract SuccNameService is ERC721, Ownable {
    using Counters for Counters.Counter;
    using Strings for uint256;

    Counters.Counter private _tokenIds;
    
    mapping(string => uint256) private _domainToTokenId;
    mapping(uint256 => string) private _tokenIdToDomain;
    mapping(uint256 => string) private _tokenURIs;

    event DomainMinted(address indexed owner, string name);
    event DomainTransferred(address indexed from, address indexed to, string name);

    constructor() ERC721("Succinct Name Service", "SNS") {}

    function mintDomain(string memory domainName, string memory tokenURI) public returns (uint256) {
        require(bytes(domainName).length > 0, "Domain name cannot be empty");
        require(_domainToTokenId[domainName] == 0, "Domain already exists");
        
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        
        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        
        _domainToTokenId[domainName] = newTokenId;
        _tokenIdToDomain[newTokenId] = domainName;
        
        emit DomainMinted(msg.sender, domainName);
        
        return newTokenId;
    }

    function getDomainByTokenId(uint256 tokenId) public view returns (string memory) {
        require(_exists(tokenId), "Token does not exist");
        return _tokenIdToDomain[tokenId];
    }

    function getTokenIdByDomain(string memory domainName) public view returns (uint256) {
        uint256 tokenId = _domainToTokenId[domainName];
        require(tokenId != 0, "Domain does not exist");
        return tokenId;
    }

    function isDomainAvailable(string memory domainName) public view returns (bool) {
        return _domainToTokenId[domainName] == 0;
    }

    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal {
        require(_exists(tokenId), "Token does not exist");
        _tokenURIs[tokenId] = _tokenURI;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "Token does not exist");
        return _tokenURIs[tokenId];
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 /* batchSize */
    ) internal override {
        if (from != address(0) && to != address(0)) {
            string memory domainName = _tokenIdToDomain[tokenId];
            emit DomainTransferred(from, to, domainName);
        }
    }
}