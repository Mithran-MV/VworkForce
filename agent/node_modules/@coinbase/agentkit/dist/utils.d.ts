import { EvmWalletProvider } from "./wallet-providers";
/**
 * Approves a spender to spend tokens on behalf of the owner
 *
 * @param wallet - The wallet provider
 * @param tokenAddress - The address of the token contract
 * @param spenderAddress - The address of the spender
 * @param amount - The amount to approve in atomic units (wei)
 * @returns A success message or error message
 */
export declare function approve(wallet: EvmWalletProvider, tokenAddress: string, spenderAddress: string, amount: bigint): Promise<string>;
