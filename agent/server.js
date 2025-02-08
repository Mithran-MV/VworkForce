require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { AgentKit } = require("@coinbase/agentkit");
const OpenAI = require("openai");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const agentKit = new AgentKit({
  apiKeyName: process.env.CDP_API_KEY_NAME,
  privateKey: process.env.CDP_API_KEY_PRIVATE_KEY,
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Endpoint for AI Legal Consultation
app.post("/ai-legal-consult", async (req, res) => {
  const { userQuery, userWallet } = req.body;

  console.log("Received request from wallet:", userWallet); // DEBUG LOG

  if (!userWallet) {
    return res.status(400).json({ error: "Payment required! Connect your wallet." });
  }

  try {
    // Check if user has paid via AgentKit
    const paymentVerified = await agentKit.verifyPayment(userWallet, "0.01");
    if (!paymentVerified) {
      return res.status(403).json({ error: "Payment not received. Please pay 0.01 ETH to continue." });
    }

    // AI Legal Consultation
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "system", content: "You are a legal expert." }, { role: "user", content: userQuery }],
    });

    res.json({ response: response.choices[0].message.content });
  } catch (error) {
    console.error("Error processing AI request:", error);
    res.status(500).json({ error: "AI agent failed to process request" });
  }
});




// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`AI Agent Service running on port ${PORT}`));
