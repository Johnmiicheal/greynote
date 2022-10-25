import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  Box,
  Select,
  useToast,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { fakegender, fakeclass } from "../../fakedata";
import { useRegisterStudentMutation } from "../gql/graphql";
import { useRouter } from "next/router";

export const RegStudent = ({ isOpen, onClose }: any) => {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [, register] = useRegisterStudentMutation();

  const router = useRouter();
  const toast = useToast();

  const [tabIndex, setTabIndex] = React.useState(0);

  const handleTabsChange = (index: React.SetStateAction<number>) => {
    setTabIndex(index);
  };
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        gradeClass: "",
        gender: "",
        ageInput: 0,
        birthDay: "",
        birthMonth: "",
        birthyear: "",
        parentName: "",
        parentNumber: "",
        parentEmail: "",
        homeAddress: "",
        state: "",
        lgaOrigin: "",
        academicResult: "",
        profileImgUrl: "",
      }}
      onSubmit={async (values, { setErrors }) => {
        console.log(values);
        const response = await register({
          profileImgUrl: values.profileImgUrl,
          academicResult: values.academicResult,
          lgaOrigin: values.lgaOrigin,
          state: values.state,
          homeAddress: values.homeAddress,
          parentEmail: values.parentEmail,
          parentNumber: values.parentNumber,
          parentName: values.parentName,
          birthYear: values.birthyear,
          birthMonth: values.birthMonth,
          birthDay: values.birthDay,
          ageInput: values.ageInput,
          gender: values.gender,
          gradeClass: values.gradeClass,
          lastName: values.lastName,
          firstName: values.firstName,
        });
        if (response.error) {
          toast({
            title: "Register Error.",
            description: "We could not register the Student",
            status: "error",
            variant: "left-accent",
            duration: 5000,
            isClosable: true,
          });
        } else if (response.data?.registerStudent?.student) {
          toast({
            title: "Student registerd Successfully.",
            description: "We've registered your Student for you.",
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
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton/>
            <Tabs index={tabIndex}variant="enclosed" isFitted>
              <TabList mt={10}>
                <Tab>One</Tab>
                <Tab>Two</Tab>
                <Tab>Three</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <ModalHeader textAlign='center'>Register a Student</ModalHeader>
                  <ModalBody pb={6}>
                    <Form>
                      <Field name="firstName">
                        {({ field, form }: any) => (
                          <FormControl isRequired>
                            <FormLabel>First name</FormLabel>
                            <Input
                              {...field}
                              ref={initialRef}
                              placeholder="First name"
                            />
                          </FormControl>
                        )}
                      </Field>

                      <Field name="lastName">
                        {({ field, form }: any) => (
                          <FormControl mt={4} isRequired>
                            <FormLabel>Last name</FormLabel>
                            <Input {...field} placeholder="Last name" />
                          </FormControl>
                        )}
                      </Field>
                      <Flex direction="row">
                        <Field name="gradeClass">
                          {({ field, form }: any) => (
                            <FormControl mt={4} isRequired>
                              <FormLabel>Grade</FormLabel>
                              <Select
                                placeholder="Select Grade"
                                w={40}
                                focusBorderColor="#F4B95F"
                                {...field}
                              >
                                {fakeclass.map((p, i) => (
                                  <option value={p} key={i}>
                                    {p}
                                  </option>
                                ))}
                              </Select>
                            </FormControl>
                          )}
                        </Field>
                        <Field name="gender">
                          {({ field, form }: any) => (
                            <FormControl mt={4} isRequired>
                              <FormLabel>Gender</FormLabel>
                              <Select
                                placeholder="Select Gender"
                                w={40}
                                focusBorderColor="#F4B95F"
                                {...field}
                              >
                                {fakegender.map((p, i) => (
                                  <option value={p} key={i}>
                                    {p}
                                  </option>
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
                          onClick={() => setTabIndex(tabIndex + 1)}
                        >
                          Next
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                      </Flex>
                    </Form>
                  </ModalBody>{" "}
                </TabPanel>
                <TabPanel>
                  <p>Yeah yeah. What's up?</p>
                </TabPanel>
                <TabPanel>
                  <p>Oh, hello there.</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalContent>
        </Modal>
      )}
    </Formik>
  );
};
