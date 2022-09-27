import React from "react";
import { Layout } from "../src/components/Layout";
import { Flex, Text, Image, Icon, Center, Box } from "@chakra-ui/react";
import Header from "../src/components/Header";
import { IoPersonAddOutline } from "react-icons/io5";
import { AiOutlineFileSearch } from "react-icons/ai";

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
          <Text fontSize={18} fontWeight={500} color="black" mt={10}>Welcome to GrayBook</Text>
          <Text fontSize={18} fontWeight={400} color="black" mt={2}>Try creating a case to start a database.</Text>
          <Text fontSize={18} fontWeight={400} color="black" mt={2}>You can also search for your candidate, if they have a graybook case</Text>
          <Flex direction="row" mt={10}>
            <Flex bg='white' px={4} py={10} h='100px' w="300px" borderRadius="md" align='center' cursor='pointer' role="group" _hover={{ borderWidth: "1px", borderColor:'gray.400' }}>
              <Flex  color= "#8E6930" bg= "#FFCE83"  borderRadius='full' p={3} mr={1}>
                <Icon as={IoPersonAddOutline} w={7} h={7}  />
              </Flex>
              <Text>Create a graybook case</Text>
            </Flex>

            <Flex bg='white' ml={10} px={4} py={10} h='100px' w="300px" borderRadius="md" align='center' cursor='pointer' role="group" _hover={{ borderWidth: "1px", borderColor:'gray.400' }}>
              <Flex  color= "#343434" bg= "#979797"  borderRadius='full' p={3} mr={1}>
                <Icon as={ AiOutlineFileSearch } w={7} h={7}  />
              </Flex>
              <Text>Search for a candidate</Text>
            </Flex>
          </Flex>

        </Flex>

        </Flex>
      </Flex>
      </Center>
  );
};

export default Home;
