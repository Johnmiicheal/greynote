import {
  Box,
  Flex,
  Avatar,
  Badge,
  Stack,
  Button,
  Heading,
  Text,
  IconButton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Center,
  Image,
  VStack,
  SkeletonCircle,
  SkeletonText,
  Icon,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import {
  IoGridOutline,
  IoChatbubbleEllipsesOutline,
  IoBookmarksOutline,
  IoCaretUpCircleOutline,
} from "react-icons/io5";
import {
  MdOutlinePersonPin,
  MdOutlineArchive,
  MdOutlineViewList,
} from "react-icons/md";
import GrayLayout from "../../../src/components/GrayLayout";
import Header from "../../../src/components/Header";
import Cases from "../../../src/components/Cases";
import { useGetSchoolFromUrl } from "../../../src/utils/useGetSchoolFromUrl";
import { useMeQuery, useSchoolCasesQuery } from "../../../src/gql/graphql";
import SchoolCard from "../../../src/components/SchoolCard";
import BarLoader from "react-spinners/BarLoader";
import { useRouter } from "next/router";

const School = () => {
  const [{ data, fetching: loading }] = useGetSchoolFromUrl();
  const [{ data: me }] = useMeQuery();
  const [{ data: cases, fetching: casesFetching }] = useSchoolCasesQuery({
    variables: {
      limit: 15,
      cursor: 0,
    },
  });
  const router = useRouter();
  let school = null;

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    if (!loading && !casesFetching && data) {
      setIsLoaded(true);
    }
  }, [loading, casesFetching, data]);

  if (isLoaded === false) {
    school = (
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
  } else if (isLoaded === true) {
    school = (
      <Center>
        <Flex direction="row" justify="space-between" w="full" minH="100vh">
          <Flex direction="column">
            <GrayLayout />
          </Flex>

          <Flex
            direction="column"
            ml="130px"
            w="full"
            px={{ base: 4, md: 4, lg: 18 }}
          >
            <Header />
            <Flex
              direction="row"
              mt={2}
              bg="#E6E6E6"
              h="full"
              minW="full"
              justify="center"
              borderRadius="20px 20px 0 0 "
              py={5}
              px={10}
            >
              <Box w={{ base: "full", lg: "750px" }}>
                <Flex
                  direction="column"
                  justify="center"
                  mt={{ base: 2 }}
                  bg="white"
                  borderRadius="md"
                >
                  <Box
                    w="750px"
                    h="150px"
                    bgImg="https://i.imgur.com/3RqN4L8.png"
                    borderRadius="7px 7px 0 0"
                    overflow="hidden"
                    objectFit="cover"
                  ></Box>
                  <Flex direction="column" p={4}>

                    <Flex gap={2} >
                      <Avatar
                        name={data?.getSchoolByName?.school?.schoolName}
                        src={data?.getSchoolByName?.school?.logoImgUrl}
                        w={{ base: "120px", md: "150px" }}
                        h={{ base: "120px", md: "150px" }}
                        mt={{ base: 0, md: -20 }}
                        border="7px solid #FFFFFF"
                      />
                      <Flex direction="column">
                        <Heading
                          fontSize={{ base: 18, md: 28 }}
                          fontWeight={600}
                          mt={-3}
                        >
                          {data?.getSchoolByName?.school?.schoolName}
                        </Heading>
                        <Text>{data?.getSchoolByName?.school?.address}</Text>
                      </Flex>
                      <Flex
                          marginLeft="auto"
                          display={
                            me?.me?.admin?.id ===
                            data?.getSchoolByName?.school?.creator?.admin?.id
                              ? "flex"
                              : "none"
                          }
                        >
                          <Button
                            size="sm"
                            bg="#F4B95F"
                            color="white"
                            _hover={{ bg: "#DAA65D" }}
                            fontWeight={400}
                            onClick={() => router.push("/app/settings")}
                          >
                            Edit Profile
                          </Button>
                        </Flex>

                    </Flex>
                  </Flex>
                </Flex>
                <Flex
                  direction="column"
                  mt={{ base: 2, lg: 10 }}
                  minW={{ base: "full", lg: "750px" }}
                >
                  <Tabs
                    isFitted
                    variant="unstyled"
                    alignSelf="center"
                    w={{ lg: "780px" }}
                    minW={{ lg: "600px" }}
                    px={3}
                  >
                    <TabList
                      bg="white"
                      mb={3}
                      borderRadius="md"
                      fontWeight={600}
                      color="gray.500"
                    >
                      <Tab _selected={{ color: "#F4B95F" }}>
                        <Flex
                          align="center"
                          borderRadius="md"
                          role="group"
                          cursor="pointer"
                          _hover={{
                            bg: "gray.200",
                          }}
                          mr={{ base: 0, md: 2 }}
                          py={1}
                          pl={1}
                        >
                          <Icon
                            as={MdOutlineViewList}
                            fontSize={{ base: 24, md: 26 }}
                          />
                          <Text ml="1" pr={2}>
                            All Cases
                          </Text>
                        </Flex>
                      </Tab>

                      <Tab _selected={{ color: "#F4B95F" }}>
                        <Flex
                          align="center"
                          borderRadius="md"
                          role="group"
                          cursor="pointer"
                          _hover={{
                            bg: "gray.200",
                          }}
                          mr={{ base: 0, md: 2 }}
                          py={1}
                          pl={1}
                        >
                          <Icon
                            as={MdOutlinePersonPin}
                            fontSize={{ base: 24, md: 26 }}
                          />
                          <Text ml="1" pr={2}>
                            Active Cases
                          </Text>
                        </Flex>
                      </Tab>

                      <Tab
                        _selected={{ color: "#F4B95F" }}
                        display={
                          me?.me?.admin?.id ===
                          data?.getSchoolByName?.school?.creator?.admin?.id
                            ? "flex"
                            : "none"
                        }
                      >
                        <Flex
                          align="center"
                          borderRadius="md"
                          role="group"
                          cursor="pointer"
                          _hover={{
                            bg: "gray.200",
                          }}
                          mr={{ base: 0, md: 2 }}
                          py={1}
                          pl={1}
                        >
                          <Icon
                            as={MdOutlineArchive}
                            fontSize={{ base: 24, md: 26 }}
                          />
                          <Text ml="1" pr={2}>
                            Requests
                          </Text>
                        </Flex>
                      </Tab>
                    </TabList>
                    <TabPanels>
                      {/*** ALL CASES SECTION ***/}
                      <TabPanel>
                        {casesFetching ? (
                          <VStack spacing={{ base: 0, md: 5 }}>
                            <Box
                              borderWidth="1px"
                              borderRadius="lg"
                              bg="white"
                              p={4}
                              boxShadow="lg"
                              w={{ base: "370px", md: "768px", lg: "650px" }}
                              minH={40}
                              mb={{ base: 2 }}
                            >
                              <SkeletonCircle size="10" />
                              <SkeletonText mt="4" noOfLines={4} spacing="4" />
                            </Box>

                            <Box
                              borderWidth="1px"
                              borderRadius="lg"
                              bg="white"
                              p={4}
                              boxShadow="lg"
                              w={{ base: "370px", md: "768px", lg: "650px" }}
                              minH={40}
                              mb={{ base: 2 }}
                            >
                              <SkeletonCircle size="10" />
                              <SkeletonText mt="4" noOfLines={4} spacing="4" />
                            </Box>
                          </VStack>
                        ) : !cases?.schoolCases ? (
                          <Text>No cases registered yet</Text>
                        ) : (
                          cases?.schoolCases?.grayCase?.map((n) => (
                            <Cases p={n} key={n?.id} />
                          ))
                        )}
                      </TabPanel>
                      <TabPanel>Nothing to see here</TabPanel>
                      <TabPanel>No requests yet</TabPanel>
                    </TabPanels>
                  </Tabs>
                </Flex>
              </Box>
              <Box display={{ base: "none", lg: "block" }} ml={5}>
                <SchoolCard />
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </Center>
    );
  } else {
    school = (
      <Center>
        <Flex direction="row" justify="space-between" w="full" minH="100vh">
          <Flex direction="column">
            <GrayLayout />
          </Flex>

          <Flex
            direction="column"
            ml="130px"
            w="full"
            px={{ base: 4, md: 4, lg: 18 }}
          >
            <Header />
            <Flex
              direction="column"
              mt={2}
              bg="#E6E6E6"
              h="full"
              minW="full"
              align="center"
              borderRadius="20px 20px 0 0 "
              py={5}
              px={10}
              gap={4}
            >
              <Image src="/server-down.svg" alt="connection_lost" w="300px" />
              <Text w="400px" textAlign="center">
                We seem to have lost you there, try checking your internet
                connection and then refresh the page.
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Center>
    );
  }

  return school;
};
export default School;
