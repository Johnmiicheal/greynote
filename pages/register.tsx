import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Center,
  Image,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  InputLeftAddon,
  InputGroup,
  Link,
  Divider,
  useToast,
  InputRightElement,
} from "@chakra-ui/react";
import styles from "../styles/Register.module.css";
import { FcGoogle } from "react-icons/fc";
import { Formik, Form, Field } from "formik";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Layout } from "../src/components/Layout";

import { useRegisterAdminMutation } from "../src/gql/graphql";
import { toErrorMap } from "../src/utils/toErrorMap";

const Register = () => {
  function validateName(value: string) {
    let error;
    if (!value) {
      error = "Name is required";
    }
    return error;
  }

  function validateEmail(value: string) {
    let error;
    if (!value) {
      error = "Email is required";
    }
    return error;
  }

  function validatePass(value: any) {
    let error;
    if (!value) {
      error = "Password is required";
    }
    return error;
  }

  function validatePhone(value: any) {
    let error;
    if (!value) {
      error = "Phone Number is required";
    } else if (value.length < 10) {
      error = "Phone Number is Invalid";
    }
    return error;
  }

  const router = useRouter();
  const [, register] = useRegisterAdminMutation();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  return (
    <Layout>
      <div className={styles.rewavy}>
        <Flex
          direction={{ base: "column", lg: "row" }}
          justify={{ lg: "space-between" }}
          align="center"
          px={{ base: 3, md: 10, lg: 40 }}
        >
          <Flex
            direction="column"
            justify="center"
            bg="white"
            w={{ base: "full", md: "500px", lg: "600px" }}
            pb={5}
            px={{ base: 2, md: 5, lg: 10 }}
            mr={20}
            h="100vh"
          >
            <Image src="/grayfull.png" alt="grayfull" w={40} />
            <Text mt={2} fontSize={16} fontWeight={500}>
              Register to GrayBook
            </Text>
            <Flex>
              <Text
                color="gray.500"
                fontSize={12}
                fontWeight={500}
                mt={5}
                mb={4}
              >
                Already have an account?{" "}
                <NextLink href="/login" passHref>
                  <Link color="#F4B95F">Login Here</Link>
                </NextLink>
              </Text>
            </Flex>
            <Button
              leftIcon={<FcGoogle size={20} />}
              alignItems="center"
              variant="outline"
              colorScheme="gray"
              fontSize={14}
              onClick={() => {
                toast({
                  title: "Google Auth not Available",
                  description: "We are unable to connect to Google Auth Servers at the moment, we are working on it.",
                  status: "info",
                  variant: "left-accent",
                  duration: 5000,
                  isClosable: true,
                })
              }}
            >
              Register with Google
            </Button>

            <Flex direction="column" mt={2}>
              <Formik
                initialValues={{
                  adminName: "",
                  email: "",
                  phoneNumber: "",
                  password: "",
                }}
                onSubmit={async (values, { setErrors }) => {
                  console.log(values);
                  const response = await register({ options: values });
                  if (response.data?.registerAdmin?.errors) {
                    setErrors(toErrorMap(response.data?.registerAdmin?.errors));
                    toast({
                      title: "Register Error.",
                      description: "We could not create an account",
                      status: "error",
                      variant: "left-accent",
                      duration: 5000,
                      isClosable: true,
                    });
                  } else if (response.data?.registerAdmin?.admin) {
                    toast({
                      title: "Account created.",
                      description: "We've created your account for you.",
                      status: "success",
                      variant: "left-accent",
                      duration: 5000,
                      isClosable: true,
                    });
                    router.push("/onboarding");
                  }
                }}
              >
                {(props) => (
                  <Form>
                    <Field name="adminName">
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={
                            form.errors.adminName && form.touched.adminName
                          }
                        >
                          <FormLabel fontSize={14}>Admin Name</FormLabel>
                          <Input
                            {...field}
                            placeholder="Admin Name"
                            type="text"
                            variant="outline"
                            mb={2}
                          />
                          <FormErrorMessage>
                            {form.errors.adminName}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="email">
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={form.errors.email && form.touched.email}
                        >
                          <FormLabel fontSize={14}>Email Address</FormLabel>
                          <Input
                            {...field}
                            placeholder="Email"
                            type="email"
                            variant="outline"
                            mb={2}
                          />
                          <FormErrorMessage>
                            {form.errors.email}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="phoneNumber" validate={validatePhone}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={
                            form.errors.phoneNumber && form.touched.phoneNumber
                          }
                        >
                          <FormLabel fontSize={14}>Phone Number</FormLabel>
                          <InputGroup>
                            <InputLeftAddon>+234</InputLeftAddon>
                            <Input
                              {...field}
                              type="tel"
                              placeholder="phone number"
                              variant="outline"
                              mb={2}
                            />
                          </InputGroup>
                          <FormErrorMessage>
                            {form.errors.phoneNumber}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="password" validate={validatePass}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={
                            form.errors.password && form.touched.password
                          }
                        >
                          <FormLabel fontSize={14}>Password</FormLabel>
                          <InputGroup>
                            <Input
                              {...field}
                              placeholder="Password"
                              type={show ? "text" : "password"}
                              variant="outline"
                            />
                            <InputRightElement width="4.5rem">
                              <Button
                                h="1.75rem"
                                size="sm"
                                onClick={handleClick}
                              >
                                {show ? "Hide" : "Show"}
                              </Button>
                            </InputRightElement>
                          </InputGroup>
                          <FormErrorMessage>
                            {form.errors.password}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Button
                      mt={4}
                      w="full"
                      bg="#F4B95F"
                      color="white"
                      _hover={{ bg: "#DAA65D" }}
                      isLoading={props.isSubmitting}
                      type="submit"
                    >
                      Continue
                    </Button>
                  </Form>
                )}
              </Formik>
            </Flex>
          </Flex>

          <Flex justify="end" display={{ base: "none", lg: "block" }}>
            <Image src="/gray2art.png" alt="gray2art" w="70%" />
          </Flex>
        </Flex>
      </div>
    </Layout>
  );
};

export default Register;