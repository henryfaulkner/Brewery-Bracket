import Header from "./Header";
import Head from "../components/CustomHead";


export default function Layout({ children }) {
    return (
      <>
      <Head />
        <Header />
        <main>{children}</main>
      </>
    )
  }