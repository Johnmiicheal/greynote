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
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { fakegender, fakeclass } from "../../../fakedata";
import { useRouter } from "next/router";
import { useMeQuery, useSearchStudentMutation } from "../../gql/graphql";
import NextLink from "next/link";
import { IoFilter, IoSearch } from "react-icons/io5";

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
  const [filter, setFilter] = useState(false);

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
              onSubmit={async (values, actions) => {
                const response = await searchStudent({
                  firstName: values.firstName,
                  lastName: values.lastName,
                  gradeClass: values.gradeClass,
                  gender: values.gender,
                  ageInput: values.ageInput,
                });
                actions.resetForm({
                  values: {
                    ...values,
                    firstName: "",
                    lastName: "",
                    gradeClass: "",
                    gender: "",
                    ageInput: 0,
                  },
                });
                const data = response.data?.searchStudent || [];
                setSearchResults(data);
                actions.setSubmitting(false);
                if (data.length <= 0) {
                  toast({
                    title: "No Student Found",
                    description: `There's no student registered with the name "${values.firstName}"`,
                    status: "error",
                    position: "top-right",
                    variant: "left-accent",
                    duration: 5000,
                    isClosable: true,
                  });
                }
              }}
            >
              {(props) => (
                <Form>
                  <Flex w="full">
                    <Field name="firstName">
                      {({ field, form }: any) => (
                        <FormControl px={2} isRequired>
                          <FormLabel>First Name</FormLabel>
                          <Input
                            {...field}
                            placeholder="Enter First Name"
                            focusBorderColor="#F4B95F"
                            w={{ base: "full", lg: "18rem" }}
                          />
                        </FormControl>
                      )}
                    </Field>
                    <Field name="lastName">
                      {({ field, form }: any) => (
                        <FormControl px={2}>
                          <FormLabel>Last Name</FormLabel>
                          <Input
                            {...field}
                            placeholder="Enter Last Name"
                            focusBorderColor="#F4B95F"
                            w={{ base: "full", lg: "18rem" }}
                          />
                        </FormControl>
                      )}
                    </Field>
                  </Flex>
                  <Flex direction="column" px={2}>
                    {filter && (
                      <>
                        <Text mt={4} fontWeight={500}>
                          Filter search
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
                      </>
                    )}
                  </Flex>

                  <Flex direction="row" justify="end" mt={10} gap={3}>
                    <Tooltip label="Filter Search">
                      <IconButton
                        icon={<IoFilter />}
                        bg="white"
                        color="#F4B95F"
                        border="1px solid #F4B95F"
                        _hover={{ bg: "#F4B95F", color: "#FFFFFF" }}
                        size="md"
                        w="5"
                        aria-label="filter search"
                        onClick={() => setFilter(!filter)}
                      />
                    </Tooltip>
                    <Button
                      bg="#F4B95F"
                      color="white"
                      _hover={{ bg: "#DAA65D" }}
                      type="submit"
                      leftIcon={<IoSearch />}
                      isLoading={props.isSubmitting}
                      isDisabled={
                        !props.isValid || !props.dirty
                          ? true
                          : false
                      }
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
            {searchResults.length > 0 ? (
              <>
                <Text mb={2} fontWeight={600}>
                  Search Result
                </Text>
                <Flex
                  direction="column"
                  gap={2}
                  overflowY="auto"
                  h="20vh"
                  css={{
                    "&:: -webkit-scrollbar": {
                      display: "none",
                    },
                    "&:: -ms-overflow-style": "none",
                    "&:: scrollbar-width": "none",
                  }}
                >
                  {searchResults.map((result) => (
                    <NextLink
                      href={{
                        pathname: "/app/student/[id]",
                        query: { id: result.id },
                      }}
                      key={result.id}
                      passHref
                    >
                      <Flex
                        key={result.id}
                        align="center"
                        cursor="pointer"
                        gap={2}
                        px={2}
                        py={2}
                        borderRadius="7px"
                        _hover={{ bgColor: "gray.200" }}
                      >
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
              </>
            ) : (
              <></>
            )}
          </Flex>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};
