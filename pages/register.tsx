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
  } from "@chakra-ui/react";
  import styles from "../styles/Register.module.css";
  import { FcGoogle } from "react-icons/fc";
  import { Formik, Form, Field } from "formik";
  import NextLink from "next/link";
  import { useRouter } from "next/router";
import { Layout } from "../src/components/Layout";
  
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
      } else if( value.length < 10 ){
        error = "Phone Number is Invalid"
      } 
      return error;
    }
    
    const router = useRouter();

    return (
      <Layout>
        <div className={styles.rewavy}>          
          <Flex direction={{ base: 'column', lg: 'row'}} justify={{ lg: 'space-between' }} align="center" px={{ base: 3, md: 10, lg: 40}}>
            <Flex
              direction="column"
              justify="center"
              bg="white"
              w={{ base: 'full', md: '500px', lg: '600px'}}
              pb={5}
              px={{ base: 2, md: 5, lg: 10}}
              mr={20}
              h="100vh"
            >
              <Image src="/grayfull.png" w={40} />
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
                        Already have an account? {" "}
                         <NextLink href='/login' passHref>
                          <Link color="#F4B95F">
                           Login Here 
                           </Link>
                         </NextLink>
                         </Text>
                      </Flex>
                <Button
                  leftIcon={<FcGoogle size={20} />}
                  alignItems="center"
                  variant="outline"
                  colorScheme="gray"
                  fontSize={14}
                >
                  Register with Google
                </Button>
  
              
              <Flex direction="column" mt={2}>
  
                <Formik
                  initialValues={{ name: "" }}
                  onSubmit={(values, actions) => {
                    setTimeout(() => {
                      alert(JSON.stringify(values, null, 2));
                      actions.setSubmitting(false);
                    }, 1000);
                    router.push('/onboarding')
                  }}
                >
                  {(props) => (
                    <Form>
                      <Field name="name" validate={validateName}>
                        {({ field, form }: any) => (
                          <FormControl
                            isInvalid={form.errors.name && form.touched.name}
                          >
                            <FormLabel fontSize={14}>Full Name</FormLabel>
                            <Input
                              {...field}
                              placeholder="Full Name"
                              type="text"
                              variant="outline"
                              mb={2}
                            />
                            <FormErrorMessage>
                              {form.errors.name}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      <Field name="email" validate={validateEmail}>
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

                      <Field name="telephone" validate={validatePhone}>
                        {({ field, form }: any) => (
                          <FormControl
                            isInvalid={form.errors.telephone && form.touched.telephone}
                          >
                            <FormLabel fontSize={14}>Phone Number</FormLabel>
                            <InputGroup>
                              <InputLeftAddon children='+234' />
                              <Input {...field} type='tel' placeholder='phone number' variant='outline' mb={2} />
                            </InputGroup>
                            <FormErrorMessage>
                              {form.errors.telephone}
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
  
            <Flex justify='end' display={{ base: 'none', lg: 'block' }}>
              <Image src="/gray2art.png" w='70%' />
            </Flex>
          </Flex>
        </div>
      </Layout>
    );
  };
  
  export default Register;
  