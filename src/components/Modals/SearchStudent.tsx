import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Button,
  Flex,
  Text,
  useToast,
  Input,
  Select,
  Avatar,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { fakegender, fakeclass } from "../../../fakedata";
import { useRouter } from "next/router";
import { useMeQuery, useSearchStudentMutation } from "../../gql/graphql";
import NextLink from "next/link";
import { IoSearch } from "react-icons/io5";

interface SearchStudentProps {
  isOpen: any;
  onClose: any;
}

type Student = {
  id: number;
  createdAt: string;
  firstName: string;
  lastName: string;
  gradeClass: string;
  gender: string;
  ageInput: number;
  startDate: string;
  endDate: string;
  grayId: string;
  profileImgUrl: string;
  // Other fields...
};

export const SearchStudent: React.FC<SearchStudentProps> = ({
  isOpen,
  onClose,
}) => {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const router = useRouter();
  const toast = useToast();
  const [{ data }] = useMeQuery();
  const [, searchStudent] = useSearchStudentMutation();
  const [searchResults, setSearchResults] = useState<Student[]>([]);

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
      size={{ base: "sm", md: "md", lg: "lg" }}
    >
      <ModalOverlay />
      <ModalContent
        pos="fixed"
        minW={{ lg: "40rem" }}
        maxH="40rem"
        overflow="auto"
        mt={3}
      >
        <ModalHeader>Search Database</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Flex>
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                gradeClass: "",
                gender: "",
                ageInput: 0,
              }}
              onSubmit={async (values, { setErrors }) => {
                const response = await searchStudent({
                  firstName: values.firstName,
                  lastName: values.lastName,
                  gradeClass: values.gradeClass,
                  gender: values.gender,
                  ageInput: values.ageInput,
                });
                const data = response.data?.searchStudent || [];
                setSearchResults(data);
              }}
            >
              {(props) => (
                <Form>
                  <Flex>
                    <Field name="firstName">
                      {({ field, form }: any) => (
                        <FormControl px={4} isRequired>
                          <FormLabel>First Name</FormLabel>
                          <Input
                            {...field}
                            placeholder="Enter First Name"
                            focusBorderColor="#F4B95F"
                          />
                        </FormControl>
                      )}
                    </Field>
                    <Field name="lastName">
                      {({ field, form }: any) => (
                        <FormControl px={4}>
                          <FormLabel>Last Name</FormLabel>
                          <Input
                            {...field}
                            placeholder="Enter Last Name"
                            focusBorderColor="#F4B95F"
                          />
                        </FormControl>
                      )}
                    </Field>
                  </Flex>
                  <Text px={4} mt={4}>
                    Filter search by:{" "}
                  </Text>
                  <Flex align="center">
                    <Field name="gradeClass">
                      {({ field, form }: any) => (
                        <FormControl mt={1} px={4}>
                          <FormLabel>Class</FormLabel>
                          <Select
                            {...field}
                            placeholder="Select Class"
                            w="full"
                            focusBorderColor="#F4B95F"
                          >
                            {fakeclass.map((p, i) => (
                              <option key={i}>{p}</option>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="gender">
                      {({ field, form }: any) => (
                        <FormControl mt={1} px={4}>
                          <FormLabel>Gender</FormLabel>
                          <Select
                            {...field}
                            placeholder="Select Gender"
                            w="full"
                            focusBorderColor="#F4B95F"
                          >
                            {fakegender.map((p, i) => (
                              <option key={i}>{p}</option>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="ageInput">
                      {({ field, form }: any) => (
                        <FormControl mt={1} px={4}>
                          <FormLabel>Age</FormLabel>
                          <Input
                            {...field}
                            type="number"
                            placeholder="Age"
                            focusBorderColor="#F4B95F"
                          />
                        </FormControl>
                      )}
                    </Field>
                  </Flex>

                  <Flex direction="row" justify="end" mt={10}>
                    <Button
                      bg="#F4B95F"
                      color="white"
                      _hover={{ bg: "#DAA65D" }}
                      mr={3}
                      type="submit"
                      leftIcon={<IoSearch />}
                      isLoading={props.isSubmitting}
                    >
                      Search
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                  </Flex>
                </Form>
              )}
            </Formik>
          </Flex>
          <Flex
            display={searchResults ? "block" : "none"}
            direction="column"
            mt={5}
            px={4}
          >
            <Text mb={2} fontWeight={600}>
              Search Result
            </Text>
            {searchResults.length > 0 ? (
              <Flex direction="column" gap={2} overflowY="auto" h="20vh">
                {searchResults.map((result) => (
                  <NextLink
                    href={{
                      pathname: "/app/student/[id]",
                      query: { id: result.id },
                    }}
                    key={result.id}
                    passHref
                  >
                    <Flex key={result.id} align="center" cursor="pointer" gap={2} px={2} py={2} borderRadius="7px" _hover={{ bgColor: "gray.200"}}>
                      <Avatar
                        src={result.profileImgUrl}
                        name={result.firstName}
                        size="md"
                      />
                      <Flex direction="column">
                        <Text>
                          {result.firstName} {result.lastName}
                        </Text>
                        <Text>{result.grayId}</Text>
                      </Flex>
                    </Flex>
                    <Flex key={result.id} align="center" cursor="pointer" gap={2} px={2} py={2} borderRadius="7px" _hover={{ bgColor: "gray.200"}}>
                      <Avatar
                        src={result.profileImgUrl}
                        name={result.firstName}
                        size="md"
                      />
                      <Flex direction="column">
                        <Text>
                          {result.firstName} {result.lastName}
                        </Text>
                        <Text>{result.grayId}</Text>
                      </Flex>
                    </Flex>
                    <Flex key={result.id} align="center" cursor="pointer" gap={2} px={2} py={2} borderRadius="7px" _hover={{ bgColor: "gray.200"}}>
                      <Avatar
                        src={result.profileImgUrl}
                        name={result.firstName}
                        size="md"
                      />
                      <Flex direction="column">
                        <Text>
                          {result.firstName} {result.lastName}
                        </Text>
                        <Text>{result.grayId}</Text>
                      </Flex>
                    </Flex>
                  </NextLink>
                ))}
              </Flex>
            ) : (
              <p>No students found.</p>
            )}
          </Flex>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};
