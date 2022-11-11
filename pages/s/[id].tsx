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
} from "@chakra-ui/react";
import GrayLayout from "../../src/components/GrayLayout";
import Header from "../../src/components/Header";
import BarLoader from "react-spinners/BarLoader";
import { useGetStudentById } from "../../src/utils/useGetStudentById";
import { AddGrayCase } from "../../src/components/AddGrayCase";
import { useGetCaseCountQuery, useMeQuery } from "../../src/gql/graphql";
import { format } from "date-fns";

const Student = () => {
  const [{ data, fetching, error }] = useGetStudentById();
  const [{ data: me }] = useMeQuery();
  const [{ data: count }] = useGetCaseCountQuery({
    variables: {
      getCaseCountId: data?.getStudentById?.student?.id!,
    },
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
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
              direction="column"
              justify="start"
              bg="#E6E6E6"
              h="full"
              mt="5"
              borderRadius="20px 20px 0 0 "
              py={5}
              px={10}
            >
              <Flex align="center" bg="white" p={10} borderRadius="lg">
                <Avatar
                  name={data?.getStudentById?.student?.firstName}
                  src={data?.getStudentById?.student?.profileImgUrl}
                  size="2xl"
                />
                <Flex direction="column" ml={10}>
                  <Text fontWeight={500} fontSize={24}>
                    {data?.getStudentById?.student?.firstName +
                      " " +
                      data?.getStudentById?.student?.lastName}
                  </Text>
                  <Flex justify="space-between" mt={2}>
                    <Text>
                      <strong>{data?.getStudentById?.student?.ageInput}</strong>{" "}
                      Years Old
                    </Text>
                    <Text ml={3}>
                      <strong>{data?.getStudentById?.student?.gender}</strong>{" "}
                      Student
                    </Text>
                    <Text ml={3}>
                      <strong>{count?.getCaseCount}</strong>{" "}
                      {count?.getCaseCount! < 2 ? "GrayCase" : "GrayCases"}
                    </Text>
                  </Flex>
                  <Flex mt={3}>
                    <Button
                      mr={2}
                      bg="#F4B95F"
                      _hover={{ bg: "#DAA65D" }}
                      color="white"
                    >
                      {data?.getStudentById?.student?.creator?.admin?.id ===
                      me?.me?.admin?.id
                        ? " Transfer Student"
                        : "Request Student"}
                    </Button>
                    <Button variant="ghost" onClick={onOpen} display={data?.getStudentById?.student?.creator?.admin?.id ===
                      me?.me?.admin?.id
                        ? "block"
                        : "none"}>
                      Add GrayCase
                    </Button>
                  </Flex>
                </Flex>
              </Flex>
              <AddGrayCase
                id={data?.getStudentById?.student?.id!}
                isOpen={isOpen}
                onClose={onClose}
              />
            <Flex mt={10}>
              <Flex bg="white" direction="column" w="550px" borderRadius="lg" py={2} px={5}>
                <Text fontWeight="bold" fontSize={22}>
                    Student Details
                </Text>
                    <UnorderedList px={2}>
                    <ListItem>
                        <strong>Date of Birth: </strong>{format(new Date(data?.getStudentById?.student?.birthDate), 'PP')}
                    </ListItem>
                    <ListItem>
                        <strong>Grade Class: </strong>{data?.getStudentById?.student?.gradeClass}
                    </ListItem>
                    <ListItem>
                        <strong>Current School: </strong>{data?.getStudentById?.student?.school?.school?.schoolName}
                    </ListItem>
                    <ListItem>
                        <strong>State of Origin: </strong>{data?.getStudentById?.student?.state}
                    </ListItem>
                    </UnorderedList>
              </Flex>

              <Flex ml={5} bg="white" direction="column" w="550px" borderRadius="lg" py={2} px={5}>
                <Text fontWeight="bold" fontSize={22}>
                    Parent Details
                </Text>
                    <UnorderedList px={2}>
                    <ListItem>
                        <strong>Parent Name: </strong>{data?.getStudentById?.student?.parentName}
                    </ListItem>
                    <ListItem>
                        <strong>Parent Email: </strong>{data?.getStudentById?.student?.parentEmail}
                    </ListItem>
                    <ListItem>
                        <strong>Parent Number: </strong>{data?.getStudentById?.student?.parentNumber}
                    </ListItem>
                    <ListItem>
                        <strong>Home Address: </strong>{data?.getStudentById?.student?.homeAddress}
                    </ListItem>
                    </UnorderedList>
              </Flex>

            </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Center>
    );
  }
  return student;
};
export default Student;
