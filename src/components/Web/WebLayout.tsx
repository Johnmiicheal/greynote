import React from "react";
import { Box, Flex, Center } from "@chakra-ui/react";
import Header from "./Header";
import Head from "next/head";

interface WebLayoutProps {
  children?: React.ReactNode;
}

export const WebLayout: React.FC<WebLayoutProps> = ({ children }) => {
  return (
    <Center>
      <Head>
        <title>
          Graybook - Simplifying Student Management
        </title>
        <link rel="shortcut icon" href="/gray2logo.png" />
      </Head>
      <Header />
      <Box
        w={{ base: "480px", md: "768px", lg: "1024px" }}
        bg="white"
      >
        <Flex justify="center">{children}</Flex>
      </Box>
    </Center>
  );
};
