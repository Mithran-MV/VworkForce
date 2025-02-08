import { SecretVaultWrapper } from "nillion-sv-wrappers";
import { orgConfig } from "./nillionOrgConfig.js";
import fs from "fs";

const schema = JSON.parse(fs.readFileSync("./schema.json", "utf-8"));

async function createSchema() {
  const vault = new SecretVaultWrapper(
    orgConfig.nodes,
    orgConfig.orgCredentials
  );

  await vault.init();

  const schemaId = await vault.createSchema(schema);
  console.log(`✅ Schema created with ID: ${schemaId}`);
}

createSchema();
