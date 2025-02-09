require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { AgentKit } = require("@coinbase/agentkit");
const { OpenAI } = require("openai");
const { ethers } = require("ethers");
const { Readable } = require("stream");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Ensure required environment variables are set
if (!process.env.CDP_API_KEY_NAME || !process.env.CDP_API_KEY_PRIVATE_KEY) {
  console.error("❌ Missing Coinbase AgentKit API keys");
  process.exit(1);
}
if (!process.env.OPENAI_API_KEY) {
  console.error("❌ Missing OpenAI API Key");
  process.exit(1);
}
if (!process.env.BASE_SEPOLIA_RPC || !process.env.CDP_API_KEY_PRIVATE_KEY) {
  console.error("❌ Missing Ethereum RPC or Private Key");
  process.exit(1);
}

// ✅ Initialize AgentKit (Coinbase)
const agentKit = new AgentKit({
  apiKeyName: process.env.CDP_API_KEY_NAME,
  privateKey: process.env.CDP_API_KEY_PRIVATE_KEY,
});

// ✅ Initialize OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ✅ Ethereum provider for payments on Base Sepolia
const provider = new ethers.JsonRpcProvider(process.env.BASE_SEPOLIA_RPC);


app.get("/agent-wallet", async (req, res) => {
  try {
    const agent = await agentKit.getAgent();
    res.json({ agentId: agent.agentId, walletAddress: agent.wallet.address });
  } catch (error) {
    console.error("❌ Agent Wallet Error:", error);
    res.status(500).json({ error: "Failed to fetch AI agent wallet" });
  }
});

// 🔹 **Agent-to-Agent Transaction**
app.post("/agent-pay", async (req, res) => {
  const { recipientAgentId, amount } = req.body;

  if (!recipientAgentId || !amount || isNaN(parseFloat(amount))) {
    return res.status(400).json({ error: "Invalid recipient or amount" });
  }

  try {
    console.log(`💰 Sending ${amount} ETH to Agent ${recipientAgentId}`);

    const tx = await agentKit.send({
      recipientAgentId,
      amount: ethers.parseEther(amount.toString()),
    });

    res.status(200).json({ message: "Payment successful", txHash: tx.hash });
  } catch (error) {
    console.error("❌ Agent-to-Agent Payment Error:", error);
    res.status(500).json({ error: "Payment failed", details: error.message });
  }
});


// 🔹 AI Contract Drafting Agent
app.post("/draft-contract", async (req, res) => {
  const { contractType, partyOne, partyTwo, contractDetails } = req.body;

  if (!contractType || !partyOne || !partyTwo || !contractDetails) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const prompt = `Draft a legally sound ${contractType} contract between ${partyOne} and ${partyTwo}. Details: ${contractDetails}`;
    
    console.log(`📜 Generating contract for: ${contractType}`);

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "system", content: "You are a legal contract drafting AI." }, { role: "user", content: prompt }],
    });

    if (!response.choices || response.choices.length === 0) {
      throw new Error("No response from OpenAI");
    }

    res.json({ contract: response.choices[0].message.content });
  } catch (error) {
    console.error("❌ Contract Drafting Error:", error);
    res.status(500).json({ error: "AI agent failed to generate contract", details: error.message });
  }
});

// 🔹 AI Legal Consultation
app.post("/ai-legal-consult", async (req, res) => {
  const { userQuery } = req.body;

  if (!userQuery) {
    return res.status(400).json({ error: "Query is required" });
  }

  try {
    console.log(`🔍 AI Legal Consultant received query: ${userQuery}`);

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "system", content: "You are an AI legal consultant." }, { role: "user", content: userQuery }],
    });

    if (!response.choices || response.choices.length === 0) {
      throw new Error("No response from OpenAI");
    }

    res.json({ response: response.choices[0].message.content });
  } catch (error) {
    console.error("❌ AI Legal Consultant Error:", error);
    res.status(500).json({ error: "AI Agent failed to generate a response", details: error.message });
  }
});


app.post("/ai-compliance-officer", async (req, res) => {
  const { userQuery } = req.body;

  if (!userQuery) {
    return res.status(400).json({ error: "Query is required" });
  }

  try {
    console.log(`🔍 AI Compliance Officer received query: ${userQuery}`);

    // Ensure OpenAI API response is handled properly
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "system", content: "You are an AI compliance officer providing expert regulatory and legal guidance." }, 
                 { role: "user", content: userQuery }],
    });

    if (!response.choices || response.choices.length === 0) {
      return res.status(500).json({ error: "No response from OpenAI" });
    }

    // Ensure response is sent only once
    return res.json({ response: response.choices[0].message.content.trim() });

  } catch (error) {
    console.error(`❌ Compliance Agent Error:`, error);
    return res.status(500).json({ error: "Compliance Agent failed to generate a response", details: error.message });
  }
});




// 🔹 Payment function using Base Sepolia ETH
app.post("/pay", async (req, res) => {
  const { userWallet, amount } = req.body;

  if (!userWallet || !ethers.isAddress(userWallet)) {
    return res.status(400).json({ error: "Invalid Ethereum address" });
  }

  if (!amount || isNaN(parseFloat(amount))) {
    return res.status(400).json({ error: "Invalid payment amount" });
  }

  try {
    console.log(`💰 Processing payment of ${amount} ETH to ${userWallet}`);

    const signer = new ethers.Wallet(process.env.CDP_API_KEY_PRIVATE_KEY, provider);
    const tx = await signer.sendTransaction({
      to: userWallet,
      value: ethers.parseEther(amount.toString()),
    });

    console.log(`✅ Transaction successful! TX Hash: ${tx.hash}`);
    await tx.wait();

    res.status(200).json({ message: "Payment successful", txHash: tx.hash });
  } catch (error) {
    console.error("❌ Payment Error:", error);
    res.status(500).json({ error: "Payment failed", details: error.message });
  }
});

// ✅ Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Agent Service running on port ${PORT}`));
