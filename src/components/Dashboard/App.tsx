import React, {useState} from "react";
import {
  Flex,
  Text,
  Box,
  Icon,
  Center,
  useDisclosure,
  Button,
  useToast,
  Image,
} from "@chakra-ui/react";
import Header from "../../components/Header";
import { IoPersonAddOutline } from "react-icons/io5";
import { AiOutlineFileSearch, AiOutlineFileAdd } from "react-icons/ai";
import { useRouter } from "next/router";

import GrayLayout from "../../components/GrayLayout";
import NextLink from "next/link";
import { RegStudent } from "../../components/RegStudent";

import { useMeQuery } from "../../gql/graphql";
import { NewGrayCase } from "../../components/NewGrayCase";
import BarLoader from "react-spinners/BarLoader";

const App = () => {
  const router = useRouter();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isRegOpen,
    onOpen: onRegOpen,
    onClose: onRegClose,
  } = useDisclosure();

  const [{ data: me, fetching }] = useMeQuery();
  let reme = null;
  if (fetching) {
    reme = (
      <Center>
        <Box minW="full" mt={{ base: 60, md: 60, lg: 40 }}>
          <Flex
            direction="column"
            align="center"
            minW={{ base: "full", lg: "650px" }}
          >
            <Image src="/graylogo.png" alt="zlogo" w={40} mb={3} />
            <BarLoader color="#ffd880" width="150px" />
          </Flex>
        </Box>
      </Center>
    );
  } else {
    reme = (
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
            py={2}
          >
            <Header />
            <Flex
              direction="column"
              bg="#E6E6E6"
              h="full"
              mt="5"
              borderRadius="20px 20px 0 0 "
              py={5}
              px={10}
            >
              <Flex direction="column" mt={2}>
                <Text
                  fontSize={24}
                  fontWeight={800}
                  color="#212121"
                  display={me?.me?.admin ? "block" : "none"}
                >
                  Welcome, {me?.me?.admin?.adminName}
                </Text>

                <Text
                  fontSize={18}
                  mt={10}
                  fontWeight={600}
                  color="blackAlpha.700"
                  mb={2}
                >
                  Quick Access, for {me?.me?.admin?.school}
                </Text>
                <Flex>
                  <Flex
                    bgImg="/Frame.png"
                    px={4}
                    py={10}
                    h="100px"
                    w="300px"
                    borderRadius="md"
                    align="center"
                    cursor="pointer"
                    role="group"
                    _hover={{ borderWidth: "1px", borderColor: "#FFD088" }}
                    onClick={onRegOpen}
                  >
                    <Flex
                      color="#8E6930"
                      bg="#FFCE83"
                      borderRadius="5px"
                      p={5}
                      mr={4}
                    >
                      <Icon as={IoPersonAddOutline} w={7} h={7} />
                    </Flex>
                    <Text>Register a Student</Text>
                  </Flex>

                  <Flex
                    bgImg="/FrameB.png"
                    ml={5}
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
                      borderRadius="5px"
                      p={5}
                      mr={4}
                    >
                      <Icon as={AiOutlineFileSearch} w={7} h={7} />
                    </Flex>
                    <Text>Search Database</Text>
                  </Flex>

                  <Flex
                    bgImg="/Frame.png"
                    px={4}
                    py={10}
                    ml={5}
                    h="100px"
                    w="300px"
                    borderRadius="md"
                    align="center"
                    cursor="pointer"
                    role="group"
                    _hover={{ borderWidth: "1px", borderColor: "#FFD088" }}
                    onClick={
                      me?.me?.admin
                        ? onOpen
                        : () =>
                            toast({
                              title:
                                "Please login or register to access this feature",
                              status: "info",
                              duration: 6000,
                              isClosable: false,
                            })
                    }
                  >
                    <Flex
                      color="#8E6930"
                      bg="#FFCE83"
                      borderRadius="5px"
                      p={5}
                      mr={4}
                    >
                      <Icon as={AiOutlineFileAdd} w={7} h={7} />
                    </Flex>
                    <Text>Create a GrayCase</Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <RegStudent isOpen={isRegOpen} onClose={onRegClose} />
        <NewGrayCase isOpen={isOpen} onClose={onClose} />


        
      </Center>
    );
  }
  return reme;
};

export default App;
