import "dotenv/config"; // ✅ Fix: Use ES Module syntax for dotenv
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { SecretVaultWrapper } from "nillion-sv-wrappers"; // ✅ Use correct import

const app = express();
app.use(cors());
app.use(bodyParser.json());

const vault = new SecretVaultWrapper({
  orgDID: process.env.NILLION_ORG_DID,
  apiKey: process.env.NILLION_API_KEY,
});

// Store Contract in Nillion
app.post("/store-contract", async (req, res) => {
  const { contractName, contractText } = req.body;

  try {
    const encryptedData = await vault.store(contractName, contractText);
    res.json({ message: "Contract stored securely", documentId: encryptedData.id });
  } catch (error) {
    console.error("Error storing contract:", error);
    res.status(500).json({ error: "Failed to store contract securely" });
  }
});

// Retrieve Contract from Nillion
app.get("/retrieve-contract/:docId", async (req, res) => {
  const { docId } = req.params;

  try {
    const decryptedData = await vault.retrieve(docId);
    res.json({ contract: decryptedData });
  } catch (error) {
    console.error("Error retrieving contract:", error);
    res.status(500).json({ error: "Failed to retrieve contract" });
  }
});

// Start the server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`SecretVault Service running on port ${PORT}`));
