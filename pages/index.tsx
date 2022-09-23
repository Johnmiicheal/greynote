import React from "react";
import { Layout } from "../src/components/Layout";
import { Flex, Text, Image, Icon } from "@chakra-ui/react";
import Header from "../src/components/Header";
import { AiOutlineHome } from "react-icons/ai";
import { TiContacts } from "react-icons/ti";

import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();
  return (
    <Layout>
      <Flex direction="row" justify="center">
        <Flex
          direction="column"
          bg="#212121"
          minH="100vh"
          w="130px"
          pos="fixed"
          left={0}
          px={5}
          py={4}
          align="center"
        >
          <Image src="/grayaxis.png" minW="80px" />

          <Flex
            direction="column"
            mt={10}
            w="full"
            py={2}
            align="center"
            role="group"
            _hover={{ color: "#8E6930", bg: "#FFCE83" }}
            borderRadius="md"
            cursor="pointer"
            color={ router.pathname ==="/" ? "#FFCE83" : "gray.200" }
          >
            <Icon as={AiOutlineHome} w={6} h={6} mb={2} />
            <Text fontSize={13} fontWeight={400}>
              {" "}
              Home{" "}
            </Text>
          </Flex>

          <Flex
            direction="column"
            mt={10}
            color="gray.200"
            w="full"
            py={2}
            align="center"
            role="group"
            _hover={{ color: "#8E6930", bg: "#FFCE83" }}
            borderRadius="md"
            cursor="pointer"
          >
            <Icon as={TiContacts} w={6} h={6} mb={2} />
            <Text fontSize={13} fontWeight={400}>
              {" "}
              My Database{" "}
            </Text>
          </Flex>
        </Flex>

        <Flex direction="column" bg="#CBCBCB" w="1200px" minH="88.4vh" mt={20} borderRadius="20px 20px 0 0 ">

        </Flex>
      </Flex>
    </Layout>
  );
};

export default Home;
