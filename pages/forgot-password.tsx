import {
    ChakraProvider,
    Box,
    Center,
    Heading,
    Button,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Flex,
    Text,
    Image,
    Input,
    FormLabel
  } from "@chakra-ui/react";
  import { Formik, Form } from "formik";
  import { useRouter } from "next/router";
  import React, { useState } from "react";
  import { Layout } from "../src/components/Layout";
  import Header from "../src/components/Registration/Header";
  import { toErrorMap } from "../src/utils/toErrorMap";
  import NextLink from "next/link";
  import { useForgotPasswordMutation } from "../src/gql/graphql";
import theme from "../themes";
  
  const ForgotPassword: React.FC<{}> = () => {
    const router = useRouter();
    const [, forgotPassword] = useForgotPasswordMutation();
    const [complete, setComplete] = useState(false);
  
    return (
      <Layout>
        <Header />
  
        <Box
          w={["full", "lg"]}
          minH="70vh"
          p={10}
          mt={24}
          mx="auto"
          border={["none"]}
          borderRadius={10}
          alignSelf="center"
          bg="white"
        >
          <Flex
            direction='column'  
            justify="space-between"
            w="full"
            mb={5}
            alignItems='center'
          >
           
            <Heading as="h5" fontSize="1.5rem" mb={2}>
              Oops, you forgot your password
            </Heading>
  
            <Text align='center'>
              {" "}
              Don't be embarrased, it happens. Let's get you back into your account. 
              Enter the email address you signed up with, 
              and we'll send you an email to reset your password.
            </Text>
          </Flex>
  
          <Box alignSelf="center">
            <Formik
              initialValues={{
                email: "",
              }}
              onSubmit={async (values) => {
                await forgotPassword(values);
                setComplete(true);
              }}
            >
              {({ isSubmitting }) =>
                complete ? (
                  <Alert
                    status="success"
                    variant="subtle"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                    height="200px"
                  >
                    <AlertIcon boxSize="40px" mr={0} />
                    <AlertTitle mt={4} mb={1} fontSize="lg">
                      Form submitted!
                    </AlertTitle>
                    <AlertDescription maxWidth="sm">
                      If an account with the email exists, we sent you an email😉
                    </AlertDescription>
                  </Alert>
                ) : (
                  <Form>
                    <FormLabel>Email Address</FormLabel>
                    <Input
                      name="email"
                      placeholder="email@address.com"
                      type="email"
                      focusBorderColor="#FFBF5C"
                    />
  
                    <Flex alignSelf="center">
                      <Button
                        mt={5}
                        color="black"
                        backgroundColor="#FFBF5C"
                        variant="solid"
                        width='full'
                        _hover={{ bg: "#DAA65D" }}
                        type="submit"
                        isLoading={isSubmitting}
                      >
                        Change Password
                      </Button>
                    </Flex>
                  </Form>
                )
              }
            </Formik>
          </Box>
        </Box>
      </Layout>
    );
  };
  
  export default ForgotPassword;