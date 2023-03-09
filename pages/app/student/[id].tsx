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
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Badge,
  Portal,
  Stack,
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverTrigger,
  PopoverFooter,
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
  useTransferStudentMutation,
} from "../../../src/gql/graphql";
import { format } from "date-fns";
import { TransferStudent } from "../../../src/components/Modals/TransferStudent";
import NextLink from "next/link";
import { RequestStudent } from "../../../src/components/Modals/RequestStudent";

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

  const [, transfer] = useTransferStudentMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isTransferOpen,
    onOpen: onTransferOpen,
    onClose: onTransferClose,
  } = useDisclosure();

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

  const handleStudent = () => {
    data?.getStudentById?.student?.school?.school?.schoolName ===
    me?.me?.admin?.school
      ? onTransferOpen
      : onReqOpen;
  };
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
            <Image src="/graylogo.png" alt="zlogo" w={40} mb={3} />
            <BarLoader color="#ffd880" width="150px" />
          </Flex>
        </Box>
      </Center>
    );
  } else if (error) {
    console.log(error);
    student = (
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
              direction="row"
              justify="start"
              bg="#E6E6E6"
              h="full"
              mt="5"
              borderRadius="20px 20px 0 0 "
              py={5}
              px={10}
            >
              <Flex direction="row" minH="full" justify="center">
                <Flex
                  pb={2}
                  direction="column"
                  justify="start"
                  align="center"
                  minH="full"
                  bg="white"
                  borderRadius="lg"
                  p={10}
                >
                  <Avatar
                    name={data?.getStudentById?.student?.firstName}
                    src={data?.getStudentById?.student?.profileImgUrl}
                    size="2xl"
                    borderColor="#FFBF5C"
                    borderWidth="2px"
                  />
                  <Flex direction="column" textAlign="center">
                    <Text mt={2} fontWeight={500} fontSize={24}>
                      {data?.getStudentById?.student?.firstName +
                        " " +
                        data?.getStudentById?.student?.lastName}
                    </Text>
                    <Text fontWeight={500} fontSize={20}>
                      Graybook ID: {data?.getStudentById?.student?.grayId}
                    </Text>
                  </Flex>
                  <Flex justify="space-between" mt={5}>
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
                  <Flex
                    mt={5}
                    display={
                      data?.getStudentById?.student?.creator?.admin?.id ===
                      me?.me?.admin?.id
                        ? "flex"
                        : "none"
                    }
                  >
                    <Button
                      mr={2}
                      bg="#F4B95F"
                      _hover={{ bg: "#DAA65D" }}
                      color="white"
                      onClick={onEditOpen}
                    >
                      Edit Student
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={onOpen}
                      display={
                        data?.getStudentById?.student?.creator?.admin?.id ===
                        me?.me?.admin?.id
                          ? "block"
                          : "none"
                      }
                    >
                      Add GrayCase
                    </Button>
                  </Flex>

                  <Flex
                    mt={5}
                    bg="white"
                    direction="column"
                    align="center"
                    w="full"
                    borderRadius="lg"
                    py={2}
                    px={5}
                    // display={ !cases?.getStudentCases ? 'flex' : 'none'}
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
                                  string | React.JSXElementConstructor<any>
                                >
                              | React.ReactFragment
                              | React.ReactPortal
                              | null
                              | undefined;
                            createdAt: string | number | Date;
                          },
                          i: React.Key | null | undefined
                        ) => (
                          <ListItem key={i}>
                            {p.category} created on{" "}
                            {format(new Date(p.createdAt), "PP")}
                          </ListItem>
                        )
                      )}
                    </UnorderedList>
                  </Flex>
                </Flex>

              </Flex>

              <Flex direction="column" ml={10}>
                <Flex
                  bg="white"
                  direction="column"
                  w="550px"
                  borderRadius="lg"
                  py={2}
                  px={5}
                >
                  <Text fontWeight="bold" fontSize={22} mb={4}>
                    Student Details
                  </Text>
                  <Flex mb={4} align="start">
                    <Popover trigger="hover" isLazy openDelay={650}>
                      <PopoverTrigger>
                        <Button fontSize={{ base: 14, md: 18 }} variant="none">
                          <Avatar
                            src={
                              data?.getStudentById?.student?.school?.school
                                ?.logoImgUrl
                            }
                            size="md"
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
                              >
                                {data?.getStudentById?.student?.school?.school
                                  ?.schoolName === me?.me?.admin?.school
                                  ? "Transfer Student"
                                  : "Request Student"}
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
                  mt={5}
                  bg="white"
                  direction="column"
                  w="550px"
                  borderRadius="lg"
                  py={2}
                  px={5}
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

            <TransferStudent
              id={data?.getStudentById?.student?.id!}
              isOpen={isTransferOpen}
              onClose={onTransferClose}
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
