import Header from "./Header";
import Head from "./Head";


export default function Layout({ children }) {
    return (
      <>
      <Head />>
        <Header />
        <main>{children}</main>
      </>
    )
  }