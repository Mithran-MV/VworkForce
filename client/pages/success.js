import { useRouter } from "next/router";

export default function Success() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="bg-white text-gray-900 p-8 rounded-lg shadow-lg max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">🎉 Payment Successful!</h1>
        <p className="text-lg">You have successfully purchased an AI agent.</p>

        <div className="mt-6 flex flex-col space-y-3">
          <button
            onClick={() => router.push("/marketplace")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
          >
            🏪 Return to Marketplace
          </button>
          <button
            onClick={() => router.push("/dashboard")}
            className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            🔍 View Your AI Agents
          </button>
        </div>
      </div>
    </div>
  );
}
