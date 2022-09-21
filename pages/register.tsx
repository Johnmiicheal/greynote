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
    Highlight,
    Link,
    Divider,
  } from "@chakra-ui/react";
  import styles from "../styles/Register.module.css";
  import { FcGoogle } from "react-icons/fc";
  import { Formik, Form, Field } from "formik";
  
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
  
    return (
      <Center bg="gray.200" minH="100vh">
        <div className={styles.rewavy}>
          
          <Flex direction={{ base: 'column', lg: 'row'}} justify={{ lg: 'space-between' }} w="full" align="center" px={{ base: 3, md: 10, lg: 40}} zIndex={2}>
            <Flex
              direction="column"
              justify="center"
              bg="white"
              w={{ base: 'full', md: '500px', lg: '600px'}}
              py={5}
              px={{ base: 2, md: 5, lg: 10}}
              borderRadius="md"
              mt={10}
              mr={20}
            >
              <Image src="/grayfull.png" w={40} />
              <Text mt={2} fontSize={20} fontWeight={500}>
                Login to GrayBook
              </Text>
                <Button
                mt={10}
                  leftIcon={<FcGoogle size={20} />}
                  alignItems="center"
                  variant="outline"
                  colorScheme="gray"
                >
                  Login with Google
                </Button>
  
              
              <Flex direction="column" mt={10}>
  
                <Formik
                  initialValues={{ name: "" }}
                  onSubmit={(values, actions) => {
                    setTimeout(() => {
                      alert(JSON.stringify(values, null, 2));
                      actions.setSubmitting(false);
                    }, 1000);
                  }}
                >
                  {(props) => (
                    <Form>
                      <Field name="name" validate={validateEmail}>
                        {({ field, form }: any) => (
                          <FormControl
                            isInvalid={form.errors.name && form.touched.name}
                          >
                            <FormLabel>Email</FormLabel>
                            <Input
                              {...field}
                              placeholder="Email"
                              type="email"
                              variant="outline"
                              mb={2}
                            />
                            <FormErrorMessage>
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
                              placeholder="Password"
                              type="password"
                              variant="outline"
                            />
                            <FormErrorMessage>
                              {form.errors.password}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Flex justify='center'>
                        <Text
                          color="#F4B95F"
                          fontSize={12}
                          fontWeight={500}
                          mt={2}
                          mb={14}
                        >
                          Forgot Password?
                        </Text>
                        <Text
                          color="gray.500"
                          fontSize={12}
                          fontWeight={500}
                          mt={2}
                          mb={14}
                          ml={6}
                        >
                          Don't have an account? <Link color='#F4B95F'> Register Here </Link>
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
  
            <Flex justify='end' display={{ base: 'none', lg: 'block' }}>
              <Image src="/gray2art.png" w='70%' />
            </Flex>
          </Flex>
        </div>
      </Center>
    );
  };
  
  export default Login;
  