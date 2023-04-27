import React, { useState } from "react";
import {
  Flex,
  Box,
  Button,
  Input,
  Avatar,
  Select,
  Text,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { Layout } from "../src/components/Layout";
import { useRouter } from "next/router";
import { useRegisterSchoolMutation } from "../src/gql/graphql";
import FileBase from "react-file-base64";
import Header from "../src/components/Registration/Header";
import { realState, lgaList } from "../fakedata";
import Head from "next/head";

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

  type File = {
    license: string;
  };

  const [file, setFile] = useState<File>({
    license: "",
  });

  const inputStyles = {
    mb: 2,
    focusBorderColor: "#F4B95F",
    variant: "outline",
  };

  const [selectedState, setSelectedState] = useState<string | null>("");

  const handleStateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedState(event.target.value);
    console.log("Selected State: ", selectedState);
  };

  const router = useRouter();
  return (
    <Layout>
      <Head>
        <title>Graybook - Create School Profile</title>
      </Head>
      <Header />
      <Flex
        bg="white"
        minH="100vh"
        w="550px"
        mt={14}
        px={5}
        py={3}
        direction="column"
        justify="center"
        align="center"
      >
        <Text fontWeight={500} fontSize={20}>
          Setup your School Profile
        </Text>

        <Flex direction="column" mt={10} w="full" px={10} pb={10}>
          <Formik
            initialValues={{
              logoImgUrl: "",
              schoolName: "",
              address: "",
              description: "",
              rcnumber: 0,
              state: "",
              lgarea: "Somewhere",
              country: "",
            }}
            onSubmit={async (values, { setErrors }) => {
              console.log(values);
              const response = await register({
                logoImgUrl: data.image,
                state: values.state,
                lgarea: values.lgarea,
                address: values.address,
                description: values.description,
                rcnumber: values.rcnumber,
                schoolName: values.schoolName,
                license: file.license,
              });
              if (response.error) {
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
                setTimeout(() => {
                  router.push("/app");
                }, 500);
              }
            }}
          >
            {(props) => (
              <Form>
                <Field name="logoImgUrl">
                  {({ field, form }: any) => (
                    <FormControl isRequired>
                      <Flex direction="column" align="center">
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
                      </Flex>
                    </FormControl>
                  )}
                </Field>

                <Field name="schoolName">
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={
                        form.errors.schoolName && form.touched.schoolName
                      }
                    >
                      <FormLabel mt={2} fontSize={14}>
                        Name of Institution
                      </FormLabel>
                      <Input
                        {...field}
                        placeholder="Name of Institution"
                        type="text"
                        {...inputStyles}
                      />
                      <FormErrorMessage>
                        {form.errors.schoolName}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="description">
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={
                        form.errors.description && form.touched.description
                      }
                    >
                      <FormLabel fontSize={14}>School Description</FormLabel>
                      <Textarea
                        {...field}
                        placeholder="Short Description"
                        type="text"
                        {...inputStyles}
                      />
                      <FormErrorMessage>
                        {form.errors.description}
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
                        {...inputStyles}
                      />
                      <FormErrorMessage>{form.errors.address}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Flex mb={2} align="center" justify="start">
                  <Field name="state">
                    {({ field, form }: any) => (
                      <FormControl isRequired>
                        <FormLabel fontSize={14}>State</FormLabel>
                        <Select
                          placeholder="Select State"
                          value={selectedState}
                          onChange={handleStateChange}
                          {...field}
                          name="state"
                          mb={2}
                          w={40}
                        >
                          {realState.map((state) => (
                            <option key={state} value={state}>
                              {state}
                            </option>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="lgarea">
                    {({ field, form }: any) => (
                      <FormControl isRequired>
                        <FormLabel fontSize={14}>Local Govt. Area</FormLabel>
                        <Select
                          {...field}
                          name="lgarea"
                          mb={2}
                          w={40}
                          placeholder="Select LGA"
                          isDisabled={!selectedState}
                        >
                          {selectedState &&
                            lgaList[selectedState].map((lga) => (
                              <option key={lga} value={lga}>
                                {lga}
                              </option>
                            ))}
                        </Select>
                      </FormControl>
                    )}
                  </Field>
                </Flex>

                <Flex direction="column">
                  <Text fontSize={14} fontWeight={600} mb="4">
                    Country
                  </Text>
                  <Flex align="center" gap="2">
                    <Image
                      src="https://catamphetamine.gitlab.io/country-flag-icons/3x2/NG.svg"
                      alt="NG_Flag"
                      w="30px"
                      h="30px"
                      borderRadius="10px"
                    />
                    <Text fontSize={14} fontWeight={600}>
                      Nigeria
                    </Text>
                  </Flex>
                </Flex>

                <Field name="license">
                  {({ field, form }: any) => (
                    <FormControl mt={4} mb={4}>
                      <FormLabel>Upload Govt. License</FormLabel>
                      <FileBase
                        {...field}
                        type="file"
                        multiple={false}
                        onDone={({ base64 }: { base64: string }) =>
                          setFile({ ...file, license: base64 })
                        }
                      />
                    </FormControl>
                  )}
                </Field>

                <Field name="rcnumber" validate={validateRCNumber}>
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={form.errors.rcnumber && form.touched.rcnumber}
                    >
                      <FormLabel fontSize={14}>RC Number</FormLabel>
                      <Input
                        {...field}
                        type="number"
                        placeholder="RC Number"
                        {...inputStyles}
                      />
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
  );
};

export default Onboarding;
