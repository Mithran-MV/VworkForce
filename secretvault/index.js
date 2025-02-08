import { SecretVaultWrapper } from 'nillion-sv-wrappers';
import { v4 as uuidv4 } from 'uuid';
import { orgConfig } from './nillionOrgConfig.js';

const SCHEMA_ID = 'YOUR_SCHEMA_ID';

const vault = new SecretVaultWrapper(
  orgConfig.nodes,
  orgConfig.orgCredentials,
  SCHEMA_ID
);

await vault.init();

const data = [
  {
    _id: uuidv4(),
    contract_name: { $allot: 'Sample Contract' },
    contract_text: { $allot: 'This is the contract text.' },
  },
];

const response = await vault.writeToNodes(data);
console.log('Data written:', response);

const query = { _id: data[0]._id };
const retrievedData = await vault.readFromNodes(query);
console.log('Data retrieved:', retrievedData);
