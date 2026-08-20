import './loadEnv.js';
import express from "express";
import cors from "cors";
import { SecretVaultWrapper } from "nillion-sv-wrappers";
import { orgConfig } from "./nillionOrgConfig.js"; // Import SecretVault Config

const SCHEMA_ID = "b5bc0c08-52a0-4a17-8d77-4c80031da21c";

// 🚀 Initialize Express Server
const app = express();
app.use(cors());
app.use(express.json());

/**
 * ✍️ Draft Contract (Simulated AI Response)
 * Endpoint: POST /draft-contract
 */
app.post("/draft-contract", async (req, res) => {
  try {
    const { contractType, partyOne, partyTwo, contractDetails } = req.body;

    if (!contractType || !partyOne || !partyTwo || !contractDetails) {
      return res.status(400).json({ error: "⚠️ All fields are required." });
    }

    const generatedContract = `
      📜 **Contract Type**: ${contractType}
      🤝 **Between**: ${partyOne} & ${partyTwo}
      📝 **Details**: ${contractDetails}
      📅 **Date**: ${new Date().toISOString()}
    `;

    console.log("✅ Contract Drafted:\n", generatedContract);
    res.json({ contract: generatedContract, message: "✅ Contract drafted successfully!" });
  } catch (error) {
    console.error("❌ Drafting error:", error.message);
    res.status(500).json({ error: "Failed to draft contract." });
  }
});

/**
 * 🔐 Store Contract in Nillion SecretVault
 * Endpoint: POST /store-contract
 */
app.post("/store-contract", async (req, res) => {
  try {
    const { contractType, contractDescription, contractContent } = req.body;

    if (!contractType || !contractDescription || !contractContent) {
      return res.status(400).json({ error: "⚠️ All fields are required." });
    }

    console.log("📤 Storing contract in Nillion SecretVault...");

    // Initialize SecretVault
    const collection = new SecretVaultWrapper(orgConfig.nodes, orgConfig.orgCredentials, SCHEMA_ID);
    await collection.init();

    // Data Structure for SecretVault
    const contractData = [
      {
        contract_type: { $allot: contractType },
        contract_description: { $allot: contractDescription },
        contract_content: { $allot: contractContent },
      },
    ];

    // Store contract in SecretVault
    const dataWritten = await collection.writeToNodes(contractData);
    const newIds = dataWritten.map((item) => item.result.data.created).flat();
    console.log("📜 Stored Document IDs:", newIds);

    if (!newIds[0]) {
      return res.status(500).json({ error: "❌ Failed to generate document ID." });
    }

    res.json({ documentId: newIds[0], message: "✅ Contract stored successfully in Nillion Vault!" });
  } catch (error) {
    console.error("❌ Error storing contract in SecretVault:", error.message);
    res.status(500).json({ error: "Failed to store contract." });
  }
});

/**
 * 🔍 Retrieve Contract from Nillion SecretVault
 * Endpoint: GET /retrieve-contract/:docId
 */
/**
 * 🔍 Retrieve Contract from Nillion SecretVault
 * Endpoint: GET /retrieve-contract/:docId
 */
app.get("/retrieve-contract/:docId", async (req, res) => {
    try {
      const { docId } = req.params;
      if (!docId) return res.status(400).json({ error: "⚠️ Document ID is required." });
  
      console.log(`🔍 Retrieving contract with Document ID: ${docId}`);
  
      // Initialize SecretVault
      const collection = new SecretVaultWrapper(orgConfig.nodes, orgConfig.orgCredentials, SCHEMA_ID);
      await collection.init();
  
      // Retrieve contract from SecretVault (Use _id or match actual stored field)
      const filter = { _id: docId }; 
      const decryptedData = await collection.readFromNodes(filter);
  
      console.log("📜 Raw Retrieved Data:", decryptedData); // Debugging log
  
      if (!decryptedData || decryptedData.length === 0) {
        return res.status(404).json({ error: "❌ No contract found." });
      }
  
      // Extract Correct Fields
      const contractRecord = decryptedData[0]; 
      res.json({
        contractType: contractRecord.contract_type || "Unknown",
        contractDescription: contractRecord.contract_description || "No Description",
        contractContent: contractRecord.contract_content || "No Content",
        message: "✅ Contract retrieved successfully!"
      });
  
    } catch (error) {
      console.error("❌ Error retrieving contract from SecretVault:", error.message);
      res.status(500).json({ error: "Failed to retrieve contract." });
    }
  });
  

/**
 * 📜 List All Stored Contracts for Debugging
 * Endpoint: GET /list-contracts
 */
app.get("/list-contracts", async (req, res) => {
  try {
    console.log("🔍 Listing all stored contracts...");

    // Initialize SecretVault
    const collection = new SecretVaultWrapper(orgConfig.nodes, orgConfig.orgCredentials, SCHEMA_ID);
    await collection.init();

    // Retrieve all stored contracts
    const allContracts = await collection.readFromNodes({});
    console.log("📜 All Stored Contracts:", allContracts);

    res.json({ contracts: allContracts });
  } catch (error) {
    console.error("❌ Error listing contracts:", error.message);
    res.status(500).json({ error: "Failed to list contracts." });
  }
});

// 🌍 Start the Express Server
const PORT = 5002;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
