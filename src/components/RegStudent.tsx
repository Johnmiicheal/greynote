import React, { useState } from "react";
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
  Avatar,
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
import { format } from "date-fns";
import "react-day-picker/dist/style.css";
import FileBase from "react-file-base64";

export const RegStudent = ({ isOpen, onClose }: any) => {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [, register] = useRegisterStudentMutation();

  const router = useRouter();
  const toast = useToast();
  const [selected, setSelected] = React.useState<Date>();
  type State = {
    image: string;
  };
  type FileState = {
    file: string;
  };
  const [data, setData] = useState<State>({
      image: "",
    });
  const [result, setResult] = useState<FileState>({
    file: "",
  })
    

  const [tabIndex, setTabIndex] = React.useState(0);
  let currYear = new Date().getFullYear();
  let footer = <p>Please select a date.</p>;
  if (selected) {
    footer = <p>You selected {format(selected, "PP")}.</p>;
  }

  const handleTabsChange = (index: React.SetStateAction<number>) => {
    setTabIndex(index);
  };
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        ageInput: 0,
        gender: "",
        gradeClass: "",
        birthDate: selected,
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
          profileImgUrl: data.image,
          academicResult: result.file,
          lgaOrigin: values.lgaOrigin,
          state: values.state,
          homeAddress: values.homeAddress,
          parentEmail: values.parentEmail,
          parentNumber: values.parentNumber,
          parentName: values.parentName,
          birthDate: selected!,
          ageInput: values.ageInput,
          gradeClass: values.gradeClass,
          gender: values.gender,
          lastName: values.lastName,
          firstName: values.firstName,
        });
        if (!response.data?.registerStudent?.student) {
          toast({
            title: "Error.",
            description: "We could not register the Student",
            status: "error",
            variant: "left-accent",
            duration: 5000,
            isClosable: true,
          });
          // setTimeout(() => {
          //   router.reload();
          // }, 1000)
        } else if (response.data?.registerStudent?.student) {
          toast({
            title: "Student registerd Successfully.",
            description: "We've registered your Student for you.",
            status: "success",
            variant: "left-accent",
            duration: 5000,
            isClosable: true,
          });
          // setTimeout(() => {
          //   router.reload();
          // }, 1000)
        }
      }}
    >
      {(props) => (
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
          motionPreset="slideInBottom"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <Tabs index={tabIndex} variant="enclosed" isFitted>
              <TabPanels>
                <TabPanel>
                  <ModalHeader textAlign="center">
                    Register a Student
                  </ModalHeader>
                  <ModalBody pb={6}>
                    <Form>
                      <Field name="profileImgUrl">
                        {({ field, form }: any) => (
                          <FormControl isRequired>
                            <FormLabel>Upload Student Image</FormLabel>
                            <Avatar src={data.image} size="xl" />
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
                      
                      <Field name="firstName">
                        {({ field, form }: any) => (
                          <FormControl isRequired>
                            <FormLabel>First name</FormLabel>
                            <Input
                              {...field}
                              ref={initialRef}
                              placeholder="First name"
                              focusBorderColor="#F4B95F"
                            />
                          </FormControl>
                        )}
                      </Field>

                      <Field name="lastName">
                        {({ field, form }: any) => (
                          <FormControl mt={4} isRequired>
                            <FormLabel>Last name</FormLabel>
                            <Input
                              {...field}
                              placeholder="Last name"
                              focusBorderColor="#F4B95F"
                            />
                          </FormControl>
                        )}
                      </Field>

                      <Flex direction="row">
                        <Field name="ageInput">
                          {({ field, form }: any) => (
                            <FormControl mt={4} isRequired>
                              <FormLabel>Age</FormLabel>
                              <Input
                                {...field}
                                placeholder="Age"
                                type="number"
                                w={40}
                                focusBorderColor="#F4B95F"
                              />
                            </FormControl>
                          )}
                        </Field>

                        <Field name="gender">
                          {({ field, form }: any) => (
                            <FormControl mt={4} isRequired>
                              <FormLabel>Gender</FormLabel>
                              <Select
                                {...field}
                                placeholder="Select Gender"
                                w={40}
                                focusBorderColor="#F4B95F"
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
                              {fakeclass.map((grade, id) => (
                                <option value={grade} key={id}>
                                  {grade}
                                </option>
                              ))}
                            </Select>
                          </FormControl>
                        )}
                      </Field>

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
                      <Field name="birthDate">
                        {({ field, form }: any) => (
                          <FormControl isRequired>
                            <FormLabel>Date of Birth</FormLabel>
                            <DayPicker
                              fromYear={2000}
                              toYear={currYear}
                              captionLayout="dropdown"
                              mode="single"
                              onSelect={setSelected}
                              selected={selected}
                              footer={footer}
                              {...field}
                            />
                          </FormControl>
                        )}
                      </Field>

                      <Field name="lgaOrigin">
                        {({ field, form }: any) => (
                          <FormControl mt={4}>
                            <FormLabel>LGA of Origin</FormLabel>
                            <Input
                              {...field}
                              placeholder="LGA of Origin"
                              focusBorderColor="#F4B95F"
                            />
                          </FormControl>
                        )}
                      </Field>

                      <Field name="state">
                        {({ field, form }: any) => (
                          <FormControl mt={4}>
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
                            <FormLabel>Upload Academic Result</FormLabel>
                            <FileBase
                            {...field}
                            type="file"
                            multiple={false}
                            onDone={({ base64 }: { base64: string }) =>
                              setResult({ ...result, file: base64 })
                            }
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
                              focusBorderColor="#F4B95F"
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
                              focusBorderColor="#F4B95F"
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
                              focusBorderColor="#F4B95F"
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
                              focusBorderColor="#F4B95F"
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
