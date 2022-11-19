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
import Header from "../src/components/Header";
import { IoPersonAddOutline } from "react-icons/io5";
import { AiOutlineFileSearch, AiOutlineFileAdd } from "react-icons/ai";
import { useRouter } from "next/router";

import GrayLayout from "../src/components/GrayLayout";
import NextLink from "next/link";
import { RegStudent } from "../src/components/RegStudent";

import { useMeQuery } from "../src/gql/graphql";
import { NewGrayCase } from "../src/components/NewGrayCase";
import BarLoader from "react-spinners/BarLoader";

const Home = () => {
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
  } else if (!me?.me?.admin) {
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
              <Box
                boxSize="fit-content"
                bg="#ffd880"
                w="600px"
                h="200px"
                borderRadius="md"
                py={1}
                px={4}
                display={me?.me?.admin ? "none" : "block"}
              >
                <Text fontSize={24} fontWeight={800} color="#212121">
                  Welcome to graybook
                </Text>
                <Text fontSize={16} fontWeight={400} color="black" mt={3}>
                  To enjoy the full features, login or register
                </Text>
                <Text fontSize={16} fontWeight={400} color="black" mt={1}>
                  You can also search for a student, if they have a graybook
                  case
                </Text>
                <Flex mt={10} align="center">
                  <NextLink href="/login">
                    <Button
                      bg="white"
                      color="#8E6930"
                      _hover={{ borderWidth: "1px", borderColor: "#8E6930" }}
                      borderRadius="md"
                      w="20"
                      size="md"
                    >
                      Login
                    </Button>
                  </NextLink>

                  <NextLink href="/register">
                    <Button
                      ml={3}
                      color="#8E6930"
                      _hover={{
                        borderWidth: "1px",
                        bg: "#8E6930",
                        color: "white",
                      }}
                      borderRadius="md"
                      borderColor="#8E6930"
                      variant="outline"
                      w="20"
                      size="md"
                    >
                      Register
                    </Button>
                  </NextLink>
                </Flex>
              </Box>
            </Flex>
          </Flex>
        </Flex>
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

export default Home;
