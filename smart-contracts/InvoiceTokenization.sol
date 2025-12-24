// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract InvoiceTokenization {
    event InvoiceMinted(address indexed to, string invoiceId, uint256 tokenId, uint256 amount);
    uint256 private nextId = 1;

    struct InvoiceToken {
        string invoiceId;
        uint256 amount;
        address owner;
        bool settled;
    }

    mapping(uint256 => InvoiceToken) public tokens;

    function mintInvoice(address to, string memory invoiceId, uint256 amount) external returns (uint256) {
        uint256 tokenId = nextId++;
        tokens[tokenId] = InvoiceToken({invoiceId: invoiceId, amount: amount, owner: to, settled: false});
        emit InvoiceMinted(to, invoiceId, tokenId, amount);
        return tokenId;
    }

    function markSettled(uint256 tokenId) external {
        require(tokens[tokenId].owner == msg.sender, "not owner");
        tokens[tokenId].settled = true;
    }
}

