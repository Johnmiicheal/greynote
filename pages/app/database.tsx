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
  Badge,
  useDisclosure
} from "@chakra-ui/react";
import Header from "../../src/components/Header";
import { IoPersonAddOutline } from "react-icons/io5";
import { AiOutlineFileSearch } from "react-icons/ai";
import { useRouter } from "next/router";
import GrayLayout from "../../src/components/GrayLayout";
import { RegStudent } from "../../src/components/Modals/RegStudent";
import NextLink from "next/link";
import { useGetStudentFromClassQuery, useMeQuery, useGetClassCountQuery } from "../../src/gql/graphql";

import { fakeclass } from "../../fakedata";

const Database = () => {
  const [{ data: me }] = useMeQuery();
  const router = useRouter();
  const {
    isOpen: isRegOpen,
    onOpen: onRegOpen,
    onClose: onRegClose,
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
              <Text fontSize={24} fontWeight={800} color="#212121">
                My Student Database
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
                onClick={onRegOpen}
              >
                <Flex
                  color="#8E6930"
                  bg="#FFCE83"
                  borderRadius="full"
                  p={3}
                  mr={1}
                >
                  <Icon as={IoPersonAddOutline} w={7} h={7} />
                </Flex>
                <Text>Register a Student</Text>
              </Flex>
              <RegStudent isOpen={isRegOpen} onClose={onRegClose} />

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
                >
                  <Icon as={AiOutlineFileSearch} w={7} h={7} />
                </Flex>
                <Text>Search from my Database</Text>
              </Flex>
            </Flex>

            <Flex direction="column" mt={5}>
              <TableContainer borderRadius="md" bg="white">
                <Table variant="simple">
                  <TableCaption>Graybook Database</TableCaption>
                  <Thead bg="#F0F0F0">
                    <Tr>
                      <Th>Grade Classes</Th>
                      <Th>Number of Students</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {fakeclass.map((p, i) => (
                        <NextLink
                        href={{
                          pathname: "/app/school/[schoolName]/[gradeClass]",
                          query: { schoolName: me?.me?.admin?.school, gradeClass: p },
                        }}
                        passHref
                        key={i}
                      >
                      <Tr key={i}>
                        <Th fontWeight={500} _hover={{ color: "#8E6930", fontWeight: 'bold' }} cursor='pointer'> {p} </Th>
                        <Th fontWeight={500}>{ NumCount(p)?.getClassCount }</Th>
                      </Tr>
                      </NextLink>
                    ))}
                  </Tbody>
                  <Tfoot>
                    <Tr>
                      <Th>Grade Classes</Th>
                      <Th>Number of Students</Th>
                    </Tr>
                  </Tfoot>
                </Table>
              </TableContainer>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Center>
  );
};

export default Database;

const NumCount = (classNum: string) => {
  const [{data}] = useGetClassCountQuery({
    variables: {
      gradeClass: classNum
    }
  })
  return data;
}