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
      <Flex>{children}</Flex>
    </Center>
  );
};
