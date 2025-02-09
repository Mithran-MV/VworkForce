# V-WorkForce

## Overview
V-WorkForce is a decentralized AI-powered workforce marketplace, enabling users to buy, rent, or deploy AI service agents for various professional tasks. The platform allows individuals and businesses to access specialized AI agents that automate complex workflows efficiently.

For the initial phase, V-WorkForce is launching AI Legal Agents, including:
- **AI Legal Consultant**: Handles client queries, provides case analysis, and suggests legal strategies.
- **AI Compliance Officer**: Ensures contracts and policies comply with regulations (GDPR, SEC, tax laws).
- **AI Contract Drafting Agent**: Automates contract creation, validation, and legal document structuring.

The marketplace integrates:
- **Coinbase AgentKit** for seamless crypto transactions
- **Privy** for easy authentication
- **Nillion SecretVault** for encrypted contract storage
- **OpSec** for fully decentralized hosting

This approach ensures trustless, secure, and decentralized AI services with on-chain execution. Future expansions will include finance, HR, healthcare, and other service-based AI agents.

## Features
- **Decentralized AI Workforce**: Rent or deploy AI agents with smart contract-based transactions.
- **Secure Storage**: Nillion SecretVault ensures encrypted storage for legal contracts.
- **Seamless Authentication**: Privy enables frictionless sign-in and wallet integration.
- **On-Chain Transactions**: Coinbase AgentKit provides robust cryptocurrency payment solutions.
- **Censorship-Resistant Hosting**: OpSec ensures reliable decentralized infrastructure.

## Tech Stack
- **Frontend**: Next.js, React.js, Tailwind CSS
- **Backend**: Node.js, Express.js (Separate services for Agent and SecretVault)
- **Blockchain**: Ethereum, Smart Contracts (Solidity)
- **Authentication**: Privy
- **Storage**: Nillion SecretVault
- **Payments**: Coinbase AgentKit
- **Hosting**: OpSec

## Installation & Setup
### Prerequisites
- Node.js & npm installed
- MetaMask or any Web3 wallet
- Access to a test Ethereum network

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/v-workforce.git
   cd v-workforce
   ```
2. Install dependencies for the frontend:
   ```sh
   cd client
   npm install
   ```
3. Install dependencies for the agent service:
   ```sh
   cd ../agent
   npm install
   ```
4. Install dependencies for the SecretVault service:
   ```sh
   cd ../secretVault
   npm install
   ```
5. Set up environment variables:
   - Create a `.env.local` file in the `client` directory.
   - Create a `.env` file in both `agent` and `secretVault` directories.
   - Add necessary credentials (API keys, smart contract addresses, etc.).

6. Run the services:
   - Start the frontend:
     ```sh
     cd client
     npm run dev
     ```
   - Start the agent service:
     ```sh
     cd ../agent
     node server.js
     ```
   - Start the SecretVault service:
     ```sh
     cd ../secretVault
     node server.js
     ```

## Usage
- Access the web app at `http://localhost:3000`.
- Connect your wallet and sign in using Privy.
- Browse available AI agents and deploy services.
- Use the integrated contract drafting and review tools.
- Payments are processed using Base Sepolia ETH.

## Contributing
We welcome contributions! To contribute:
1. Fork the repository.
2. Create a new branch (`feature/new-feature`).
3. Commit your changes.
4. Push to your fork and submit a pull request.

## License
This project is licensed under the MIT License.

## Future Roadmap
- Expand AI agents into **Finance**, **HR**, **Healthcare**, and **Customer Support**.
- Enable **AI training customization** for personalized workflows.
- Enhance **multi-chain support** for broader adoption.
- Integrate **DAO governance** for decentralized decision-making.


