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


## Screenshots

### Homepage
<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/95bf4b64-b619-40a2-8380-a2ef0703a0c3" width="400"/></td>
    <td><img src="https://github.com/user-attachments/assets/e4a1168f-5ad9-4fc2-ad98-afd4bd1f2494" width="400"/></td>
  </tr>
</table>

### AI Marketplace
<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/d3d41a0b-3fea-4fd4-9030-e52c0b06c51d" width="400"/></td>
    <td><img src="https://github.com/user-attachments/assets/b094b9cd-f6aa-4b1b-8b29-46cb15927db6" width="400"/></td>
  </tr>
</table>

### Payment Process
<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/2a35e6c0-3256-4d92-ad8b-c47fcc044b43" width="400"/></td>
    <td><img src="https://github.com/user-attachments/assets/f064d951-857d-41ea-a7b0-222d02be8f1e" width="400"/></td>
  </tr>
</table>

### AI Legal Consultant
<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/6fb131a8-a228-4dd7-aedf-919ca8c20559" width="400"/></td>
    <td><img src="https://github.com/user-attachments/assets/3a6b948a-1342-4e6b-8b7-3c9556ac0d98" width="400"/></td>
    <td><img src="https://github.com/user-attachments/assets/2f183409-b9f9-4ec1-8c4a-fca31a8542cd" width="400"/></td>
  </tr>
</table>

### AI Compliance Officer
<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/3a49067c-20c7-4133-aca1-8457c324864f" width="400"/></td>
    <td><img src="https://github.com/user-attachments/assets/dc133f43-fcaf-4253-b040-6effda114057" width="400"/></td>
    <td><img src="https://github.com/user-attachments/assets/e97d5dea-6520-4871-b759-65c812bb21ae" width="400"/></td>
  </tr>
</table>

### Additional AI Legal Consultant Screenshots
<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/4ac7cd62-232a-43d8-a552-02f12e642a8c" width="400"/></td>
    <td><img src="https://github.com/user-attachments/assets/3df2b577-16b4-4c59-ab69-79777e660538" width="400"/></td>
    <td><img src="https://github.com/user-attachments/assets/936159c0-fd3d-45e2-8535-d565dfc2001d" width="400"/></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/e9c5a579-405d-461d-bb2b-342472014c77" width="400"/></td>
    <td><img src="https://github.com/user-attachments/assets/eb279631-9a6f-4e78-8f33-afbccd12666c" width="400"/></td>
    <td><img src="https://github.com/user-attachments/assets/8c1d0183-936d-4db0-a065-6dd41732d521" width="400"/></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/361ede0f-fd47-4e9b-8a0d-76337ebb448b" width="400"/></td>
  </tr>
</table>



## Tech Stack
- **Frontend**: Next.js, React.js, Tailwind CSS
- **Backend**: Node.js, Express.js (Separate services for Agent and SecretVault)
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


