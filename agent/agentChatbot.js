import {
    AgentKit,
    CdpWalletProvider,
    wethActionProvider,
    walletActionProvider,
    erc20ActionProvider,
    cdpApiActionProvider,
    cdpWalletActionProvider,
    pythActionProvider,
  } from "@coinbase/agentkit";
  import { getLangChainTools } from "@coinbase/agentkit-langchain";
  import { HumanMessage } from "@langchain/core/messages";
  import { MemorySaver } from "@langchain/langgraph";
  import { createReactAgent } from "@langchain/langgraph/prebuilt";
  import { ChatOpenAI } from "@langchain/openai";
  import * as dotenv from "dotenv";
  import * as fs from "fs";
  import * as readline from "readline";
  import { fileURLToPath } from "url";
  import { dirname } from "path";
  
  dotenv.config();
  
  // Validate Required Environment Variables
  function validateEnvironment() {
    const requiredVars = ["OPENAI_API_KEY", "CDP_API_KEY_NAME", "CDP_API_KEY_PRIVATE_KEY", "NETWORK_ID"];
    const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
    if (missingVars.length > 0) {
      console.error("❌ Missing environment variables:", missingVars.join(", "));
      process.exit(1);
    }
  }
  validateEnvironment();
  
  const WALLET_DATA_FILE = "wallet_data.json";
  
  async function initializeAgent() {
    try {
      const llm = new ChatOpenAI({ model: "gpt-4o" });
  
      let walletData = null;
      if (fs.existsSync(WALLET_DATA_FILE)) {
        try {
          walletData = JSON.parse(fs.readFileSync(WALLET_DATA_FILE, "utf8"));
        } catch (error) {
          console.error("⚠️ Failed to read wallet data:", error.message);
        }
      }
  
      const config = {
        apiKeyName: process.env.CDP_API_KEY_NAME,
        apiKeyPrivateKey: "-----BEGIN EC PRIVATE KEY-----\nMHcCAQEEIN3Drg/WkbtwNWlrUy9w+vkEz9TdbVAKDM+VM7L64UHUoAoGCCqGSM49\nAwEHoUQDQgAECUc12IFVVSh6bDYMx41uM0Aq8XPc6JzSxei9W9i3IXNJRfiHlUaw\n4+IEbrAbsuthKjK7fU6qn5nr/A81+muWyw==\n-----END EC PRIVATE KEY-----\n",
        cdpWalletData: walletData || undefined,
        networkId: process.env.NETWORK_ID || "base-sepolia",
      };
  
      const walletProvider = await CdpWalletProvider.configureWithWallet(config);
      const agentkit = await AgentKit.from({
        walletProvider,
        actionProviders: [
          wethActionProvider(),
          pythActionProvider(),
          walletActionProvider(),
          erc20ActionProvider(),
          cdpApiActionProvider(config),
          cdpWalletActionProvider(config),
        ],
      });
  
      const tools = await getLangChainTools(agentkit);
      const memory = new MemorySaver();
      const agentConfig = { configurable: { thread_id: "AgentKit Chatbot Session" } };
  
      const agent = createReactAgent({
        llm,
        tools,
        checkpointSaver: memory,
        messageModifier: `You are an AI chatbot that interacts on-chain using Coinbase AgentKit.`,
      });
  
      fs.writeFileSync(WALLET_DATA_FILE, JSON.stringify(await walletProvider.exportWallet()));
  
      return { agent, config: agentConfig };
    } catch (error) {
      console.error("❌ Failed to initialize agent:", error);
      throw error;
    }
  }
  
  async function runChatMode(agent, config) {
    console.log("💬 Chat mode started. Type 'exit' to stop.");
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  
    const question = prompt => new Promise(resolve => rl.question(prompt, resolve));
    while (true) {
      const userInput = await question("\nUser: ");
      if (userInput.toLowerCase() === "exit") {
        rl.close();
        break;
      }
      try {
        const stream = await agent.stream({ messages: [new HumanMessage(userInput)] }, config);
        for await (const chunk of stream) {
          console.log(chunk.agent?.messages[0].content || chunk.tools?.messages[0].content);
        }
      } catch (error) {
        console.error("❌ AI response error:", error.message);
      }
    }
  }
  
  async function chooseMode() {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    const question = prompt => new Promise(resolve => rl.question(prompt, resolve));
    
    let attempts = 3;
    while (attempts > 0) {
      const choice = (await question("\nChoose mode: 1 (Chat) / 2 (Auto): ")).trim();
      if (choice === "1") {
        rl.close();
        return "chat";
      }
      if (choice === "2") {
        rl.close();
        return "auto";
      }
      console.log("Invalid input. Please enter 1 or 2.");
      attempts--;
    }
    console.log("Too many invalid attempts. Exiting...");
    process.exit(1);
  }
  
  // 🛠 **Main Function to Start the Agent**
  async function main() {
    try {
      console.log("🚀 Initializing Agent...");
      const { agent, config } = await initializeAgent();
      console.log("✅ Agent initialized successfully!");
  
      const mode = await chooseMode();
      if (mode === "chat") {
        console.log("💬 Starting Chat Mode...");
        await runChatMode(agent, config);
      } else {
        console.log("🤖 Running Autonomous Mode...");
        await runAutonomousMode(agent, config);
      }
    } catch (error) {
      console.error("❌ Fatal error:", error.message);
      process.exit(1);
    }
  }
  
  // ✅ **Fix for ES Modules (`import.meta.url` instead of `require.main === module`)**
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  
  if (process.argv[1] === __filename) {
    main().catch(error => {
      console.error("❌ Startup error:", error);
      process.exit(1);
    });
  }
  