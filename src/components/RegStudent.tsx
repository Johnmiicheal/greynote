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
  Textarea,
} from "@chakra-ui/react";
import { DayPicker } from "react-day-picker";
import { Formik, Form, Field } from "formik";
import { fakegender, fakeclass, realState } from "../../fakedata";
import { useRegisterStudentMutation } from "../gql/graphql";
import { useRouter } from "next/router";
import { format } from "date-fns"
import "react-day-picker/dist/style.css";

export const RegStudent = ({ isOpen, onClose }: any) => {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [, register] = useRegisterStudentMutation();
  
  const router = useRouter();
  const toast = useToast();
  const [selected, setSelected] = React.useState<Date>();
  
  const [tabIndex, setTabIndex] = React.useState(0);
  let currYear = new Date().getFullYear()
  let footer = <p>Please select a day.</p>;
  if (selected) {
    footer = <p>You selected {format(selected, 'PP')}.</p>;
  }

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
            title: "Error.",
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
          router.reload();
        }
      }}
    >
      {(props) => (
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
          motionPreset='slideInBottom'
        >
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <Tabs index={tabIndex} variant="enclosed" isFitted>
              <TabList mt={10}>
                <Tab>One</Tab>
                <Tab>Two</Tab>
                <Tab>Three</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <ModalHeader textAlign="center">
                    Register a Student
                  </ModalHeader>
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
                          onClick={() => setTabIndex(1)}
                        >
                          Continue
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                      </Flex>
                    </Form>
                  </ModalBody>{" "}
                </TabPanel>
                <TabPanel>
                  <ModalHeader textAlign="center">
                    Student Profile Details
                  </ModalHeader>
                  <ModalBody pb={6}>
                    <Form>
                      <Field name="birthDay">
                        {({ field, form }: any) => (
                          <FormControl isRequired>
                            <FormLabel>Date of Birth</FormLabel>
                            <DayPicker
                              fromYear={2000}
                              toYear={currYear}
                              captionLayout="dropdown"
                              mode="single"
                              selected={selected}
                              onSelect={setSelected}
                              footer={footer}
                              {...field}
                            />
                          </FormControl>
                        )}
                      </Field>

                      <Field name="lgaOrigin">
                        {({ field, form }: any) => (
                          <FormControl mt={4} >
                            <FormLabel>LGA of Origin</FormLabel>
                            <Input
                              {...field}
                              placeholder="LGA of Origin"
                            />
                          </FormControl>
                        )}
                      </Field>

                        <Field name="state">
                          {({ field, form }: any) => (
                            <FormControl mt={4} >
                              <FormLabel>State</FormLabel>
                              <Select
                                placeholder="Select State"
                                w={40}
                                focusBorderColor="#F4B95F"
                                {...field}
                              >
                                {realState.map((p, i) => (
                                  <option value={p} key={i}>
                                    {p}
                                  </option>
                                ))}
                              </Select>
                            </FormControl>
                          )}
                        </Field>

                        <Field name="academicResult">
                        {({ field, form }: any) => (
                          <FormControl mt={4}>
                            <FormLabel>Academic Result</FormLabel>
                            <Input
                              {...field}
                              placeholder="Link to Academic Result"
                              type="url"
                            />
                          </FormControl>
                        )}
                      </Field>

                      <Flex direction="row" justify="end" mt={10}>
                        <Button
                          bg="#F4B95F"
                          color="white"
                          _hover={{ bg: "#DAA65D" }}
                          mr={3}
                          onClick={() => setTabIndex(2)}
                        >
                          Next
                        </Button>
                        <Button onClick={() => setTabIndex(0)}>Previous</Button>
                      </Flex>
                    </Form>
                  </ModalBody>{" "}
                </TabPanel>
                <TabPanel>
                <ModalHeader textAlign="center">
                    Parent/Guardian Details
                  </ModalHeader>
                  <ModalBody pb={6}>
                    <Form>
                      <Field name="parentName">
                        {({ field, form }: any) => (
                          <FormControl isRequired>
                            <FormLabel>Parent/Guardian Name</FormLabel>
                            <Input
                              {...field}
                              ref={initialRef}
                              placeholder="Parent/Guardian name"
                            />
                          </FormControl>
                        )}
                      </Field>

                      <Field name="parentNumber">
                        {({ field, form }: any) => (
                          <FormControl mt={4} isRequired>
                            <FormLabel>Parent/Guardian Number</FormLabel>
                            <Input
                              {...field}
                              placeholder="Parent/Guardian Number"
                            />
                          </FormControl>
                        )}
                      </Field>

                      <Field name="parentEmail">
                        {({ field, form }: any) => (
                          <FormControl mt={4} isRequired>
                            <FormLabel>Parent/Guardian Email</FormLabel>
                            <Input
                              {...field}
                              placeholder="Parent/Guardian Email"
                              type="email"
                            />
                          </FormControl>
                        )}
                      </Field>

                      <Field name="homeAddress">
                        {({ field, form }: any) => (
                          <FormControl mt={4} isRequired>
                            <FormLabel>Home Address</FormLabel>
                            <Textarea
                              {...field}
                              placeholder="Home Address"
                            />
                          </FormControl>
                        )}
                      </Field>

                      <Flex direction="row" justify="end" mt={10}>
                        <Button
                          bg="#F4B95F"
                          color="white"
                          _hover={{ bg: "#DAA65D" }}
                          mr={3}
                          type="submit"
                        >
                          Complete
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                      </Flex>
                    </Form>
                  </ModalBody>{" "}
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalContent>
        </Modal>
      )}
    </Formik>
  );
};
