import React, { useState } from "react";
import { Flex, Box, Button, Input, Avatar, Select, Text, FormControl, FormErrorMessage, FormLabel, Image, Textarea, useToast} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { Layout } from "../src/components/Layout";
import { useRouter } from "next/router";
import { useRegisterSchoolMutation } from "../src/gql/graphql";
import FileBase from "react-file-base64";

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
  const [, register] = useRegisterSchoolMutation();
  const toast = useToast();
  type State = {
    image: string;
  };
  const [data, setData] = useState<State>({
      image: "",
    });


  const router = useRouter();
  return(
    <Layout>
      <Flex bg='white' borderRadius='md' w='500px' px={5} py={3} direction='column' justify='center' align='center' mt={5}>
        <Image src="/grayfull.png" alt="grayfull" w={40} mb={5} />
        <Text fontWeight={500} fontSize={20}>Setup your School Profile</Text>

        <Flex direction='column' mt={10} w='full' px={10} pb={10}>
        <Formik
                  initialValues={{ logoImgUrl: "", schoolName: "", address: "", rcnumber: 0, state: "", country: "" }}
                  onSubmit={async (values, {setErrors}) => {
                    console.log(values);
                    const response = await register({
                      logoImgUrl: data.image,
                      country: values.country,
                      state: values.state,
                      address: values.address,
                      rcnumber: values.rcnumber,
                      schoolName: values.schoolName                      
                    });
                    if(response.error){
                      toast({
                        title: "Register Error.",
                        description: "We could not register the School",
                        status: "error",
                        variant: "left-accent",
                        duration: 5000,
                        isClosable: true,
                      });
                    } else if (response.data?.registerSchool?.school) {
                      toast({
                        title: "School registerd Successfully.",
                        description: "We've registered your school for you.",
                        status: "success",
                        variant: "left-accent",
                        duration: 5000,
                        isClosable: true,
                      });
                      router.push("/");
                    }
                  }}
                >
                  {(props) => (
                    <Form>
                    <Field name="logoImgUrl">
                        {({ field, form }: any) => (
                          <FormControl isRequired>
                            <FormLabel>Upload School Logo</FormLabel>
                            <Avatar src={data.image} size="xl" mb={2} />
                            <FileBase
                              {...field}
                              type="file"
                              multiple={false}
                              accept="image/*"
                              onDone={({ base64 }: { base64: string }) =>
                                setData({ ...data, image: base64 })
                              }
                            />
                          </FormControl>
                        )}
                        </Field>

                      <Field name="schoolName">
                        {({ field, form }: any) => (
                          <FormControl
                            isInvalid={form.errors.schoolName && form.touched.schoolName}
                          >
                            <FormLabel mt={2} fontSize={14}>Name of Institution</FormLabel>
                            <Input
                              {...field}
                              placeholder="Name of Institution"
                              type="text"
                              variant="outline"
                              mb={2}
                            />
                            <FormErrorMessage>
                              {form.errors.schoolName}
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
                              <Input {...field} type='number' placeholder='RC Number' variant='outline' mb={2} />
                            <FormErrorMessage>
                              {form.errors.rcnumber}
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
    </Layout>
  )
}

export default Onboarding;