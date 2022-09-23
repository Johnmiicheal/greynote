import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider } from "@mui/material";
import React, {useEffect} from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import theme from "../themes";


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
      <ThemeProvider theme={theme}>
        <Head>
          <link rel="shortcut icon" href="/graylogo.png" />
          <title>GrayBook</title>
        </Head>
          <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
        
        </ThemeProvider>
    );
  }
}

export default MyApp