"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NETWORK_ID_TO_VIEM_CHAIN = exports.NETWORK_ID_TO_CHAIN_ID = exports.CHAIN_ID_TO_NETWORK_ID = void 0;
const chains_1 = require("viem/chains");
/**
 * Maps EVM chain IDs to Coinbase network IDs
 */
exports.CHAIN_ID_TO_NETWORK_ID = {
    1: "ethereum-mainnet",
    11155111: "ethereum-sepolia",
    137: "polygon-mainnet",
    80001: "polygon-mumbai",
    8453: "base-mainnet",
    84532: "base-sepolia",
    42161: "arbitrum-mainnet",
    421614: "arbitrum-sepolia",
    10: "optimism-mainnet",
    11155420: "optimism-sepolia",
};
/**
 * Maps Coinbase network IDs to EVM chain IDs
 */
exports.NETWORK_ID_TO_CHAIN_ID = Object.entries(exports.CHAIN_ID_TO_NETWORK_ID).reduce((acc, [chainId, networkId]) => {
    acc[networkId] = String(chainId);
    return acc;
}, {});
/**
 * Maps Coinbase network IDs to Viem chain objects
 */
exports.NETWORK_ID_TO_VIEM_CHAIN = {
    "ethereum-mainnet": chains_1.mainnet,
    "ethereum-sepolia": chains_1.sepolia,
    "polygon-mainnet": chains_1.polygon,
    "polygon-mumbai": chains_1.polygonMumbai,
    "base-mainnet": chains_1.base,
    "base-sepolia": chains_1.baseSepolia,
    "arbitrum-mainnet": chains_1.arbitrum,
    "arbitrum-sepolia": chains_1.arbitrumSepolia,
    "optimism-mainnet": chains_1.optimism,
    "optimism-sepolia": chains_1.optimismSepolia,
};
