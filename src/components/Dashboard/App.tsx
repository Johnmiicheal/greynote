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
} from "@chakra-ui/react";
import Header from "../../components/Header";
import { IoPersonAddOutline } from "react-icons/io5";
import { IoIosPeople } from "react-icons/io";
import { AiOutlineFileSearch } from "react-icons/ai";
import { RiContactsBookFill } from "react-icons/ri";
import { useRouter } from "next/router";
import GrayLayout from "../../components/GrayLayout";
import { RegStudent } from "../Modals/RegStudent";
import { SearchStudent } from "../Modals/SearchStudent";
import {
  useMeQuery,
  useAdminNotesQuery,
  useAdminRequestsQuery,
  useSchoolRequestsQuery,
  useAdminCaseCountQuery,
  useAdminStudentCountQuery,
  useRecentCasesQuery,
  useRecentStudentsQuery,
} from "../../gql/graphql";
import BarLoader from "react-spinners/BarLoader";
import { format } from "date-fns";
import { HomeChart } from "../HomeChart";
import SmallNotes from "../GrayNotes/SmallNotes";
import SmallRequests from "../GrayRequests/SmallRequests";
import { CreateNote } from "../Modals/CreateNote";
import SmallCases from "../GrayCases/SmallCases";
import RecentStudent from "./RecentStudent";

const App = () => {
  const router = useRouter();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isRegOpen,
    onOpen: onRegOpen,
    onClose: onRegClose,
  } = useDisclosure();
  const {
    isOpen: isNoteOpen,
    onOpen: onNoteOpen,
    onClose: onNoteClose,
  } = useDisclosure();

  const [{ data: me, fetching }] = useMeQuery();
  const [{ data: count }] = useAdminStudentCountQuery();
  const [{ data: caseCount }] = useAdminCaseCountQuery();
  const tabStyle = {
    bg: "#F4B95F",
    color: "white",
    borderRadius: "4px",
  };
  const [{ data: notes }] = useAdminNotesQuery({
    variables: {
      limit: 5,
      cursor: 0,
    },
  });
  const [{ data: admin }] = useAdminRequestsQuery({
    variables: {
      limit: 15,
      cursor: 0,
    },
  });
  const [{ data: school }] = useSchoolRequestsQuery({
    variables: {
      schoolId: me?.me?.admin?.id!,
      limit: 15,
      cursor: 0,
    },
  });
  const [{ data: cases }] = useRecentCasesQuery();
  const [{ data: student }] = useRecentStudentsQuery();

  let appPage = null;
  if (fetching) {
    router.reload();
    appPage = (
      <Center>
        <Box minW="full" mt={{ base: 60, md: 60, lg: 40 }}>
          <Flex
            direction="column"
            align="center"
            minW={{ base: "full", lg: "650px" }}
          >
            <Image src="/icons/greyicon.png" alt="zlogo" w={40} mb={3} />
            <BarLoader color="#ffd880" width="150px" />
          </Flex>
        </Box>
      </Center>
    );
  } else if (!fetching && !me?.me?.admin) {
    router.reload();
  } else if (me?.me?.admin?.id) {
    appPage = (
      <Center>
        <Flex direction="row" justify="space-between" overflowX={"hidden"} w="full" minH="100vh">
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
                  bgImg="/app/greyframe.png"
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
                      onClick={onOpen}
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
                  <Flex
                    direction="column"
                    overflow="hidden"
                    borderRadius="7px"
                    align="center"
                    bg="white"
                    py={2}
                    px={4}
                    h="300px"
                    w="330px"
                    gap={1}
                  >
                    {/* <GuageChart /> */}
                    <Flex align="center">
                      <Icon as={IoIosPeople} w="5" h="5" />
                      <Text>
                        <strong>Total Students Registered:</strong>{" "}
                        {count?.adminStudentCount}
                      </Text>
                    </Flex>
                    <Flex align="center" mt={1}>
                      <Icon as={RiContactsBookFill} w="4" h="4" />
                      <Text ml={1}>
                        <strong>Student Defaults Registered:</strong>{" "}
                        {caseCount?.adminCaseCount}
                      </Text>
                    </Flex>
                  </Flex>
                  <Box bg="white" h="300px" w="450px" borderRadius="7px">
                    <HomeChart />
                  </Box>
                </Flex>
              </Flex>

              <Flex
                overflowY="auto"
                bg="white"
                borderRadius="5px"
                w="380px"
                h="full"
                align="center"
                direction="column"
              >
                <Text textAlign="left">Recent Activities</Text>
                <Tabs variant="unstyled" mt={2} align="center">
                  <TabList>
                    <Tab _selected={{ ...tabStyle }}>Notes</Tab>
                    <Tab _selected={{ ...tabStyle }}>Students</Tab>
                    <Tab _selected={{ ...tabStyle }}>Graycases</Tab>
                    <Tab _selected={{ ...tabStyle }}>Requests</Tab>
                  </TabList>
                  <TabPanels mt={2}>
                    <TabPanel overflow="auto">
                      {notes?.adminNotes?.notes?.length! < 1 ? (
                        <Flex
                          direction="column"
                          align="center"
                          bg="white"
                          borderRadius="md"
                          px={4}
                        >
                          <Image src="/notes.png" alt="no_cases_yet" w="50%" />
                          <Text mt="5" textAlign="center">
                            You don't have any notes created
                          </Text>
                          <Button
                    mt={3}
                    bg="#F4B95F"
                    color="white"
                    _hover={{ bg: "#DAA65D" }}
                    w={40}
                    onClick={onNoteOpen}
                  >
                    Create Note
                  </Button>
                          
                        </Flex>
                      ) : (
                        notes?.adminNotes?.notes?.map((note) => (
                          <SmallNotes p={note} key={note.id} />
                        ))
                      )}
                    </TabPanel>
                    <TabPanel overflowY="auto" h="240px">
                      {student?.recentStudents?.length! > 0 ? (
                        student?.recentStudents?.map((s) => (
                          <RecentStudent p={s} key={s.id} />
                        ))
                      ) : (
                        <Flex
                          direction="column"
                          align="center"
                          bg="white"
                          borderRadius="md"
                          px={4}
                        >
                          <Image src="/studnet.png" alt="no_student" w="50%" />
                          <Text mt="5" textAlign="center">
                            It seems you haven't added any students yet
                          </Text>
                        </Flex>
                      )}
                    </TabPanel>

                    <TabPanel overflowY="auto" h="240px">
                      {cases?.recentCases?.length! > 0 ? (
                        cases?.recentCases?.map((c) => (
                          <SmallCases p={c} key={c.id} />
                        ))
                      ): (
                      <Flex
                        direction="column"
                        align="center"
                        bg="white"
                        borderRadius="md"
                        px={4}
                      >
                        <Image src="/empty.png" alt="no_cases_yet" w="50%" />
                        <Text mt="5" textAlign="center">
                          You have no active cases in your school
                        </Text>
                      </Flex>
                      )}
                    </TabPanel>

                    <TabPanel overflowY="auto" h="240px">
                      {school?.schoolRequests?.requests &&
                      school?.schoolRequests?.requests.length > 0 ? (
                        school?.schoolRequests?.requests?.map((req) => (
                          <SmallRequests p={req} key={req.id} />
                        ))
                      ) : (
                        <Flex
                          direction="column"
                          align="center"
                          bg="white"
                          borderRadius="md"
                          px={4}
                        >
                          <Image
                            src="/requests.png"
                            alt="no_requests"
                            w="50%"
                          />
                          <Text mt="5" textAlign="center">
                            Yet to receive any requests? Don't fret
                          </Text>
                        </Flex>
                      )}
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
                  bgImg="/app/greybox.png"
                  pos="fixed"
                  borderRadius="7px"
                  bottom={10}
                >
                  <Text fontWeight={600} fontSize={20} textAlign="center">
                    Experience more with Greynote Premium
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
        <SearchStudent isOpen={isOpen} onClose={onClose} />
        <CreateNote isOpen={isNoteOpen} onClose={onNoteClose} />
      </Center>
    );
  }

  return appPage;
};

export default App;
