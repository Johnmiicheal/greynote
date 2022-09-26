import React from "react";
import { Flex, Box, Button, Input, Select, Text, FormControl, FormErrorMessage, FormLabel, Image, Textarea} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { Layout } from "../src/components/Layout";
import { useRouter } from "next/router";

const Onboarding = () => {

  function validateRCNumber(value: number) {
    let error;
    if (!value) {
      error = "RCNumber is required";
    }
    return error;
  }

  function validateName(value: string) {
    let error;
    if (!value) {
      error = "School Name is required";
    }
    return error;
  }

  function validateAddress(value: any) {
    let error;
    if (!value) {
      error = "Address is required";
    }
    return error;
  }


  const router = useRouter();
  return(
    <Layout>
      <Flex bg='white' borderRadius='md' w='500px' px={5} py={3} direction='column' justify='center' align='center' mt={5}>
        <Image src="/grayfull.png" alt="grayfull" w={40} mb={5} />
        <Text fontWeight={500} fontSize={20}>Setup your School Profile</Text>

        <Flex direction='column' mt={10} w='full' px={10} pb={10}>
        <Formik
                  initialValues={{ name: "", address: "" }}
                  onSubmit={(values, actions) => {
                    setTimeout(() => {
                      alert(JSON.stringify(values, null, 2));
                      actions.setSubmitting(false);
                    }, 1000);
                  }}
                >
                  {(props) => (
                    <Form>
                      <Field name="name" validate={validateName}>
                        {({ field, form }: any) => (
                          <FormControl
                            isInvalid={form.errors.name && form.touched.name}
                          >
                            <FormLabel fontSize={14}>School Name</FormLabel>
                            <Input
                              {...field}
                              placeholder="School Name"
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

                      <Field name="address" validate={validateAddress}>
                        {({ field, form }: any) => (
                          <FormControl
                            isInvalid={form.errors.address && form.touched.address}
                          >
                            <FormLabel fontSize={14}>Address</FormLabel>
                            <Textarea
                              {...field}
                              placeholder="Address"
                              type="text"
                              variant="outline"
                              mb={2}
                            />
                            <FormErrorMessage>
                              {form.errors.address}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Flex direction='row' mb={2}>
                        <Field name="state">
                          {({ field, form }: any) => (
                            <FormControl
                            isRequired
                            >
                              <FormLabel fontSize={14}>State</FormLabel>
                              <Select placeholder='Select option' {...field} name='state' mb={2} w={40}>
                                <option value='option1'>State 1</option>
                                <option value='option2'>State 2</option>
                                <option value='option3'>State 3</option>
                              </Select>
                            </FormControl>
                          )}
                        </Field>
                        <Field name="country">
                          {({ field, form }: any) => (
                            <FormControl
                            isRequired
                            >
                              <FormLabel fontSize={14}>Country</FormLabel>
                              <Select placeholder='Select option' {...field} name='country' w="200px" >
                                <option value='option1'>Country 1</option>
                                <option value='option2'>Country 2</option>
                                <option value='option3'>Country 3</option>
                              </Select>
                            </FormControl>
                          )}
                        </Field>
                      
                      </Flex>    



                      <Field name="rcnumber" validate={validateRCNumber}>
                        {({ field, form }: any) => (
                          <FormControl
                            isInvalid={form.errors.rcnumber && form.touched.rcnumber}
                          >
                            <FormLabel fontSize={14}>RC Number</FormLabel>
                              <Input {...field} type='tel' placeholder='RC Number' variant='outline' mb={2} />
                            <FormErrorMessage>
                              {form.errors.rcnumber}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
  
                      {/* <Field name="password" validate={validatePass}>
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
                      </Field> */}
                      
  
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
    </Layout>
  )
}

export default Onboarding;