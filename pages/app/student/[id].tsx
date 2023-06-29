// Student Profile Page
import React from "react";
import {
  Flex,
  Text,
  Image,
  Center,
  Box,
  Avatar,
  Button,
  useDisclosure,
  UnorderedList,
  ListItem,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Badge,
  Portal,
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverTrigger,
  PopoverFooter,
  Stack,
} from "@chakra-ui/react";
import GrayLayout from "../../../src/components/GrayLayout";
import Header from "../../../src/components/Header";
import { PDFViewer } from "../../../src/components/PDFViewer";
import BarLoader from "react-spinners/BarLoader";
import { useGetStudentById } from "../../../src/utils/useGetStudentById";
import { AddGrayCase } from "../../../src/components/Modals/AddGrayCase";
import { EditStudent } from "../../../src/components/EditStudent";
import {
  useGetCaseCountQuery,
  useMeQuery,
  useGetStudentCasesQuery,
} from "../../../src/gql/graphql";
import { format } from "date-fns";
import NextLink from "next/link";
import { RequestStudent } from "../../../src/components/Modals/RequestStudent";
import { CaseModal } from "../../../src/components/GrayCases/CaseModal";

const Student = () => {
  const [{ data, fetching, error }] = useGetStudentById();
  const [{ data: me }] = useMeQuery();
  const [{ data: count }] = useGetCaseCountQuery({
    variables: {
      getCaseCountId: data?.getStudentById?.student?.id!,
    },
  });
  const [{ data: cases }] = useGetStudentCasesQuery({
    variables: {
      studentId: data?.getStudentById?.student?.id!,
    },
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const {
    isOpen: isFileOpen,
    onOpen: onFileOpen,
    onClose: onFileClose,
  } = useDisclosure();
  const {
    isOpen: isReqOpen,
    onOpen: onReqOpen,
    onClose: onReqClose,
  } = useDisclosure();
  const {
    isOpen: isCaseOpen,
    onOpen: onCaseOpen,
    onClose: onCaseClose,
  } = useDisclosure();

  let student = null;
  if (fetching) {
    student = (
      <Center>
        <Box minW="full" mt={{ base: 60, md: 60, lg: 40 }}>
          <Flex
            direction="column"
            align="center"
            minW={{ base: "full", lg: "650px" }}
          >
            <Image src="/icons/greyicon.png" alt="greynote logo" w={40} mb={3} />
            <BarLoader color="#ffd880" width="150px" />
          </Flex>
        </Box>
      </Center>
    );
  } else if (error) {
    console.log(error);
    student = (
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
  } else if (data) {
    student = (
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
              gap={12}
              justify="center"
              bg="#E6E6E6"
              h="full"
              mt="5"
              borderRadius="20px 20px 0 0 "
              py={5}
              px={10}
            >
              <Flex>
                <Flex
                  pb={2}
                  direction="column"
                  justify="start"
                  h="80vh"
                  bg="white"
                  borderRadius="lg"
                  px={10}
                  pt={2}
                >
                  <Flex gap={2}>
                    <Avatar
                      name={data?.getStudentById?.student?.firstName}
                      src={data?.getStudentById?.student?.profileImgUrl}
                      size="2xl"
                      borderRadius="7px"
                      border="3px solid #FFBF5C"
                    />
                    <Flex direction="column" justify="space-between">
                      <Stack spacing="-1">
                        <Text fontWeight={600} fontSize={28}>
                          {data?.getStudentById?.student?.firstName +
                            " " +
                            data?.getStudentById?.student?.lastName}
                        </Text>
                        <Text fontWeight={700} color="gray.500" fontSize={18}>
                          {data?.getStudentById?.student?.grayId}
                        </Text>
                      </Stack>
                      <Flex justify="end">
                        <Text>
                          <strong>{data?.getStudentById?.student?.ageInput}</strong>{" "}
                          Years Old |
                        </Text>
                        <Text ml={1}>
                          <strong>{data?.getStudentById?.student?.gender}</strong>{" "}
                          Student |
                        </Text>
                        <Text ml={1}>
                          <strong>{count?.getCaseCount}</strong>{" "}
                          {count?.getCaseCount! < 2 ? "GrayCase" : "GrayCases"}
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>

                  <Flex
                    mt={5}
                    gap={2}
                    display={
                      data?.getStudentById?.student?.creator?.admin?.id ===
                      me?.me?.admin?.id
                        ? "none"
                        : "flex"
                    }
                  ><Button
                  bg="#F4B95F"
                  _hover={{ bg: "#DAA65D" }}
                  color="white"
                  onClick={onReqOpen}
                >
                  Request Student
                </Button>
                </Flex>

                  <Flex
                    mt={5}
                    gap={2}
                    display={
                      data?.getStudentById?.student?.creator?.admin?.id ===
                      me?.me?.admin?.id
                        ? "flex"
                        : "none"
                    }
                  >
                    <Button
                      bg="#F4B95F"
                      _hover={{ bg: "#DAA65D" }}
                      color="white"
                      onClick={onEditOpen}
                    >
                      Edit Student
                    </Button>
                    <Button
                      variant="outline"
                      color= "#F4B95F"
                      borderColor="#F4B95F"
                      _hover={{ color: "#FFFFFF", bg: "#DAA65D", borderColor: "#FFFFFF"  }}
                      onClick={onOpen}
                    >
                      Add GrayCase
                    </Button>
                  </Flex>

                  <Flex
                    mt={3}
                    bg="white"
                    direction="column"
                    w="full"
                    borderRadius="lg"
                    overflowY="auto"
                    py={2}
                    display={ cases?.getStudentCases.length === 0 ? 'none' : 'block'}
                  >
                    <Text fontWeight="bold" fontSize={22}>  
                      Active Graycases
                    </Text>
                    <UnorderedList px={2}>
                      {cases?.getStudentCases?.map(
                        (
                          p: {
                            category:
                              | string
                              | number
                              | boolean
                              | React.ReactElement<
                                  any,
                                  string | React.JSXElementConstructor<any>>
                              | React.ReactFragment
                              | React.ReactPortal
                              | null
                              | undefined;
                            createdAt: string | number | Date;
                            id: number;
                          },
                          i: React.Key | null | undefined
                        ) => (
                          <Box key={i}>
                          <ListItem key={i} _hover={{ color: "#F4B95F", fontWeight: 600 }} cursor="pointer" onClick={onCaseOpen}>
                            {p.category} created on{" "}
                            {format(new Date(p.createdAt), "PP")}
                          </ListItem>
                          <CaseModal isOpen={isCaseOpen} onClose={onCaseClose} id={p.id} />
                          </Box>
                        )
                      )}
                    </UnorderedList>
                  </Flex>
                </Flex>

              </Flex>

              <Flex direction="column" gap="5">
                <Flex
                  bg="white"
                  direction="column"
                  w="550px"
                  borderRadius="lg"
                  pt={2}
                  pb={5}
                  px={5}
                >
                  <Text fontWeight="bold" fontSize={22} mb={4}>
                    Student Details
                  </Text>
                  <Flex mb={4} ml={-4}>
                    <Popover trigger="hover" isLazy openDelay={650}>
                      <PopoverTrigger>
                        <Button fontSize={{ base: 14, md: 18 }} variant="none">
                          <Avatar
                            src={
                              data?.getStudentById?.student?.school?.school
                                ?.logoImgUrl
                            }
                            w="40px"
                            h="40px"
                            borderRadius="md"
                            name={
                              data?.getStudentById?.student?.school?.school
                                ?.schoolName
                            }
                          />
                          <Flex direction="column" ml={2} align="start">
                            <Text fontWeight="600">
                              {
                                data?.getStudentById?.student?.school?.school
                                  ?.schoolName
                              }
                            </Text>
                            <Text
                              fontWeight="400"
                              color="gray.600"
                              fontSize="14"
                              mt={1}
                            >
                              {data?.getStudentById?.student?.startDate} -{" "}
                              {data?.getStudentById?.student?.endDate}
                            </Text>
                          </Flex>
                        </Button>
                      </PopoverTrigger>
                      <Portal>
                        <PopoverContent>
                          <PopoverHeader>
                            <Flex align="center">
                              <Avatar
                                size="md"
                                src={
                                  data?.getStudentById?.student?.school?.school
                                    ?.logoImgUrl
                                }
                              />
                              <Text fontSize={18} ml={2} fontWeight={600}>
                                {
                                  data?.getStudentById?.student?.school?.school
                                    ?.schoolName
                                }
                              </Text>
                            </Flex>
                          </PopoverHeader>
                          <PopoverBody>
                            <Text noOfLines={2}>
                              {" "}
                              {
                                data?.getStudentById?.student?.school?.school
                                  ?.description
                              }{" "}
                            </Text>
                          </PopoverBody>
                          <PopoverFooter>
                            <Flex>
                              <NextLink
                                href={{
                                  pathname: "/app/school/[schoolName]",
                                  query: {
                                    schoolName:
                                      data?.getStudentById?.student?.school
                                        ?.school?.schoolName,
                                  },
                                }}
                                passHref
                              >
                                <Button
                                  bg="#F4B95F"
                                  _hover={{ bg: "#DAA65D" }}
                                  color="white"
                                >
                                  View School
                                </Button>
                              </NextLink>
                              <Button
                                borderColor="#F4B95F"
                                _hover={{ bg: "#DAA65D", color: "white" }}
                                color="#F4B95F"
                                variant="outline"
                                ml={5}
                                onClick={onReqOpen}
                                display={data?.getStudentById?.student?.school?.school
                                  ?.schoolName === me?.me?.admin?.school ? 'none' : 'block'}
                              >
                                Request Student
                              </Button>
                            </Flex>
                          </PopoverFooter>
                        </PopoverContent>
                      </Portal>
                    </Popover>
                  </Flex>
                  <UnorderedList px={2} spacing={4}>
                    <ListItem>
                      <strong>Date of Birth: </strong>
                      {format(
                        new Date(data?.getStudentById?.student?.birthDate),
                        "PP"
                      )}
                    </ListItem>
                    <ListItem>
                      <strong>Grade Class: </strong>
                      {data?.getStudentById?.student?.gradeClass}
                    </ListItem>
                    <ListItem>
                      <strong>Current School: </strong>
                      {
                        data?.getStudentById?.student?.school?.school
                          ?.schoolName
                      }
                    </ListItem>
                    <ListItem>
                      <strong>State of Origin: </strong>
                      {data?.getStudentById?.student?.state}
                    </ListItem>
                    <ListItem>
                      <strong>Academic Result: </strong>
                      <Button
                        onClick={onFileOpen}
                        variant="link"
                        color="#FFBF5C"
                        fontWeight={600}
                      >
                        View Student Result
                      </Button>
                      <PDFViewer
                        path={data?.getStudentById?.student?.academicResult}
                        isOpen={isFileOpen}
                        onClose={onFileClose}
                      />
                    </ListItem>
                  </UnorderedList>
                </Flex>

                <Flex
                  bg="white"
                  direction="column"
                  w="550px"
                  borderRadius="lg"
                  py={2}
                  px={5}
                  display={me?.me?.admin?.id != data?.getStudentById?.student?.creator?.admin?.id ? "none" : "flex"}
                >
                  <Text fontWeight="bold" fontSize={22} mb={4}>
                    Parent Details
                  </Text>
                  <UnorderedList px={2} spacing={4}>
                    <ListItem>
                      <strong>Parent Name: </strong>
                      {data?.getStudentById?.student?.parentName}
                    </ListItem>
                    <ListItem>
                      <strong>Parent Email: </strong>
                      {data?.getStudentById?.student?.parentEmail}
                    </ListItem>
                    <ListItem>
                      <strong>Parent Number: </strong>
                      {data?.getStudentById?.student?.parentNumber}
                    </ListItem>
                    <ListItem>
                      <strong>Home Address: </strong>
                      {data?.getStudentById?.student?.homeAddress}
                    </ListItem>
                  </UnorderedList>
                </Flex>
              </Flex>
            </Flex>

            <EditStudent
              s={data?.getStudentById?.student!}
              isOpen={isEditOpen}
              onClose={onEditClose}
            />

            <RequestStudent
              req={data?.getStudentById?.student!}
              isOpen={isReqOpen}
              onClose={onReqClose}
            />

            <AddGrayCase
              id={data?.getStudentById?.student?.id!}
              isOpen={isOpen}
              onClose={onClose}
            />
          </Flex>
        </Flex>
      </Center>
    );
  }
  return student;
};
export default Student;
