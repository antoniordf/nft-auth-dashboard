// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract DApp {
    IERC721 private nftCollection;

    constructor(address nftCollectionAddress) {
        nftCollection = IERC721(nftCollectionAddress);
    }

    function userHasNFT(address user) public view returns (bool) {
        uint256 balance = nftCollection.balanceOf(user);
        return balance > 0;
    }
}
