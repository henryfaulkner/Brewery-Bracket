import * as React from "react";
import Head from "next/head";

export default function CustomHead() {
  return (
    <Head>
      <title>Brewery Bracket Home Page</title>
      <meta 
        name="viewport" 
        content="initial-scale=1.0, width=device-width maximum-scale=1" />
      <meta
        name="google-site-verification"
        content="googlec9225a2b0c03c875.html"
      />
      <meta
        name="Description"
        content="Click here to facilitate brewery brackets with your friends and co-workers! Keep your favorite drinking spots competitive."
      />
      <meta name="Keywords" content="Brewery Bracket" />
      <meta name="Keywords" content="Competition" />
    </Head>
  );
}
