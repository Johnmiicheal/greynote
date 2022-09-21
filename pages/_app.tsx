import { ChakraProvider } from "@chakra-ui/react";
import React, {useEffect} from "react";
import type { AppProps } from "next/app";
import Head from "next/head";


function MyApp({ Component, pageProps }: AppProps) {
  const [showChild, setShowChild] = React.useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);


  if (!showChild) {
    return null;
  }
  if (typeof window === "undefined") {
    return <></>;
  } else {
    return (
        <ChakraProvider>
        <Head>
          <link rel="shortcut icon" href="/graylogo.png" />
          <title>GrayBook</title>
        </Head>

          <Component {...pageProps} />
        </ChakraProvider>
    );
  }
}

export default MyApp