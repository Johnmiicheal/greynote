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
import React, { useState } from "react";
import {
  IoGridOutline,
  IoChatbubbleEllipsesOutline,
  IoBookmarksOutline,
  IoCaretUpCircleOutline,
} from "react-icons/io5";
import GrayLayout from "../src/components/GrayLayout";
import Header from "../src/components/Header";
import { useGetSchoolFromUrl } from "../src/utils/useGetSchoolFromUrl";
import { useMeQuery } from "../src/gql/graphql";
import SchoolCard from "../src/components/SchoolCard";

const School = () => {
  const [{ data }] = useGetSchoolFromUrl();
  const [{ data: me }] = useMeQuery();

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
          px={{ base: 4, md: 4, lg: 18 }}
        >
          <Header />
          <Flex
            direction="row"
            mt={2}
            bg="#E6E6E6"
            h="full"
            borderRadius="20px 20px 0 0 "
            py={5}
            px={10}
          >
            <Box w={{ base: "full", lg: "650px" }}>
              <Flex
                direction="column"
                align={{ base: "center", md: "start" }}
                justify={{ md: "flex-start" }}
                mt={{ base: 2 }}
                bg="white"
                borderRadius="md"
              >
                <Box
                  w="full"
                  h="150px"
                  bgImg={data?.getSchoolByName?.school?.bannerImgUrl}
                  borderRadius="7px 7px 0 0"
                  overflow="hidden"
                  objectFit="cover"
                ></Box>
                <Flex direction="column" p={4}>
                  <Avatar
                    name={data?.getSchoolByName?.school?.schoolName}
                    src={data?.getSchoolByName?.school?.logoImgUrl}
                    w={{ base: "120px", md: "150px" }}
                    h={{ base: "120px", md: "150px" }}
                    mr={{ base: 0, md: 24 }}
                    mt={{ base: 0, md: -20 }}
                    background={
                      "linear-gradient(#fff, #fff) padding-box, linear-gradient(to right, #5E00AB, #57FFF5) border-box"
                    }
                    border="3px solid transparent"
                  />
                  <Flex direction="row">
                    <Flex direction="column" justify="space-between">
                      <Flex
                        direction={{ base: "column", md: "row" }}
                        justify="space-between"
                        align="center"
                        mt={6}
                      >
                        <Heading
                          fontSize={{ base: 18, md: 28 }}
                          fontWeight={400}
                          mr={{ base: 0, md: 2 }}
                        >
                          {data?.getSchoolByName?.school?.schoolName}
                        </Heading>
                      </Flex>

                      <Flex direction="column">
                        <Stack direction="row" spacing={10} mt={2}>
                          <Text fontSize="1rem" fontWeight={400} mr={2}>
                            <b>100k</b> Upvotes
                          </Text>

                          <Text fontSize="1rem" mr={2}>
                            <b>103</b> Points
                          </Text>
                          <Box>
                            <Badge colorScheme="pink" variant="solid">
                              L1 USER
                            </Badge>
                          </Box>
                        </Stack>
                        <Box mt={2}>
                          <Text>{data?.getSchoolByName?.school?.address}</Text>
                          <Text fontWeight="light">
                            {data?.getSchoolByName?.school?.description}
                          </Text>
                        </Box>
                        <Flex
                          direction="row"
                          mt={2}
                          display={
                            me?.me?.admin?.id ===
                            data?.getSchoolByName?.school?.creator?.admin?.id
                              ? "none"
                              : "flex"
                          }
                        >
                          <Button size="sm" colorScheme="blue" fontWeight={400}>
                            View Website
                          </Button>
                          <Button
                            ml={2}
                            size="sm"
                            variant="outline"
                            colorScheme="blue"
                            fontWeight={400}
                          >
                            More
                          </Button>
                        </Flex>
                      </Flex>
                    </Flex>

                    <Flex
                      direction="column"
                      justify="flex-end"
                      w="240px"
                      h="20px"
                      mt={8}
                    >
                      <Flex
                        direction="row"
                        justify="flex-end"
                        align="center"
                        display={
                          me?.me?.admin?.id ===
                          data?.getSchoolByName?.school?.creator?.admin?.id
                            ? "flex"
                            : "none"
                        }
                      >
                        <Button size="sm" colorScheme="blue" fontWeight={400}>
                          Edit Profile
                        </Button>
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
              <Flex
                direction="column"
                mt={{ base: 2, lg: 10 }}
                minW={{ base: "full", lg: "650px" }}
              >
                <Tabs
                  isFitted
                  variant="unstyled"
                  alignSelf="center"
                  w={{ lg: "680px" }}
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
                    <Tab _selected={{ color: "blue.300" }}>
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
                          as={IoGridOutline}
                          fontSize={{ base: 24, md: 26 }}
                        />
                        <Text ml="1" pr={2}>
                          Posts
                        </Text>
                      </Flex>
                    </Tab>

                    <Tab _selected={{ color: "#487D8D" }}>
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
                          as={IoChatbubbleEllipsesOutline}
                          fontSize={{ base: 24, md: 26 }}
                        />
                        <Text ml="1" pr={2}>
                          Comments
                        </Text>
                      </Flex>
                    </Tab>

                    <Tab
                      _selected={{ color: "#FF377F" }}
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
                          as={IoBookmarksOutline}
                          fontSize={{ base: 24, md: 26 }}
                        />
                        <Text ml="1" pr={2}>
                          Saved
                        </Text>
                      </Flex>
                    </Tab>

                    <Tab
                      _selected={{ color: "#5E00AB" }}
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
                          as={IoCaretUpCircleOutline}
                          fontSize={{ base: 24, md: 26 }}
                        />
                        <Text ml="1" pr={2}>
                          Upvotes
                        </Text>
                      </Flex>
                    </Tab>
                  </TabList>
                  <TabPanels>
                    {/* USER POST SECTION */}
                    {/* <TabPanel>
                  {!data && fetching ? (
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
                  ) : (
                    userpost?.userPosts?.posts?.map((p) => (
                      <UserPosts p={p} key={p.id} />
                    ))
                  )}
                  <Flex justify="center">
                    <Button
                      colorScheme="blue"
                      borderRadius="md"
                      size="lg"
                      h={10}
                      fontWeight={500}
                    >
                      Load More
                    </Button>
                  </Flex>
                </TabPanel>

               
                <TabPanel>
                  {!data && fetching ? (
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
                  ) : (
                    <Flex justify="center">
                      {me.data?.me?.user?.id === data?.user?.user?.id
                        ? "post a comment to see it here🥸"
                        : `Sorry, I haven't made a comment yet😣`}
                    </Flex>
                  )}
                </TabPanel>
                <TabPanel>
                  {!data && fetching ? (
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
                  ) : (
                    <Flex justify="center">Save a post to see it here🤗</Flex>
                  )}
                </TabPanel>

                <TabPanel>
                  {!data && fetching ? (
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
                  ) : (
                    <Flex justify="center">
                      Upvote a post to see it here🤩
                    </Flex>
                  )}
                </TabPanel> */}
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
};
export default School;
