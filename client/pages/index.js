import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login"); // Redirect to login after a brief delay
    }, 1500);

    return () => clearTimeout(timer); // Cleanup timeout
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <h1 className="text-3xl font-bold mb-4">🚀 Welcome to V-WorkForce</h1>
      <p className="text-lg">Redirecting to login...</p>
      
      {/* Loading Animation */}
      <div className="mt-6 animate-spin rounded-full h-10 w-10 border-t-4 border-white"></div>
    </div>
  );
}
