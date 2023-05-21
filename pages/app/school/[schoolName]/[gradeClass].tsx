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
  IconButton,
  TableContainer,
  Badge,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
} from "@chakra-ui/react";
import Header from "../../../../src/components/Header";
import { IoEllipsisVertical, IoPersonAddOutline } from "react-icons/io5";
import { AiOutlineFileSearch } from "react-icons/ai";
import { useRouter } from "next/router";
import GrayLayout from "../../../../src/components/GrayLayout";
import {
  useGetStudentFromSchoolQuery,
  useMeQuery,
} from "../../../../src/gql/graphql";
import NextLink from "next/link";
import { useGetClassFromUrl } from "../../../../src/utils/useGetClassFromUrl";
import { EditStudent } from "../../../../src/components/EditStudent";

import { fakedb, fakestudents } from "../../../../fakedata";
import {
  RegStudent,
} from "../../../../src/components/Modals/RegStudent";
import { SearchStudent } from "../../../../src/components/Modals/SearchStudent";

const Grade = () => {
  const router = useRouter();
  const [{ data: me }] = useMeQuery();
  const [{ data: student }] = useGetStudentFromSchoolQuery({
    variables: {
      schoolId: me?.me?.admin?.id!,
    },
  });
  const [{ data: stud }] = useGetClassFromUrl();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isRegOpen,
    onOpen: onRegOpen,
    onClose: onRegClose,
  } = useDisclosure();

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

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
            <Text fontSize={24} fontWeight={600} color="black">
              Grade Database
            </Text>
            <Flex direction="row" mt={4}>
              <Flex
                bg="white"
                px={4}
                py={10}
                h="100px"
                w="300px"
                borderRadius="md"
                align="center"
                cursor="pointer"
                role="group"
                _hover={{ borderWidth: "1px", borderColor: "gray.400" }}
              >
                <Flex
                  color="#8E6930"
                  bg="#FFCE83"
                  borderRadius="full"
                  p={3}
                  mr={1}
                  onClick={onRegOpen}
                >
                  <Icon as={IoPersonAddOutline} w={7} h={7} />
                </Flex>
                <Text>Add Student to a database</Text>
              </Flex>

              <Flex
                bg="white"
                ml={10}
                px={4}
                py={10}
                h="100px"
                w="300px"
                borderRadius="md"
                align="center"
                cursor="pointer"
                role="group"
                _hover={{ borderWidth: "1px", borderColor: "gray.400" }}
              >
                <Flex
                  color="#343434"
                  bg="#979797"
                  borderRadius="full"
                  p={3}
                  mr={1}
                  onClick={onOpen}
                >
                  <Icon as={AiOutlineFileSearch} w={7} h={7} />
                </Flex>
                <Text>Search for a student</Text>
              </Flex>
            </Flex>

            <Flex direction="column" mt={5}>
              <TableContainer borderRadius="md" bg="white">
                <Table variant="simple">
                  <Thead bg="#F0F0F0">
                    <Tr>
                      <Th>First Name</Th>
                      <Th>Last Name</Th>
                      <Th>Age</Th>
                      <Th>Grade</Th>
                      <Th>Gender</Th>
                      <Th>Action</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {stud?.getStudentFromClass?.map((p) => (
                      <>
                      <Tr key={p.id}>
                        <Th fontWeight={500}>{p.firstName}</Th>
                        <Th fontWeight={500}>{p.lastName}</Th>
                        <Th fontWeight={500}>{p.ageInput}</Th>
                        <Th fontWeight={500}>{p.gradeClass}</Th>
                        <Th fontWeight={500}>{p.gender}</Th>

                        <Th>
                          <Menu>
                            <MenuButton
                              as={IconButton}
                              aria-label="actions"
                              icon={<IoEllipsisVertical />}
                              variant="outline"
                            />
                            <MenuList>
                              <NextLink
                                href={{
                                  pathname: "/app/student/[id]",
                                  query: { id: p?.id },
                                }}
                                passHref
                              >
                                <MenuItem>View Profile</MenuItem>
                              </NextLink>
                              <MenuItem onClick={onEditOpen}>Update Details</MenuItem>
                              <MenuItem>Archive Student</MenuItem>
                            </MenuList>
                          </Menu>
                        </Th>
                      </Tr>
                      <EditStudent isOpen={isEditOpen} onClose={onEditClose} s={p} />
                      </>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <RegStudent isOpen={isRegOpen} onClose={onRegClose} />
      <SearchStudent isOpen={isOpen} onClose={onClose} />
    </Center>
  );
};

export default Grade;
