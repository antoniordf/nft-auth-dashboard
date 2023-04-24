// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract DApp {
    // Creates a variable called nftCollection of type IERC721. IERC721 is a contract that contains all the function signatures required to interact
    // with an ERC721 contract, but not the implementation of the functions. Implementing nftCollection as an IERC721 variable is like creating an instance
    // of the IERC721 contract which allows us to call ERC721 methods on nftCollection, such as .owenerOf() and .balanceOf().
    IERC721 private nftCollection;

    constructor(address nftCollectionAddress) {
        nftCollection = IERC721(nftCollectionAddress); // Allows us to interact with the desired 3rd party NFT collection.
    }

    function userHasNFT(address user) public view returns (bool) {
        uint256 balance = nftCollection.balanceOf(user);
        return balance > 0;
    }
}
