import React from "react";
import {
  Flex,
  Text,
  Image,
  Icon,
  Center,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useDisclosure,
} from "@chakra-ui/react";
import Head from "next/head";
import { AiOutlineFileSearch, AiOutlineFileAdd } from "react-icons/ai";
import { useRouter } from "next/router";
import { SearchStudent } from "../Modals/SearchStudent";
import Header from "./Navigation/Header";
import {
  useSchoolCasesQuery,
  useAdminCaseCountQuery,
} from "../../gql/graphql";
import NextLink from "next/link";
import { format } from "date-fns";
import { CreateNote } from "../Modals/CreateNote";
import { CaseModal } from "../GrayCases/CaseModal";
import { Nav } from "./Navigation/BottomNav";

const GrayCase = () => {
  const router = useRouter();
  const {
    isOpen: isGrayOpen,
    onOpen: onGrayOpen,
    onClose: onGrayClose,
  } = useDisclosure();
  const {
    isOpen: isSearchOpen,
    onOpen: onSearchOpen,
    onClose: onSearchClose,
  } = useDisclosure();
  const {
    isOpen: isCaseOpen,
    onOpen: onCaseOpen,
    onClose: onCaseClose,
  } = useDisclosure();

  const [{ data: cases, fetching: isLoading }] = useSchoolCasesQuery({
    variables: {
      limit: 15,
      cursor: 0,
      sortBy: "recent",
    },
  });
  const [{ data: caseCount }] = useAdminCaseCountQuery();

  const grayStyle = {
    bg: "white",
    px: 4,
    py: 10,
    h: "100px",
    w: "300px",
    borderRadius: "md",
    align: "center",
    role: "group",
  };
  return (
    <Center>
      <Head>
        <title>Greynote - Student Case Records</title>
        <link rel="shortcut icon" href="/icons/greyicon.png" />
      </Head>
      <Flex justify="space-between" w="full" minH="100vh">

        <Flex
          direction="column"
          w="full"
          bg="#FFF0D9"
        >
          <Header />
          <Nav />
          <Text fontSize={24} mt="7vh" fontWeight={500} color="#212121" textAlign="center">
              Student Case Records
            </Text>
          <Flex
            direction="column"
            bg="gray.300"
            h="100dvh"
            mt="4"
            borderRadius="20px 20px 0 0 "
            py={5}
            px={2}
          >
            
            <Flex gap="4" mt={4} direction="column" align="center" w="full">
              <Flex {...grayStyle} bgImg="/Framee.png" bgSize="cover" gap="2" w="full">
                <Image
                  src="/app/greycircle.png"
                  alt="graybook_logo"
                  w="50px"
                  borderRadius="full"
                />
                <Text>
                  {caseCount?.adminCaseCount}{" "}
                  {caseCount?.adminCaseCount! <= 1 ? "Graycase" : "Graycases"}{" "}
                  recorded
                </Text>
              </Flex>

              <Flex gap={2}>
                <Flex
                  {...grayStyle}
                  _hover={{ borderWidth: "1px", borderColor: "gray.400" }}
                  cursor="pointer"
                  onClick={onSearchOpen}
                  gap={2}
                  w="full"
                >
                  <Flex
                    color="#343434"
                    bg="#979797"
                    borderRadius="full"
                    p={3}
                  >
                    <Icon as={AiOutlineFileSearch} w={7} h={7} />
                  </Flex>
                  <Text>Search for a student</Text>
                </Flex>

                <Flex
                  {...grayStyle}
                  _hover={{ borderWidth: "1px", borderColor: "gray.400" }}
                  cursor="pointer"
                  onClick={onGrayOpen}
                  gap={2}
                  w="full"
                >
                  <Flex
                    color="#8E6930"
                    bg="#FFCE83"
                    borderRadius="full"
                    p={3}
                  >
                    <Icon as={AiOutlineFileAdd} w={7} h={7} />
                  </Flex>
                  <Text>Create a Report</Text>
                </Flex>

              </Flex>

            </Flex>
            {caseCount?.adminCaseCount === 0 ? (
              <Flex
                direction="column"
                align="center"
                bg="white"
                mt="10"
                borderRadius="md"
                py={10}
                px={4}
              >
                <Image src="/empty.png" alt="empty_database" w="20%" />
                <Text mt="5">It seems you haven't added any cases yet</Text>
              </Flex>
            ) : isLoading ? (
              <Text>Loading...</Text>
            ) : (
              <Flex direction="column" mt={5} bg="white" borderRadius="md">
                <TableContainer>
                  <Table variant="simple" size="sm">
                    <TableCaption>Graycase Database</TableCaption>
                    <Thead>
                      <Tr>
                        <Th>First Name</Th>
                        <Th>Last Name</Th>
                        <Th isNumeric>Age</Th>
                        <Th>Categorty</Th>
                        <Th>Grade</Th>
                        <Th>Gender</Th>
                        <Th>Status</Th>
                        <Th>Date Created</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {cases?.schoolCases?.grayCase?.map((p) => (
                        <>
                          <Tr
                            key={p.id}
                            _hover={{ bg: "gray.200" }}
                            cursor="pointer"
                            onClick={onCaseOpen}
                          >
                            <Td>{p.firstName}</Td>
                            <Td>{p.lastName}</Td>
                            <Td isNumeric>{p.ageInput}</Td>
                            <Td>{p.category}</Td>
                            <Td>{p.gradeClass}</Td>
                            <Td>{p.gender}</Td>
                            <Td>
                              {p.isActive === true ? "Active" : "Inactive"}
                            </Td>
                            <Td>
                              {format(new Date(p.createdAt), "MM/dd/yyyy")}
                            </Td>
                          </Tr>
                          <CaseModal
                            isOpen={isCaseOpen}
                            onClose={onCaseClose}
                            id={p.id}
                          />
                        </>
                      ))}
                    </Tbody>
                    <Tfoot>
                      <Tr>
                        <Th>First Name</Th>
                        <Th>Last Name</Th>
                        <Th isNumeric>Age</Th>
                        <Th>Categorty</Th>
                        <Th>Grade</Th>
                        <Th>Gender</Th>
                        <Th>Status</Th>
                        <Th>Date Created</Th>
                      </Tr>
                    </Tfoot>
                  </Table>
                </TableContainer>
              </Flex>
            )}

            <SearchStudent isOpen={isSearchOpen} onClose={onSearchClose} />
            <CreateNote isOpen={isGrayOpen} onClose={onGrayClose} />

            {/* 
            <Flex direction="column" mt={5} bg="white" borderRadius="md">
              <RadarChart />
            </Flex> */}
          </Flex>
        </Flex>
      </Flex>
    </Center>
  );
};

export default GrayCase;
