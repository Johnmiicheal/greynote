import React from "react";
import {
  Flex,
  Text,
  Box,
  Image,
  Icon,
  Center,
  Modal,
  Select,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
} from "@chakra-ui/react";
import Header from "../src/components/Header";
import { IoPersonAddOutline } from "react-icons/io5";
import { AiOutlineFileSearch, AiOutlineFileAdd } from "react-icons/ai";
import axios from "axios";
import { useRouter } from "next/router";
import { Formik, Form, Field } from "formik";

import GrayLayout from "../src/components/GrayLayout";
import { fakedb, fakecase, fakegender } from "../fakedata";
import NextLink from 'next/link';
import { RegStudent } from "../src/components/RegStudent";

import { useMeQuery, useGetAdminSchoolQuery } from "../src/gql/graphql";

const Home = () => {
  const router = useRouter();
  const toast = useToast({
    title: 'Please login or register to access this feature',
    status: 'info',
    duration: 6000,
    isClosable: false,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const { isOpen: isRegOpen, onOpen: onRegOpen, onClose: onRegClose } = useDisclosure();

  const [{ data: me }] = useMeQuery();
  const [{ data: admin }] = useGetAdminSchoolQuery();


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
            bg="#E6E6E6"
            h="full"
            mt="5"
            borderRadius="20px 20px 0 0 "
            py={5}
            px={10}
          >

            <Box
                boxSize="fit-content"
                bg="#ffd880"
                w="600px"
                h="200px"
                borderRadius="md"
                py={1}
                px={4}
                display={me?.me?.admin ? "none" : "block"}
              >
              <Text fontSize={24} fontWeight={800} color="#212121">
                Welcome to graybook
              </Text>
                <Text fontSize={16} fontWeight={400} color="black" mt={3}>
                  To enjoy the full features, login or register
                </Text>
                <Text fontSize={16} fontWeight={400} color="black" mt={1}>
                  You can also search for a student, if they have a graybook
                  case
                </Text>
                <Flex mt={10} align='center'>
                  <NextLink href="/login">
                    <Button
                      bg="white"
                      color="#8E6930"
                      _hover={{ borderWidth: "1px", borderColor: "#8E6930" }}
                      borderRadius="md"
                      w="20"
                      size="md"
                    >
                      Login
                    </Button>
                  </NextLink>

                  <NextLink href="/register">
                    <Button
                      ml={3}
                      color="#8E6930"
                      _hover={{ borderWidth: "1px", bg: "#8E6930", color: "white" }}
                      borderRadius="md"
                      borderColor="#8E6930"
                      variant="outline"
                      w="20"
                      size="md"
                    >
                      Register
                    </Button>
                  </NextLink>
                </Flex>
              </Box>

              <Flex direction="column" mt={2} >

              <Text fontSize={24} fontWeight={800} color="#212121" display={me?.me?.admin ? "block" : "none"}>
                Welcome, {me?.me?.admin?.adminName}
              </Text>

              <Text fontSize={18} mt={10} fontWeight={600} color="blackAlpha.700" mb={2}>
                Quick Access
              </Text>
              <Flex>
                <Flex
                  bgImg="/Frame.png"
                  px={4}
                  py={10}
                  h="100px"
                  w="300px"
                  borderRadius="md"
                  align="center"
                  cursor="pointer"
                  role="group"
                  _hover={{ borderWidth: "1px", borderColor: "#FFD088" }}
                  onClick={ me?.me?.admin ? onRegOpen : toast }
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
                  bgImg="/FrameB.png"
                  ml={5}
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
                    borderRadius="5px"
                    p={5}
                    mr={4}
                  >
                    <Icon as={AiOutlineFileSearch} w={7} h={7} />
                  </Flex>
                  <Text>Search Database</Text>
                </Flex>

                <Flex
                  bgImg="/Frame.png"
                  px={4}
                  py={10}
                  ml={5}
                  h="100px"
                  w="300px"
                  borderRadius="md"
                  align="center"
                  cursor="pointer"
                  role="group"
                  _hover={{ borderWidth: "1px", borderColor: "#FFD088" }}
                  onClick={me?.me?.admin ? onOpen : toast}
                >
                  <Flex
                    color="#8E6930"
                    bg="#FFCE83"
                    borderRadius="5px"
                    p={5}
                    mr={4}
                  >
                    <Icon as={AiOutlineFileAdd} w={7} h={7} />
                  </Flex>
                  <Text>Create a GrayCase</Text>
                </Flex>

              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <RegStudent isOpen={isRegOpen} onClose={onRegClose} />

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a case</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Formik
              initialValues={{
                firstname: "",
                lastname: "",
                ageInput: "",
                gender: "",
                gradeClass: "",
                grayCase: "",
              }}
              onSubmit={(values, actions) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  actions.setSubmitting(false);
                }, 1000);
                router.push("/");
                axios
                  .post("http://localhost:3004/api/notes", values)
                  .then((response) => console.log(response.data))
                  .catch((error) => console.log(error));
              }}
            >
              {(props) => (
                <Form>
                  <Field name="firstname">
                    {({ field, form }: any) => (
                      <FormControl isRequired>
                        <FormLabel>First Name</FormLabel>
                        <Input
                          ref={initialRef}
                          {...field}
                          placeholder="First Name"
                          focusBorderColor="#F4B95F"
                        />
                      </FormControl>
                    )}
                  </Field>

                  <Field name="lastname">
                    {({ field, form }: any) => (
                      <FormControl isRequired>
                        <FormLabel>Last Name</FormLabel>
                        <Input
                          {...field}
                          placeholder="Last Name"
                          focusBorderColor="#F4B95F"
                        />
                      </FormControl>
                    )}
                  </Field>

                  <Flex direction="row">
                    <Field name="ageInput">
                      {({ field, form }: any) => (
                        <FormControl mt={4} isRequired>
                          <FormLabel>Age</FormLabel>
                          <NumberInput w={40}>
                            <NumberInputField {...field} placeholder="15" />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="gender">
                      {({ field, form }: any) => (
                        <FormControl mt={4} isRequired>
                          <FormLabel>Gender</FormLabel>
                          <Select
                            {...field}
                            placeholder="Select Gender"
                            w={40}
                            focusBorderColor="#F4B95F"
                          >
                            {fakegender.map((p, i) => (
                              <option key={i}>{p}</option>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    </Field>
                  </Flex>

                  <Flex direction="row">
                    <Field name="gradeClass">
                      {({ field, form }: any) => (
                        <FormControl mt={4} isRequired>
                          <FormLabel>Grade Class</FormLabel>
                          <Select
                            {...field}
                            placeholder="Select Grade"
                            w={40}
                            focusBorderColor="#F4B95F"
                          >
                            {fakedb.map((p) => (
                              <option key={p.grade}>Grade {p.grade} </option>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="grayCase">
                      {({ field, form }: any) => (
                        <FormControl mt={4} isRequired>
                          <FormLabel>Graybook Case</FormLabel>
                          <Select
                            {...field}
                            placeholder="Select Case"
                            w={40}
                            focusBorderColor="#F4B95F"
                          >
                            {fakecase.map((p, i) => (
                              <option key={i}>{p}</option>
                            ))}
                          </Select>
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
                    >
                      Create
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                  </Flex>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Center>
  );
};

export default Home;
