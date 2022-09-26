import React from "react";
import { Layout } from "../src/components/Layout";
import { Flex, Text, Image, Icon, Center, Box } from "@chakra-ui/react";
import Header from "../src/components/Header";
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import { RiContactsBookLine, RiContactsBookFill } from "react-icons/ri";

import { useRouter } from "next/router";
import GrayLayout from "../src/components/GrayLayout";

const Home = () => {
  const router = useRouter();
  return (
      <Center>
      <Flex direction="row" justify="space-between" w='full' minH="100vh">
       <Flex direction='column'>
        <GrayLayout />
      </Flex> 

        <Flex direction="column" ml="130px" w='full' px={{ base: 4, md: 4, lg: 10 }}>
        <Header />
        <Flex direction="column" bg="#CBCBCB" h="full"  mt="5" borderRadius="20px 20px 0 0 " py={5} px={10}>
          <Text fontSize={24} fontWeight={600} color="black">Dashboard</Text>

          <Flex direction="row" mt={10}>
            <Flex bg='white' px={4} py={10} h='50px' w="300px" borderRadius="md" align='center'>
              <Text>Create a database</Text>
            </Flex>
          </Flex>

        </Flex>

        </Flex>
      </Flex>
      </Center>
  );
};

export default Home;
