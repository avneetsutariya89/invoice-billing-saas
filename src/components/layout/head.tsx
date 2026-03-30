import Head from 'next/head';

export default function HeadComponent() {
  return (
    <Head>
      <title>NexyBill - Smart Bill Splitting Calculator</title>
      <meta name="description" content="Split bills fairly and accurately with NexyBill - the smart bill splitting calculator" />
      <meta name="keywords" content="bill splitting, expense calculator, split bills, fair share, group expenses" />
      <meta name="author" content="NexyBill Team" />
      <meta property="og:title" content="NexyBill - Smart Bill Splitting Calculator" />
      <meta property="og:description" content="Split bills fairly and accurately with NexyBill - the smart bill splitting calculator" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://nexybill.com" />
      <meta property="og:image" content="/og-image.jpg" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="NexyBill - Smart Bill Splitting Calculator" />
      <meta name="twitter:description" content="Split bills fairly and accurately with NexyBill - the smart bill splitting calculator" />
      <meta name="twitter:image" content="/twitter-image.jpg" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
    </Head>
  );
}
