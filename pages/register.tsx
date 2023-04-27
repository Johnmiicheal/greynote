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
import Header from "../src/components/Registration/Header";

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
      <Header />
      <Flex direction="row" minW="full" justify="center" >
          <Flex direction="row" justify="space-between">
          <Flex
            direction="column"
            align='center'
            bg="white"
            w={{ base: "full", md: "500px" }}
            pb={5}
            py={20}
            px={{ base: 2, md: 5, lg: 10 }}
            h="100vh"
          >
            <Text fontSize={'1.8rem'} fontWeight={500}>
              Register to GrayBook
            </Text>
            <Text fontSize='0.8rem' w='240px' textAlign='center'>
              Please fill in the details correctly to ensure that your account is verified
            </Text>
            <Flex direction="column" mt={10}>
              <Formik
                initialValues={{
                  adminName: "",
                  email: "",
                  phoneNumber: "",
                  password: "",
                }}
                onSubmit={async (values, { setErrors }) => {
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
                    router.push("/email-verification");
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
                            placeholder="Mayowa Chinedu"
                            type="text"
                            variant="outline"
                            focusBorderColor="#FFBF5C"
                            autoComplete="adminName"
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
                            placeholder="example@gmail.com"
                            type="email"
                            variant="outline"
                            focusBorderColor="#FFBF5C"
                            autoComplete="new-email"
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
                              placeholder="0800-123-4567"
                              variant="outline"
                              focusBorderColor="#FFBF5C"
                              autoComplete="phoneNumber"
                            />
                          </InputGroup>
                          <FormErrorMessage mb={2}>
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
                              placeholder="********"
                              focusBorderColor="#FFBF5C"
                              type={show ? "text" : "password"}
                              variant="outline"
                              autoComplete="new-password"
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
          </Flex>

        </Flex>
    </Layout>
  );
};

export default Register;