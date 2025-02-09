import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Image from "next/image";

export default function Login() {
  const { login, logout, authenticated } = usePrivy();
  const router = useRouter();

  useEffect(() => {
    if (authenticated) {
      router.push("/marketplace");
    }
  }, [authenticated, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-900 text-white">
      <div className="bg-white text-gray-800 p-10 rounded-xl shadow-lg max-w-md w-full text-center">
        {/* LOGO */}
        <div className="flex justify-center mb-4">
          <Image src="/LOGO.png" alt="V-WorkForce Logo" width={140} height={140} />
        </div>

        {/* Centered Title */}
        <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">
          Welcome to <span className="whitespace-nowrap">V-WorkForce</span>
        </h1>

        {/* Description */}
        <p className="mt-3 text-gray-600">
          A decentralized AI-powered workforce marketplace. Login to access AI legal consultants, contract drafting, and compliance officers.
        </p>

        {/* Login / Logout Button */}
        {!authenticated ? (
          <button
            onClick={login}
            className="mt-6 bg-blue-600 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 w-full flex items-center justify-center space-x-2"
          >
            <span>🔑</span> <span>Login with Privy</span>
          </button>
        ) : (
          <button
            onClick={logout}
            className="mt-6 bg-red-500 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 w-full flex items-center justify-center space-x-2"
          >
            <span>🚪</span> <span>Logout</span>
          </button>
        )}

        {/* Terms & Privacy Links */}
        <p className="text-sm text-gray-500 mt-4">
          By logging in, you agree to our{" "}
          <a href="/terms" className="text-blue-600 hover:underline">
            Terms of Service
          </a>{" "}
          &{" "}
          <a href="/privacy" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>.
        </p>
      </div>
    </div>
  );
}
