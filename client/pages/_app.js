import "../styles/globals.css";
import { PrivyProvider } from "@privy-io/react-auth";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <PrivyProvider appId="cm6u7t23v01x5fnsrt41q4pbg">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </PrivyProvider>
  );
}
 
export default MyApp;
