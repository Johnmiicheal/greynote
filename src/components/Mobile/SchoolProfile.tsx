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
import { HiOutlinePencilAlt } from "react-icons/hi";
import {
  MdOutlinePersonPin,
  MdOutlineArchive,
  MdOutlineViewList,
} from "react-icons/md";
import GrayLayout from "../../../src/components/GrayLayout";
import Cases from "../../../src/components/GrayCases/Cases";
import Notes from "../../../src/components/GrayNotes/Notes";
import { useGetSchoolFromUrl } from "../../../src/utils/useGetSchoolFromUrl";
import {
  useAdminNotesQuery,
  useMeQuery,
  useSchoolCasesQuery,
  useAdminRequestsQuery,
} from "../../../src/gql/graphql";
import SchoolCard from "../../../src/components/SchoolCard";
import BarLoader from "react-spinners/BarLoader";
import { useRouter } from "next/router";
import Requests from "../../../src/components/GrayRequests/Requests";
import { Nav } from "./Navigation/BottomNav";
import Header from "./Navigation/Header";

const SchoolProfile = () => {
  const [{ data, fetching: loading }] = useGetSchoolFromUrl();
  const [{ data: me }] = useMeQuery();
  const [{ data: cases, fetching: casesFetching }] = useSchoolCasesQuery({
    variables: {
      limit: 15,
      cursor: 0,
    },
  });
  const [{ data: notes, fetching }] = useAdminNotesQuery({
    variables: {
      limit: 15,
      cursor: 0,
    },
  });
  const [{ data: requests, fetching: requestsFetching }] =
    useAdminRequestsQuery({
      variables: {
        // schoolId: data?.getSchoolByName?.school?.id!,
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
            <Image
              src="/icons/greyicon.png"
              alt="greynote_logo"
              w={40}
              mb={3}
            />
            <BarLoader color="#ffd880" width="150px" />
          </Flex>
        </Box>
      </Center>
    );
  } else if (isLoaded === true) {
    school = (
      <Center>
        <Flex
          direction="column"
          justify="space-between"
          w="full"
          minH="100vh"
          bg="#FFF0D9"
        >
          <Header />
          <Nav />

          <Flex direction="column" w="full">
            <Flex
              direction="column"
              justify="center"
              align="center"
              mt={16}
              bg="white"
            >
              <Box
                w="full"
                h="7vh"
                bgImg={data?.getSchoolByName?.school?.bannerImgUrl!}
                bgSize="cover"
                overflow="hidden"
              ></Box>
              <Flex direction="column" p={4} mt={-16}>
                <Flex gap={2} direction="column" align="center">
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
                    <Text textAlign="center">
                      {data?.getSchoolByName?.school?.address}
                    </Text>
                  </Flex>
                  <Flex
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
              direction="row"
              mt={6}
              bg="white"
              overflow="auto"
              h="full"
              minW="full"
              justify="center"
              py={5}
              px={2}
            >
              <Box w="full">
                <Flex direction="column" mt={{ base: 2, lg: 10 }}>
                  <Tabs
                    isFitted
                    variant="unstyled"
                    alignSelf="center"
                    px={3}
                    display={
                      me?.me?.admin?.id ===
                      data?.getSchoolByName?.school?.creator?.admin?.id
                        ? "block"
                        : "none"
                    }
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
                    </TabList>
                    <TabPanels>
                      {/*** ALL CASES SECTION ***/}
                      <TabPanel>
                        {cases?.schoolCases?.grayCase?.length! < 1 ? (
                          <Flex
                            direction="column"
                            align="center"
                            bg="white"
                            borderRadius="md"
                            w={{ base: "370px", md: "768px", lg: "750px" }}
                            py={10}
                            px={4}
                            ml={-3}
                          >
                            <Image
                              src="/empty.png"
                              alt="empty_database"
                              w="20%"
                            />
                            <Text mt="5">You have not added any cases</Text>
                          </Flex>
                        ) : (
                          cases?.schoolCases?.grayCase?.map((n) => (
                            <Cases p={n} key={n?.id} />
                          ))
                        )}
                      </TabPanel>
                      <TabPanel>
                        <Flex
                          direction="column"
                          align="center"
                          bg="white"
                          borderRadius="md"
                          w={{ base: "370px", md: "768px", lg: "750px" }}
                          py={10}
                          px={4}
                          ml={-3}
                        >
                          <Image
                            src="/children.png"
                            alt="empty_database"
                            w="30%"
                          />
                          <Text mt="5">You have no active cases</Text>
                        </Flex>
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </Flex>
              </Box>
            </Flex>

            <Flex
              direction="row"
              mt={6}
              bg="white"
              overflow="auto"
              h="full"
              minW="full"
              justify="center"
              py={5}
              px={2}
              mb={20}
            >
              <Box w="full">
                <Flex direction="column" mt={{ base: 2, lg: 10 }}>
                  <Tabs
                    isFitted
                    variant="unstyled"
                    alignSelf="center"
                    px={3}
                    display={
                      me?.me?.admin?.id ===
                      data?.getSchoolByName?.school?.creator?.admin?.id
                        ? "block"
                        : "none"
                    }
                  >
                    <TabList
                      bg="white"
                      mb={3}
                      borderRadius="md"
                      fontWeight={600}
                      color="gray.500"
                    >
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
                            as={HiOutlinePencilAlt}
                            fontSize={{ base: 24, md: 26 }}
                          />
                          <Text ml="1" pr={2}>
                            Notes
                          </Text>
                        </Flex>
                      </Tab>
                    </TabList>
                    <TabPanels>
                      <TabPanel>
                        {requests?.adminRequests?.requests &&
                        requests?.adminRequests?.requests.length > 0 ? (
                          <Flex direction="column">
                            {requests?.adminRequests?.requests?.map((req) => (
                              <Requests p={req} key={req.id} />
                            ))}
                          </Flex>
                        ) : (
                          <Flex
                            direction="column"
                            align="center"
                            bg="white"
                            borderRadius="md"
                            w={{ base: "370px", md: "768px", lg: "750px" }}
                            py={10}
                            px={4}
                            ml={-3}
                          >
                            <Image
                              src="/requests.png"
                              alt="empty_requests"
                              w="30%"
                            />
                            <Text mt="5">You have not sent any requests</Text>
                          </Flex>
                        )}
                      </TabPanel>
                      <TabPanel>
                        {notes?.adminNotes?.notes?.length! < 1 ? (
                          <Flex
                            direction="column"
                            align="center"
                            bg="white"
                            borderRadius="md"
                            w={{ base: "370px", md: "768px", lg: "750px" }}
                            py={10}
                            px={4}
                            ml={-3}
                          >
                            <Image src="/notes.png" alt="empty_notes" w="30%" />
                            <Text mt="5">You have not created any notes</Text>
                          </Flex>
                        ) : (
                          notes?.adminNotes?.notes?.map((note) => (
                            <Notes p={note} key={note.id} />
                          ))
                        )}
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </Flex>
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </Center>
    );
  } else {
    school = (
      <Center>
        <Flex direction="column" justify="space-between" w="full" minH="100vh">
          <Flex
            direction="column"
            ml="130px"
            w="full"
            px={{ base: 4, md: 4, lg: 18 }}
          >
            <Header />
            <Nav />
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
export default SchoolProfile;
