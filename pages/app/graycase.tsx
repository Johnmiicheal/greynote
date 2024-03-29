import React from "react";
import {
  Box,
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
  useMediaQuery,
} from "@chakra-ui/react";
import Head from "next/head";
import Header from "../../src/components/Header";
import { AiOutlineFileSearch, AiOutlineFileAdd } from "react-icons/ai";
import { useRouter } from "next/router";
import GrayLayout from "../../src/components/GrayLayout";
import { SearchStudent } from "../../src/components/Modals/SearchStudent";
import {
  useSchoolCasesQuery,
  useAdminCaseCountQuery,
  useMeQuery,
} from "../../src/gql/graphql";
import NextLink from "next/link";
import { format } from "date-fns";
import { CreateNote } from "../../src/components/Modals/CreateNote";
import { CaseModal } from "../../src/components/GrayCases/CaseModal";
import BarLoader from "react-spinners/BarLoader";
import GrayCase from "../../src/components/Mobile/GrayCase";

const Graycase = () => {
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
  const [{ data: me, fetching }] = useMeQuery();
  const [{ data: caseCount }] = useAdminCaseCountQuery();
  const [mobile] = useMediaQuery('(max-width: 768px)')

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
  let appPage = null;
  if (fetching) {
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
  } else if (!mobile) {
    appPage = (
      <Center>
      <Head>
        <title>Greynote - Student Case Records</title>
        <link rel="shortcut icon" href="/icons/greyicon.png" />
      </Head>
      <Flex justify="space-between" w="full" minH="100vh">
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
            bg="#CBCBCB"
            h="full"
            mt="5"
            borderRadius="20px 20px 0 0 "
            py={5}
            px={10}
          >
            <Text fontSize={24} fontWeight={800} color="#212121">
              Student Case Records
            </Text>
            <Flex gap="4" mt={4}>
              <Flex {...grayStyle} bgImg="/Framee.png" gap="4">
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

              <Flex
                {...grayStyle}
                _hover={{ borderWidth: "1px", borderColor: "gray.400" }}
                cursor="pointer"
                onClick={onSearchOpen}
              >
                <Flex
                  color="#343434"
                  bg="#979797"
                  borderRadius="full"
                  p={3}
                  mr={1}
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
              >
                <Flex
                  color="#8E6930"
                  bg="#FFCE83"
                  borderRadius="full"
                  p={3}
                  mr={1}
                >
                  <Icon as={AiOutlineFileAdd} w={7} h={7} />
                </Flex>
                <Text>Create a Report</Text>
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
                  <Table variant="simple">
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
          </Flex>
        </Flex>
      </Flex>
    </Center>
    ); }
     else if (me?.me?.admin?.id && mobile){
      appPage = (
        <GrayCase />
      )
    }
  return appPage;
};

export default Graycase;
