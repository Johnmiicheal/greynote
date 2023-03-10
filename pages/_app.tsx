/* eslint-disable @next/next/no-sync-scripts */
import { ChakraProvider, ThemeProvider } from "@chakra-ui/react";
import React, {useEffect} from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import theme from "../themes";
import Router, { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../src/utils/createUrqlClient";
import TopBarProgress from "react-topbar-progress-indicator"

function MyApp({ Component, pageProps }: AppProps) {
  const [progress, setProgress] = React.useState(false)
  Router.events.on("routeChangeStart", () => { setProgress(true) })
  Router.events.on("routeChangeComplete", () => { setProgress(false) })
  TopBarProgress.config({
    barColors: {
      "0": "#FFCE83",
      "1.0": "#8E6930"
    }
  })
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
            {progress && <TopBarProgress />}
          <Component {...pageProps} />
        </ChakraProvider>
        
        </ThemeProvider>
    );
  }
}


export default withUrqlClient(createUrqlClient) (MyApp);
