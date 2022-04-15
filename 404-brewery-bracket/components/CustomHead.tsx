import * as React from 'react';
import Head from 'next/head';

export default function CustomHead() {
  return (
    <Head>
        <meta property="og:title" key="title"
        content="width=device-width, initial-scale=1, maximum-scale=1" />
    </Head>
  );
};