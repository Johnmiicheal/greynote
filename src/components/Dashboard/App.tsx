import React, { useState } from "react";
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
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Skeleton,
  SkeletonCircle,
  Stack,
} from "@chakra-ui/react";
import Header from "../../components/Header";
import { IoPersonAddOutline } from "react-icons/io5";
import { IoIosPeople } from "react-icons/io";
import { AiOutlineFileSearch } from "react-icons/ai";
import { RiContactsBookFill } from "react-icons/ri";
import { useRouter } from "next/router";
import GrayLayout from "../../components/GrayLayout";
import { RegStudent } from "../Modals/RegStudent";
import { useMeQuery } from "../../gql/graphql";
import BarLoader from "react-spinners/BarLoader";
import { format } from "date-fns";
import GuageChart from "./GuageChart";
import MarqueeText from "../MarqueeText";
import { motion } from "framer-motion";


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
  const tabStyle = {
    bg: "#F4B95F",
    color: "white",
    borderRadius: "4px",
  };

  const panelStyle = {
    maxH: "100px",
    overflowY: "auto",
  };
  let reme = null;
  if (fetching && !me) {
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
          >
            <Header />
            <Flex w="100%" overflow="hidden" bg="red">
            <motion.div
        style={{ width: "100%" }}
        initial={{ x: "100%" }}
        animate={{ x: "-100%" }}
        transition={{ duration: 20, ease: "linear", repeat: Infinity }}
      >
        <Text whiteSpace="nowrap"></Text>
      </motion.div>
            </Flex>
            <Flex
              bg="#E6E6E6"
              gap={10}
              h="full"
              mt="5"
              borderRadius="20px 20px 0 0 "
              py={5}
              px={10}
            >
              <Flex direction="column" gap={5}>
                <Flex
                  direction="column"
                  overflow="hidden"
                  px={4}
                  py={2}
                  borderRadius="5px"
                  bgImg="/grayapppp.png"
                  w="800px"
                  h="250px"
                >
                  <Flex justify="space-between" gap={2}>
                    <Text
                      fontSize={24}
                      fontWeight={800}
                      color="white"
                      display={me?.me?.admin ? "block" : "none"}
                    >
                      Welcome, {me?.me?.admin?.adminName}
                    </Text>
                    <Text
                      textAlign="right"
                      color="white"
                      fontSize={24}
                      fontWeight={600}
                    >
                      {" "}
                      {format(new Date(), "EEEE dd MMMM yyyy")}
                    </Text>
                  </Flex>
                  <Flex mt={20}>
                    <Flex
                      bgColor="white"
                      px={4}
                      py={10}
                      h="100px"
                      w="300px"
                      borderRadius="md"
                      align="center"
                      cursor="pointer"
                      role="group"
                      _hover={{ borderWidth: "1px", borderColor: "#C58E3B" }}
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
                      bgColor="white"
                      ml={5}
                      px={4}
                      py={10}
                      h="100px"
                      w="300px"
                      borderRadius="md"
                      align="center"
                      cursor="pointer"
                      role="group"
                      _hover={{ borderWidth: "1px", borderColor: "gray.500" }}
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
                  </Flex>
                </Flex>
                <Flex gap={5}>
                <Flex direction="column" overflow="hidden" borderRadius="7px" align="center" bg="white" py={2} px={4} h="300px" w="330px" gap={1}>
                  <GuageChart />
                  <Flex align="center">
                    <Icon as={IoIosPeople} w="5" h="5" />
                    <Text><strong>Total Students Registered:</strong> 80</Text>
                  </Flex>
                  <Flex align="center" mt={1}>
                    <Icon as={RiContactsBookFill} w="4" h="4" /> 
                    <Text ml={1}><strong>Student Defaults Registered:</strong> 10</Text>
                  </Flex>
                </Flex>
                <Box bg="white" h="300px" w="450px" borderRadius="7px" ></Box>
              </Flex>
              </Flex>

              <Flex
                overflowY="auto"
                bg="white"
                borderRadius="5px"
                w="300px"
                h="full"
                align="center"
                direction="column"
              >
                <Text textAlign="left">Recent Activities</Text>
                <Tabs variant="unstyled" mt={2}>
                  <TabList>
                    <Tab _selected={{ ...tabStyle }}>Students</Tab>
                    <Tab _selected={{ ...tabStyle }}>Graycases</Tab>
                    <Tab _selected={{ ...tabStyle }}>Requests</Tab>
                  </TabList>
                  <TabPanels>

                    <TabPanel overflowY="auto" h="240px">
                      <Flex w={60} align="center" mb={5}>
                    <SkeletonCircle h={8} w={10} mr={3} />
                    <Stack w="full">
                      <Skeleton h="10px" />  
                      <Skeleton h="10px" w="100px" />
                    </Stack>
                  </Flex>
                  <Flex w={60} align="center" mb={5}>
                    <SkeletonCircle h={8} w={10} mr={3} />
                    <Stack w="full">
                      <Skeleton h="10px" />  
                      <Skeleton h="10px" w="100px" />
                    </Stack>
                  </Flex>
                  <Flex w={60} align="center" mb={5}>
                    <SkeletonCircle h={8} w={10} mr={3} />
                    <Stack w="full">
                      <Skeleton h="10px" />  
                      <Skeleton h="10px" w="100px" />
                    </Stack>
                  </Flex>
                    </TabPanel>

                    <TabPanel overflowY="auto" h="240px">
                    <Flex w={60} align="center" mb={5}>
                    <SkeletonCircle h={8} w={10} mr={3} />
                    <Stack w="full">
                      <Skeleton h="10px" />  
                      <Skeleton h="10px" w="100px" />
                    </Stack>
                  </Flex>
                  <Flex w={60} align="center">
                    <SkeletonCircle h={8} w={10} mr={3} />
                    <Stack w="full">
                      <Skeleton h="10px" />  
                      <Skeleton h="10px" w="100px" />
                    </Stack>
                  </Flex>
                    </TabPanel>

                    <TabPanel overflowY="auto" h="240px">
                    <Flex w={60} align="center" mb={5}>
                    <SkeletonCircle h={8} w={10} mr={3} />
                    <Stack w="full">
                      <Skeleton h="10px" />  
                      <Skeleton h="10px" w="100px" />
                    </Stack>
                  </Flex>
                  <Flex w={60} align="center">
                    <SkeletonCircle h={8} w={10} mr={3} />
                    <Stack w="full">
                      <Skeleton h="10px" />  
                      <Skeleton h="10px" w="100px" />
                    </Stack>
                  </Flex>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
                <Flex
                  direction="column"
                  justify="center"
                  align="center"
                  w="250px"
                  h="200px"
                  color="white"
                  p={3}
                  bgImg="/gray2box.png"
                  pos="fixed"
                  borderRadius="7px"
                  bottom={10}
                >
                  <Text fontWeight={600} fontSize={20} textAlign="center">
                    Experience more with Graybook Premium
                  </Text>

                  <Button
                    mt={3}
                    bg="#F4B95F"
                    color="white"
                    _hover={{ bg: "#DAA65D" }}
                    w={40}
                  >
                    Coming Soon
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <RegStudent isOpen={isRegOpen} onClose={onRegClose} />
      </Center>
    );
  }
  return reme;
};

export default App;
