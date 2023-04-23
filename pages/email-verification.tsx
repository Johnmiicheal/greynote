import React from "react";
import {
  Flex,
  Center,
  Text
} from "@chakra-ui/react";
import { Player } from "@lottiefiles/react-lottie-player";
import Header from "../src/components/Registration/Header";

const EmailVerification = () => {
  return (
    <Center>
      <Flex direction="column" align="center" mt={20} color="#000A16" gap="2">
        <Header />
        <Text fontSize="22" fontWeight={700}>Email Verification</Text>
        <Player autoplay loop src="/mail.json" style={{ width: "300px", height: "300px" }} />
        <Text fontWeight={600} w="350px" textAlign='center'>Thank you for registering to Graybook, please check your email for the verification to continue.</Text>
      </Flex>
    </Center>
  );
};

export default EmailVerification;
