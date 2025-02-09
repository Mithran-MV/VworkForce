import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function LegalConsultant() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);

  const handleQuery = async () => {
    if (!query.trim()) {
      setMessage("⚠️ Please enter a valid legal question.");
      return;
    }

    setIsLoading(true);
    setResponse("");
    setMessage("");

    try {
      console.log(`🔍 Sending query to AI Legal Consultant...`, query);
      const res = await axios.post("http://localhost:5001/ai-legal-consult", { userQuery: query });

      let aiResponse = res.data.response || "⚠️ No response received.";
      aiResponse = formatBoldText(aiResponse); // Format AI response to show bold text correctly

      setResponse(aiResponse);
      setHistory([{ question: query, answer: aiResponse }, ...history]);
      setMessage("✅ AI Response Generated!");
    } catch (error) {
      console.error("❌ AI Agent Error:", error);
      setMessage("❌ Error processing request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to format AI responses with bold text and lists
  const formatBoldText = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Convert **bold text** to <strong>
      .replace(/(\d+\.)\s([\w\s]+?):/g, '<strong>$1 $2:</strong>') // Make numbered list headers bold
      .replace(/\n- /g, "<br>• ") // Convert bullet points
      .replace(/\n\d+\./g, (match) => `<br>${match}`); // Convert numbered lists
  };
  

  const exampleQueries = [
    "What are my rights as a tenant?",
    "How do I draft a non-disclosure agreement?",
    "What is the legal process for starting a business?",
    "Can I sue for breach of contract?",
    "What are the key points in an employment contract?",
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-xl p-6">
        {/* Title & Description */}
        <h1 className="text-3xl font-bold text-gray-800 text-center">⚖️ AI Legal Consultant</h1>
        <p className="text-gray-600 text-center mt-2">
          Ask any legal question related to your case, and get AI-powered insights instantly.
        </p>

        {/* Status Messages */}
        {message && (
          <div className="mt-4 p-3 text-center font-semibold bg-yellow-100 text-yellow-700 rounded-lg">
            {message}
          </div>
        )}

        {/* Example Queries */}
        <div className="mt-4 text-center">
          <p className="text-gray-600">Not sure what to ask? Try:</p>
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {exampleQueries.map((example, index) => (
              <button
                key={index}
                onClick={() => setQuery(example)}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                {example}
              </button>
            ))}
          </div>
        </div>

        {/* Input Field */}
        <div className="mt-6 space-y-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your legal question..."
            className="w-full px-4 py-2 border rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
          />
          <button
            onClick={handleQuery}
            className={`w-full px-4 py-2 text-white font-bold rounded-lg transition ${
              isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Ask AI"}
          </button>
        </div>

        {/* AI Response Display */}
        {response && (
          <div className="mt-6 p-4 border border-gray-300 rounded-lg bg-gray-50">
            <h2 className="text-xl font-semibold text-gray-800">📜 AI Response</h2>
            <p
              className="text-gray-700 mt-2 whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: response }}
            />
          </div>
        )}

        {/* Query History */}
        {history.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-bold text-gray-800">📖 Query History</h3>
            <ul className="mt-2 space-y-2">
              {history.slice(0, 3).map((entry, index) => (
                <li key={index} className="p-3 bg-gray-50 border rounded-lg">
                  <p className="text-blue-600 font-semibold">Q: {entry.question}</p>
                  <p
                    className="text-gray-700 mt-1"
                    dangerouslySetInnerHTML={{ __html: entry.answer }}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Back to Marketplace Button */}
        <button
          onClick={() => router.push("/marketplace")}
          className="mt-6 w-full px-4 py-2 text-white font-bold rounded-lg transition bg-red-500 hover:bg-red-600"
        >
          🔙 Back to Marketplace
        </button>
      </div>
    </div>
  );
}
