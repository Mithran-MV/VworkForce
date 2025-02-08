require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { AgentKit } = require("@coinbase/agentkit");
const { OpenAI } = require("openai");
const { ethers } = require("ethers");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Initialize AgentKit
const agentKit = new AgentKit({
  apiKeyName: process.env.CDP_API_KEY_NAME,
  privateKey: process.env.CDP_API_KEY_PRIVATE_KEY,
});

// Initialize OpenAI for AI contract drafting
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Ethereum provider for payments on Base Sepolia
const provider = new ethers.JsonRpcProvider(process.env.BASE_SEPOLIA_RPC);

// 🔹 AI Contract Drafting Agent
app.post("/draft-contract", async (req, res) => {
  const { contractType, partyOne, partyTwo, contractDetails } = req.body;

  try {
    const prompt = `
      Draft a legally sound ${contractType} contract between ${partyOne} and ${partyTwo}.
      Details: ${contractDetails}
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "system", content: "You are a legal contract drafting AI." }, { role: "user", content: prompt }],
    });

    const contractText = response.choices[0].message.content;
    return res.json({ contract: contractText });
  } catch (error) {
    console.error("Error generating contract:", error);
    return res.status(500).json({ error: "AI agent failed to generate contract" });
  }
});


// 🔹 Payment function using Base Sepolia ETH
app.post("/pay", async (req, res) => {
  const { userWallet, amount } = req.body;

  if (!ethers.isAddress(userWallet)) {
    console.error("Invalid Ethereum address:", userWallet);
    return res.status(400).json({ error: "Invalid Ethereum address" });
  }

  try {
    console.log(`Processing payment of ${amount} ETH to ${userWallet}`);

    const signer = new ethers.Wallet(process.env.CDP_API_KEY_PRIVATE_KEY, provider);
    const tx = await signer.sendTransaction({
      to: userWallet,
      value: ethers.parseEther(amount),
    });

    console.log(`Transaction successful! TX Hash: ${tx.hash}`);
    await tx.wait();

    return res.status(200).json({ message: "Payment successful", txHash: tx.hash });
  } catch (error) {
    console.error("Payment Error:", error);
    return res.status(500).json({ error: "Payment failed", details: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Agent Service running on port ${PORT}`));
