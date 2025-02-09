import Link from "next/link";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Layout({ children }) {
  const { authenticated, user, logout } = usePrivy();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login"); // Redirect to login after logout
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header Section */}
      <header className="bg-blue-700 text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-6">
          {/* Logo & Branding */}
          <div className="flex items-center space-x-3">
            <Image src="/LOGO.png" alt="V-WorkForce Logo" width={40} height={40} />
            <h1 className="text-2xl font-bold hover:scale-105 transition-transform">
              <Link href="/">V-WorkForce</Link>
            </h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/marketplace" className="hover:underline">
              Marketplace
            </Link>

            {/* Legal AI Agents Dropdown */}
            <div className="relative group">
              <button className="hover:underline focus:outline-none px-4 py-2 flex items-center gap-1">
                ⚖️ Legal AI Agents ⬇️
              </button>
              <div className="absolute hidden group-hover:flex flex-col bg-white text-gray-900 mt-2 py-2 rounded-lg shadow-lg w-60 transition-all duration-200 opacity-0 group-hover:opacity-100">
                <Link href="/agent/1" className="block px-4 py-2 hover:bg-gray-200">
                  ⚖️ AI Legal Consultant
                </Link>
                <Link href="/agent/2" className="block px-4 py-2 hover:bg-gray-200">
                  📜 AI Compliance Officer
                </Link>
                <Link href="/agent/3" className="block px-4 py-2 hover:bg-gray-200">
                  ✍️ AI Contract Drafting
                </Link>
              </div>
            </div>

            {/* More AI Services Dropdown */}
            <div className="relative group">
              <button className="hover:underline focus:outline-none px-4 py-2 flex items-center gap-1">
                🔮 More AI Services ⬇️
              </button>
              <div className="absolute hidden group-hover:flex flex-col bg-white text-gray-900 mt-2 py-2 rounded-lg shadow-lg w-64 transition-all duration-200 opacity-0 group-hover:opacity-100">
                <Link href="#" className="block px-4 py-2 hover:bg-gray-200">
                  💰 AI Financial Advisors (Coming Soon)
                </Link>
                <Link href="#" className="block px-4 py-2 hover:bg-gray-200">
                  🧑‍💼 AI HR & Recruitment (Coming Soon)
                </Link>
                <Link href="#" className="block px-4 py-2 hover:bg-gray-200">
                  🏥 AI Healthcare Agents (Coming Soon)
                </Link>
                <Link href="#" className="block px-4 py-2 hover:bg-gray-200">
                  🎧 AI Customer Support (Coming Soon)
                </Link>
                <Link href="#" className="block px-4 py-2 hover:bg-gray-200">
                  🔐 AI Cybersecurity Analyst (Coming Soon)
                </Link>
                <Link href="#" className="block px-4 py-2 hover:bg-gray-200">
                  🚚 AI Supply Chain Manager (Coming Soon)
                </Link>
              </div>
            </div>
          </nav>

          {/* Right-Side Section: Profile & Logout */}
          <div className="flex items-center space-x-4">
            {authenticated ? (
              <div className="flex items-center space-x-3">
                <span className="hidden md:inline text-sm">{user?.email || "User"}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/login" className="bg-green-500 px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition">
                Login
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-6 py-6">{children}</main>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-gray-300 py-6 text-center mt-10">
        <p className="text-sm">&copy; 2025 V-WorkForce. All rights reserved.</p>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-4 mt-3">
          <Link href="https://github.com/Mithran-MV/VworkForce" className="hover:underline">
            🐙 GitHub
          </Link>
          <Link href="https://www.linkedin.com/in/mithran-mv/" className="hover:underline">
            💼 LinkedIn
          </Link>
          <Link href="https://discord.com" className="hover:underline">
            💬 Discord
          </Link>
        </div>
      </footer>
    </div>
  );
}
