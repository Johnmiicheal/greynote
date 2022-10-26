import React from "react";
import {
  Flex,
  Text,
  Image,
  Icon,
  Center,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Badge,
} from "@chakra-ui/react";
import Header from "../src/components/Header";
import { IoPersonAddOutline } from "react-icons/io5";
import { AiOutlineFileSearch, AiOutlineFileAdd } from "react-icons/ai";
import { useRouter } from "next/router";
import GrayLayout from "../src/components/GrayLayout";
import NextLink from "next/link";

import { fakedb } from "../fakedata";
import { RadarChart } from "../src/components/RadarChart";

const GrayCase = () => {
  const router = useRouter();
  return (
    <Center>
      <Flex direction="row" justify="space-between" w="full" minH="100vh">
        <Flex direction="column">
          <GrayLayout />
        </Flex>

        <Flex
          direction="column"
          ml="130px"
          w="full"
          px={{ base: 4, md: 4, lg: 10 }}
        >
          <Header />
          <Flex
            direction="column"
            bg="#CBCBCB"
            h="full"
            mt="5"
            borderRadius="20px 20px 0 0 "
            py={5}
            px={10}
          >
              <Text fontSize={24} fontWeight={800} color="#212121">
                GrayCases
              </Text>
            <Flex direction="row" mt={4}>
              <Flex
                bg="white"
                px={4}
                py={10}
                h="100px"
                w="300px"
                borderRadius="md"
                align="center"
                cursor="pointer"
                role="group"
                _hover={{ borderWidth: "1px", borderColor: "gray.400" }}
              >
                <Flex
                  color="#8E6930"
                  bg="#FFCE83"
                  borderRadius="full"
                  p={3}
                  mr={1}
                >
                  <Icon as={IoPersonAddOutline} w={7} h={7} />
                </Flex>
                <Text>Add Student to a graycase</Text>
              </Flex>

              <Flex
                bg="white"
                ml={10}
                px={4}
                py={10}
                h="100px"
                w="300px"
                borderRadius="md"
                align="center"
                cursor="pointer"
                role="group"
                _hover={{ borderWidth: "1px", borderColor: "gray.400" }}
              >
                <Flex
                  color="#343434"
                  bg="#979797"
                  borderRadius="full"
                  p={3}
                  mr={1}
                >
                  <Icon as={AiOutlineFileSearch} w={7} h={7} />
                </Flex>
                <Text>Search for a candidate</Text>
              </Flex>
            
            <Flex
                bg="white"
                ml={10}
                px={4}
                py={10}
                h="100px"
                w="300px"
                borderRadius="md"
                align="center"
                cursor="pointer"
                role="group"
                _hover={{ borderWidth: "1px", borderColor: "gray.400" }}
              >
                <Flex
                  color="#8E6930"
                  bg="#FFCE83"
                  borderRadius="full"
                  p={3}
                  mr={1}
                >
                  <Icon as={AiOutlineFileAdd} w={7} h={7} />
                </Flex>
                <Text>Create a new graycase</Text>
              </Flex>
            </Flex>


            <Flex direction="column" mt={5} bg="white" borderRadius="md">
              <RadarChart />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Center>
  );
};

export default GrayCase;
