import {
  Heading,
  Flex,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Link,
  useToast,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import NextLink from "next/link";
import Head from "next/head";
import { Layout } from "../src/components/Layout";
import { useRouter } from "next/router";
import Header from "../src/components/Registration/Header";
import { useLoginAdminMutation } from "../src/gql/graphql";
import { toErrorMap } from "../src/utils/toErrorMap";

const Login = () => {
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

  const router = useRouter();
  const toast = useToast();

  const [, login] = useLoginAdminMutation();

  return (
    <Layout>
      <Head>
        <title>Greynote - Login to your account</title>
      </Head>
      <Header />
      <Flex direction="row" minW="full" justify="center">
        <Flex direction="row" justify="space-between">
          <Flex
            direction="column"
            justify={{ lg: "center"}}
            pos="fixed"
            right={0}
            bg="white"
            w={{base: "full", lg: "600px"}}
            h="full"
            py={20}
            px={{base: 2, lg: 24}}
            borderRadius="md"
          >
            <Heading mt={2} fontSize={{base:"1.4rem" ,lg: "2rem"}} fontWeight={500}>
              Login to Greynote
            </Heading>

            <Flex direction="column" mt={10}>
              <Formik
                initialValues={{
                  adminNameOrEmail: "",
                  password: "",
                }}
                onSubmit={async (values, { setErrors }) => {
                  const response = await login({ adminNameOrEmail: values.adminNameOrEmail, password: values.password });
                  if (response.data?.loginAdmin?.errors) {
                    setErrors(toErrorMap(response.data?.loginAdmin?.errors));
                    toast({
                      title: "Login Error.",
                      description: "Invalid Username or Password",
                      status: "error",
                      variant: "left-accent",
                      duration: 5000,
                      isClosable: true,
                    });
                  } else if (response.data?.loginAdmin?.admin) {
                    toast({
                      title: "Login Successful" ,
                      description: `Welcome Back, ${response.data?.loginAdmin?.admin?.adminName}`,
                      status: "success",
                      variant: "left-accent",
                      duration: 5000,
                      isClosable: true,
                    });
                    setTimeout(() => {
                      router.push("/app");
                    }, 500);
                  }
                }}
              >
                {(props) => (
                  <Form>
                    <Field name="adminNameOrEmail" validate={validateEmail}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={form.errors.name && form.touched.name}
                        >
                          <FormLabel>Email</FormLabel>
                          <Input
                            {...field}
                            placeholder="example@gmail.com"
                            type="email"
                            variant="outline"
                            focusBorderColor="#FFBF5C"
                          />
                          <FormErrorMessage mb={5}>
                            {form.errors.name}
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
                          <FormLabel>Password</FormLabel>
                          <Input
                            {...field}
                            placeholder="********"
                            type="password"
                            variant="outline"
                            focusBorderColor="#FFBF5C"
                          />
                          <FormErrorMessage>
                            {form.errors.password}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Flex align="center">
                      <Text
                        color="gray.500"
                        fontSize={12}
                        fontWeight={500}
                        mt={2}
                        mb={14}
                      >
                        Forgot your password?{" "}
                        <NextLink href="/forgot-password" passHref>
                          <Link color="#F4B95F">Reset it</Link>
                        </NextLink>
                      </Text>
                    </Flex>

                    <Button
                      mt={4}
                      w="full"
                      bg="#F4B95F"
                      color="white"
                      _hover={{ bg: "#DAA65D" }}
                      isLoading={props.isSubmitting}
                      type="submit"
                    >
                      Login
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

export default Login;
