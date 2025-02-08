import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import * as Nillion from "nillion-sv-wrappers";
console.log(Nillion);

import { SecretVaultWrapper } from "nillion-sv-wrappers";



const app = express();
app.use(cors());
app.use(bodyParser.json());

const vault = new SecretVaultWrapper({
    orgDID: process.env.NILLION_ORG_DID,
    apiKey: process.env.NILLION_API_KEY,
  });
  

app.post("/store-document", async (req, res) => {
  try {
    const { documentName, documentContent } = req.body;
    const encryptedData = await vault.store(documentName, documentContent);
    res.json({ message: "Document stored securely", documentId: encryptedData.id });
  } catch (error) {
    console.error("Error storing document:", error);
    res.status(500).json({ error: "Failed to store document securely" });
  }
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`SecretVault Service running on port ${PORT}`));
