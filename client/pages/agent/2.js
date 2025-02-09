import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";

export default function ComplianceOfficer() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  const handleQuery = async () => {
    if (!query.trim()) return;

    const userMessage = { sender: "user", text: query };
    setConversation((prev) => [...prev, userMessage]);
    setQuery("");
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:5001/ai-compliance-officer", {
        userQuery: query,
        history: conversation,
      });

      // Ensure AI response is formatted correctly
      const aiResponse = response.data.response || "⚠️ No valid response received.";
      const aiMessage = { sender: "agent", text: formatMarkdownResponse(aiResponse) };

      setConversation((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("❌ AI Compliance Agent Error:", error);
      setConversation((prev) => [
        ...prev,
        { sender: "agent", text: "❌ Error processing request. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to format AI responses
  const formatMarkdownResponse = (response) => {
    return response
      .replace(/\*\*(.*?)\*\*/g, "**$1**") // Ensure bold text is formatted correctly
      .replace(/(\d+)\./g, "- **$1.**") // Convert numbered lists to bullet lists
      .replace(/(?<=\n)([-*]) /g, "- "); // Ensure bullet points are correctly formatted
  };

  const exampleQueries = [
    "What are the key GDPR compliance requirements?",
    "How do I ensure tax compliance for my business?",
    "What are the SEC reporting obligations?",
    "How do I check if my company is following labor laws?",
    "What are the penalties for non-compliance with data protection laws?",
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-2xl p-8 flex flex-col">
        {/* Header Section */}
        <h1 className="text-4xl font-bold text-gray-800 text-center">📜 AI Compliance Officer</h1>
        <p className="text-gray-600 text-center mt-2">
          Ask compliance-related questions (GDPR, SEC, tax laws, etc.) and get AI-powered insights.
        </p>

        {/* Chat Window */}
        <div className="mt-6 h-[500px] overflow-y-auto border rounded-lg p-6 bg-gray-100 shadow-inner">
          {conversation.length === 0 && (
            <p className="text-gray-500 text-center">Start by asking a compliance question...</p>
          )}
          {conversation.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} mb-4`}>
              <div
                className={`p-4 rounded-2xl max-w-lg break-words shadow ${
                  msg.sender === "user" ? "bg-blue-500 text-white" : "bg-white text-gray-900 border"
                }`}
              >
                <ReactMarkdown className="text-md leading-relaxed">{msg.text}</ReactMarkdown>
              </div>
            </div>
          ))}
          {isLoading && <p className="text-gray-500 text-center">AI is thinking...</p>}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Field & Send Button */}
        <div className="mt-4 flex items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your compliance question..."
            className="flex-1 px-5 py-3 border rounded-l-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleQuery}
            className={`px-6 py-3 text-white font-bold rounded-r-lg transition ${
              isLoading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "..." : "Ask"}
          </button>
        </div>

        {/* Example Queries */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 font-semibold">Try asking:</p>
          <div className="flex flex-wrap justify-center gap-3 mt-3">
            {exampleQueries.map((example, index) => (
              <button
                key={index}
                onClick={() => setQuery(example)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-xl hover:bg-gray-400 transition"
              >
                {example}
              </button>
            ))}
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={() => router.push("/marketplace")}
          className="mt-8 w-full px-6 py-3 text-white font-bold rounded-lg transition bg-red-500 hover:bg-red-600"
        >
          🔙 Back to Marketplace
        </button>
      </div>
    </div>
  );
}
