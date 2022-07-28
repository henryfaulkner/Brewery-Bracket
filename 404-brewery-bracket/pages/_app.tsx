import "../styles/foundational/globals.scss";
import Layout from "../components/Layout";
import { UserContext } from "../lib/context";
import { useUserData } from '../lib/hooks';


function MyApp({ Component, pageProps }) {
  return (
    <UserContext.Provider value={ useUserData() } >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserContext.Provider>
  );
}

export default MyApp;
