import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

export default function Contract() {
  const [contractType, setContractType] = useState("");
  const [partyOne, setPartyOne] = useState("");
  const [partyTwo, setPartyTwo] = useState("");
  const [contractDetails, setContractDetails] = useState("");
  const [contract, setContract] = useState("");
  const [docId, setDocId] = useState("");
  const [retrievedContract, setRetrievedContract] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [retrieving, setRetrieving] = useState(false);
  const [storing, setStoring] = useState(false);

  // Draft Contract
  const draftContract = async () => {
    if (!contractType.trim() || !partyOne.trim() || !partyTwo.trim() || !contractDetails.trim()) {
      setMessage("⚠️ Please fill in all fields.");
      return;
    }

    setLoading(true);
    setContract("");
    setMessage("⏳ Generating contract...");

    try {
      const res = await axios.post("http://localhost:5001/draft-contract", {
        contractType,
        partyOne,
        partyTwo,
        contractDetails,
      });

      // Apply Markdown-friendly formatting
      const formattedContract = res.data.contract
        .replace(/\*\*(.*?)\*\*/g, "**$1**") // Ensure bold text is formatted correctly
        .replace(/(\d+)\./g, "- **$1.**") // Convert numbered lists to bullet lists
        .replace(/(?<=\n)([-*]) /g, "- "); // Ensure bullet points are correctly formatted

      setContract(formattedContract || "⚠️ No contract generated.");
      setMessage("✅ Contract drafted successfully!");
    } catch (error) {
      setMessage("❌ Failed to generate contract. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Store Contract
  const storeContract = async () => {
    if (!contract) {
      setMessage("⚠️ No contract to store.");
      return;
    }

    setStoring(true);
    setMessage("⏳ Storing contract in Nillion Vault...");

    try {
      const contractData = {
        contractType,
        contractParties: `${partyOne} & ${partyTwo}`,
        contractDescription: contractDetails,
        contractContent: contract,
      };

      const res = await axios.post("http://localhost:5002/store-contract", contractData);

      if (res.data && res.data.documentId) {
        setDocId(res.data.documentId);
        setMessage("✅ Contract securely stored in Nillion SecretVault!");
      } else {
        throw new Error("Invalid response from server.");
      }
    } catch (error) {
      setMessage("❌ Failed to store contract. Please check your API and try again.");
    } finally {
      setStoring(false);
    }
  };

  // Retrieve Contract
  const retrieveContract = async () => {
    if (!docId.trim()) {
      setMessage("⚠️ Please enter a valid document ID.");
      return;
    }

    setRetrieving(true);
    setRetrievedContract(null);
    setMessage("⏳ Retrieving contract from Nillion Vault...");

    try {
      const res = await axios.get(`http://localhost:5002/retrieve-contract/${docId}`);

      if (!res.data || !res.data.contractContent) {
        setRetrievedContract(null);
        setMessage("❌ No contract found.");
      } else {
        setRetrievedContract({
          type: res.data.contractType,
          parties: res.data.contractParties,
          description: res.data.contractDescription,
          content: res.data.contractContent,
        });
        setMessage("✅ Contract retrieved successfully!");
      }
    } catch (error) {
      setMessage("❌ Failed to retrieve contract.");
    } finally {
      setRetrieving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center">✍️ AI Contract Drafting</h1>
        <p className="text-gray-600 text-center mt-2">
          Generate, store, and retrieve legally sound contracts.
        </p>

        {/* Alert Messages */}
        {message && (
          <div className="mt-4 p-3 text-center font-semibold bg-yellow-100 text-yellow-700 rounded-lg">
            {message}
          </div>
        )}

        {/* Retrieve Contract Section */}
        <div className="mt-6 p-4 border border-gray-300 rounded-lg bg-gray-50">
          <h3 className="text-lg font-bold text-gray-800">🔍 Retrieve a Stored Contract</h3>
          <input
            type="text"
            value={docId}
            onChange={(e) => setDocId(e.target.value)}
            placeholder="Enter Document ID"
            className="w-full px-4 py-2 mt-2 border rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={retrieveContract}
            className={`mt-4 w-full px-4 py-2 text-white font-bold rounded-lg transition ${
              retrieving ? "bg-gray-400 cursor-not-allowed" : "bg-yellow-500 hover:bg-yellow-600"
            }`}
            disabled={retrieving}
          >
            {retrieving ? "Retrieving..." : "Retrieve Contract"}
          </button>
        </div>

        {/* 📄 Retrieved Contract Section */}
        {retrievedContract && (
          <div className="mt-6 p-4 border border-gray-300 rounded-lg bg-white shadow-md">
            <h2 className="text-xl font-semibold text-gray-800">📂 Retrieved Contract</h2>
            <p className="text-gray-700 mt-2">
              <strong>📜 Contract Type:</strong> {retrievedContract.type}
            </p>
            
            <p className="text-gray-700 mt-1">
              <strong>📝 Description:</strong> {retrievedContract.description}
            </p>
            <div className="mt-3 p-3 border-l-4 border-blue-500 bg-gray-50 text-sm text-gray-800">
              <ReactMarkdown>{retrievedContract.content}</ReactMarkdown>
            </div>
          </div>
        )}
        {/* Contract Creation Section */}
        <div className="mt-6 p-4 border border-gray-300 rounded-lg bg-gray-50">
          <h3 className="text-lg font-bold text-gray-800">📝 Create a New Contract</h3>
          <input
            type="text"
            value={contractType}
            onChange={(e) => setContractType(e.target.value)}
            placeholder="Contract Type (e.g., Lease, NDA, Service Agreement)"
            className="w-full px-4 py-2 mt-2 border rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            value={partyOne}
            onChange={(e) => setPartyOne(e.target.value)}
            placeholder="Party One (e.g., John Doe)"
            className="w-full px-4 py-2 mt-2 border rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            value={partyTwo}
            onChange={(e) => setPartyTwo(e.target.value)}
            placeholder="Party Two (e.g., XYZ Company)"
            className="w-full px-4 py-2 mt-2 border rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            value={contractDetails}
            onChange={(e) => setContractDetails(e.target.value)}
            placeholder="Enter contract details..."
            className="w-full px-4 py-2 mt-2 border rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 h-28"
          ></textarea>
          <button
            onClick={draftContract}
            className="mt-4 w-full px-4 py-2 text-white font-bold rounded-lg bg-blue-500 hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Contract"}
          </button>
        </div>

        {/* 📜 Generated Contract (Fixed Markdown Rendering) */}
        {contract && (
          <div className="mt-6 p-4 border border-gray-300 rounded-lg bg-gray-50">
            <h2 className="text-xl font-semibold text-gray-800">📜 Generated Contract</h2>
            <div className="text-gray-700 mt-2 whitespace-pre-wrap border-l-4 border-blue-500 pl-4">
              <ReactMarkdown>{contract}</ReactMarkdown>
            </div>
            <button
              onClick={storeContract}
              className="mt-4 w-full px-4 py-2 text-white font-bold rounded-lg bg-green-500 hover:bg-green-600"
            >
              Store in Nillion Vault
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
