import "../styles/globals.css";
import { PrivyProvider } from "@privy-io/react-auth";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || "cm6u7t23v01x5fnsrt41q4pbg"}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </PrivyProvider>
  );
}
 
export default MyApp;
