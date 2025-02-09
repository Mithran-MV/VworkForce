import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/router";
import axios from "axios";
import { useState } from "react";

export default function Marketplace() {
  const { authenticated, user, logout } = usePrivy();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);

  if (!authenticated) {
    router.push("/login");
    return <p style={{ textAlign: "center", fontSize: "18px", marginTop: "20px", fontWeight: "bold" }}>Redirecting to login...</p>;
  }

  const legalAgents = [
    {
      id: 1,
      name: "AI Legal Consultant",
      price: "0.00005",
      description: "Provides AI-driven case analysis, legal research, and advisory services.",
      path: "/agent/1",
      icon: "⚖️",
    },
    {
      id: 2,
      name: "AI Compliance Officer",
      price: "0.00008",
      description: "Ensures contracts and policies comply with regulations (GDPR, SEC, tax laws).",
      path: "/agent/2",
      icon: "📜",
    },
    {
      id: 3,
      name: "AI Contract Drafting",
      price: "0.00001",
      description: "Automates contract creation, validation, and legal document structuring.",
      path: "/agent/3",
      icon: "✍️",
    },
  ];

  const upcomingCategories = [
    { name: "AI Financial Advisors", description: "Automate investments, portfolio analysis, and tax strategies.", icon: "💰" },
    { name: "AI HR & Recruitment", description: "AI-driven hiring, candidate screening, and HR compliance.", icon: "🧑‍💼" },
    { name: "AI Healthcare Agents", description: "AI-powered diagnostics, medical assistance, and claims processing.", icon: "🏥" },
    { name: "AI Customer Support", description: "AI-powered 24/7 customer assistance, query resolution, and chatbot services.", icon: "🎧" },
    { name: "AI Cybersecurity Analyst", description: "Monitors threats, detects vulnerabilities, and ensures data security compliance.", icon: "🔐" },
    { name: "AI Supply Chain Manager", description: "Optimizes logistics, tracks shipments, and predicts supply chain disruptions.", icon: "🚚" }
];

  const handleBuyAgent = async (agent) => {
    if (!user?.wallet?.address) {
      alert("Please connect your wallet!");
      return;
    }

    setLoading(true);
    setSelectedAgent(agent.id);

    try {
      console.log(`🚀 Initiating payment for ${agent.name}...`);

      const res = await axios.post("http://localhost:5001/pay", {
        userWallet: user.wallet.address,
        amount: agent.price,
      });

      console.log("✅ Payment successful!", res.data);

      alert(`Payment successful! TX: ${res.data.txHash}`);

      // 🚀 Redirect user to the agent page
      router.push(agent.path);
    } catch (error) {
      console.error("❌ Payment Error:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
      setSelectedAgent(null);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #1e3a8a, #1e40af)", padding: "40px 20px", color: "#fff" }}>
      <div style={{ maxWidth: "1000px", margin: "auto", background: "#fff", padding: "30px", borderRadius: "15px", boxShadow: "0px 5px 20px rgba(0,0,0,0.2)", color: "#333" }}>
        
        {/* Header Section */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "bold", color: "#1e3a8a" }}>🚀 V-WorkForce AI Marketplace</h1>
          <button 
            onClick={logout} 
            style={{ padding: "10px 15px", backgroundColor: "#e74c3c", color: "#fff", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: "bold" }}
          >
            Logout
          </button>
        </div>

        {/* Project Overview */}
        <p style={{ fontSize: "16px", color: "#555", marginBottom: "25px" }}>
          <strong>V-WorkForce</strong> is a <strong>decentralized AI-powered workforce marketplace</strong>, enabling users to buy, rent, or deploy AI service agents for various professional tasks.  
          The platform integrates <strong>Coinbase AgentKit</strong> for seamless payments, <strong>Privy</strong> for easy authentication, <strong>Nillion SecretVault</strong> for secure contract storage, and <strong>OpSec</strong> for decentralized hosting.
        </p>

        {/* Legal AI Agents Category */}
        <h3 style={{ fontSize: "22px", fontWeight: "bold", color: "#444", marginBottom: "15px" }}>⚖️ Legal AI Agents</h3>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "25px" }}>
          {legalAgents.map((agent) => (
            <div 
              key={agent.id} 
              style={{
                background: "#f8f9fa",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                border: "1px solid #ddd",
                transition: "0.3s",
                cursor: "pointer"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "24px" }}>{agent.icon}</span>
                <h2 style={{ fontSize: "18px", fontWeight: "bold", color: "#222" }}>{agent.name}</h2>
              </div>
              <p style={{ color: "#555", fontSize: "14px", marginTop: "5px" }}>{agent.description}</p>
              <p style={{ fontSize: "16px", fontWeight: "bold", color: "#333", marginTop: "10px" }}>💰 {agent.price} ETH</p>
              <button 
                onClick={() => handleBuyAgent(agent)} 
                disabled={loading && selectedAgent === agent.id}
                style={{
                  marginTop: "10px",
                  width: "100%",
                  padding: "12px",
                  backgroundColor: loading && selectedAgent === agent.id ? "#bdc3c7" : "#3498db",
                  color: "#fff",
                  borderRadius: "8px",
                  border: "none",
                  cursor: loading && selectedAgent === agent.id ? "not-allowed" : "pointer",
                  transition: "0.3s",
                  fontWeight: "bold"
                }}
              >
                {loading && selectedAgent === agent.id ? "Processing..." : "Buy with Base Sepolia ETH"}
              </button>
            </div>
          ))}
        </div>

        {/* Upcoming AI Categories */}
        <h3 style={{ fontSize: "22px", fontWeight: "bold", color: "#444", marginTop: "40px", marginBottom: "15px" }}>🔮 Future AI Agents Categories (Coming Soon)</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "25px" }}>
          {upcomingCategories.map((category, index) => (
            <div key={index} style={{ background: "#f8f9fa", padding: "20px", borderRadius: "10px", textAlign: "center" }}>
              <span style={{ fontSize: "30px" }}>{category.icon}</span>
              <h2 style={{ fontSize: "18px", fontWeight: "bold", marginTop: "10px" }}>{category.name}</h2>
              <p style={{ fontSize: "14px", color: "#555" }}>{category.description}</p>
            </div>
          ))}
        </div>

         {/* Why Choose V-WorkForce Section */}
         <div style={{ marginTop: "30px", padding: "20px", backgroundColor: "#e8effa", borderRadius: "10px", boxShadow: "0px 3px 8px rgba(0,0,0,0.1)" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "bold", color: "#1e3a8a" }}>Why Choose V-WorkForce? 🤖</h2>
          <ul style={{ listStyleType: "disc", paddingLeft: "20px", color: "#333", marginTop: "10px" }}>
            <li>⚡ Instant AI-powered legal & compliance support</li>
            <li>🔒 Secure AI document storage & processing</li>
            <li>💳 Crypto-powered transactions with Base Sepolia</li>
            <li>🌍 Decentralized & censorship-resistant hosting</li>
          </ul>
        </div>

      </div>
    </div>
  );
}
