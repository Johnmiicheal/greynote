import React, { useState, useEffect } from "react";
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
  Text,
  IconButton,
} from "@chakra-ui/react";
import { DayPicker } from "react-day-picker";
import { Formik, Form, Field } from "formik";
import {
  fakegender,
  fakeclass,
  realState,
  monthDropDown,
} from "../../fakedata";
import {
  Student,
  useGetStudentByIdQuery,
  useUpdateStudentDetailsMutation,
} from "../gql/graphql";
import { useRouter } from "next/router";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";
import FileBase from "react-file-base64";
import { IoArrowBackOutline } from "react-icons/io5";
import styles from "../../styles/Input.module.css";

interface EditStudentProps {
  s: Student;
  isOpen: any;
  onClose: any;
}

export const EditStudent: React.FC<EditStudentProps> = ({
  s,
  isOpen,
  onClose,
}) => {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [, update] = useUpdateStudentDetailsMutation();
  const [{ data: student, fetching, error }] = useGetStudentByIdQuery({
    variables: {
      studentId: s.id,
    },
  });
  const getStudent = student?.getStudentById?.student!;

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
    image: getStudent.profileImgUrl,
  });
  const [result, setResult] = useState<FileState>({
    file: "",
  });

  const [tabIndex, setTabIndex] = React.useState(0);
  let currYear = new Date().getFullYear();
  let footer = <p>Please select a date.</p>;
  if (selected) {
    footer = <p>You selected {format(selected, "PP")}.</p>;
  }

  const handleClose = () => {
    setTabIndex(0);
    onClose();
  }

  let maxOffset = 50;
  let thisYear = new Date().getFullYear();
  const startYearList = Array.from(new Array(maxOffset), (v, i) => (
    <option key={i} value={thisYear - i}>
      {thisYear - i}
    </option>
  ));
  const endYearList = Array.from(new Array(maxOffset), (v, i) => (
    <option key={i} value={thisYear + i}>
      {thisYear + i}
    </option>
  ));

  const [startYears, setStartYears] = useState<string[]>([]);
  const [endYears, setEndYears] = useState<string[]>([]);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const startYear = Array.from({ length: currentYear - 2000 + 1 }, (_, i) =>
      (2000 + i).toString()
    );
    const endYear = Array.from({ length: 11 }, (_, i) =>
      (currentYear + i).toString()
    );
    const endConcat = [...new Set(startYear.concat(endYear))];
    setEndYears(endConcat.reverse());
    setStartYears(startYear.reverse());
  }, []);

  const handleTabsChange = (index: React.SetStateAction<number>) => {
    setTabIndex(index);
  };

  const handleGoBack = () => {
    if(tabIndex === 0){
        return tabIndex;
    }
    return setTabIndex(tabIndex - 1);
  }

  return (
    <Formik
      initialValues={{
        firstName: getStudent.firstName,
        lastName: getStudent.lastName,
        ageInput: getStudent.ageInput,
        gender: getStudent.gender,
        gradeClass: getStudent.gradeClass,
        birthDate: getStudent.birthDate,
        startDate: { month: "", year: "" },
        endDate: { month: "", year: "" },
        parentName: getStudent.parentName,
        parentNumber: getStudent.parentNumber,
        parentEmail: getStudent.parentEmail,
        homeAddress: getStudent.homeAddress,
        state: getStudent.state,
        lgaOrigin: "",
        academicResult: getStudent.academicResult,
        profileImgUrl: getStudent.profileImgUrl,
      }}
      onSubmit={async (values, { setErrors }) => {
        const { startDate, endDate } = values;
        const formattedStartDate = `${startDate.month} ${startDate.year}`;
        const formattedEndDate = `${endDate.month} ${endDate.year}`;
        const response = await update({
          studentId: getStudent.id,
          profileImgUrl: data.image,
          academicResult: result.file,
          lgaOrigin: values.lgaOrigin,
          state: values.state,
          homeAddress: values.homeAddress,
          parentEmail: values.parentEmail,
          parentNumber: values.parentNumber,
          parentName: values.parentName,
          endDate: formattedEndDate ? formattedEndDate : getStudent.endDate,
          startDate: formattedStartDate ? formattedStartDate : getStudent.startDate,
          birthDate: selected ? selected : getStudent.birthDate,
          ageInput: values.ageInput,
          gradeClass: values.gradeClass,
          gender: values.gender,
          lastName: values.lastName,
          firstName: values.firstName,
        });
        if (response.error) {
          toast({
            title: "Error.",
            description: "We could not update the Student",
            status: "error",
            variant: "left-accent",
            duration: 5000,
            isClosable: true,
          });
          // setTimeout(() => {
          //   router.reload();
          // }, 1000)
        } else if (response.data?.updateStudentDetails === true) {
          console.log(values);
          toast({
            title: "Student updated Successfully.",
            description: "We've updateed your Student for you.",
            status: "success",
            variant: "left-accent",
            duration: 5000,
            isClosable: true,
          });
          setTimeout(() => {
            router.reload();
          }, 1000)
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
          <ModalContent mt={4} minW="35em" maxH="40em" overflowY="auto">
            <Flex w="full" p={1}>
              <IconButton
                variant="ghost"
                aria-label="go back"
                icon={<IoArrowBackOutline />}
                onClick={handleGoBack}
              />
              <ModalCloseButton onClick={handleClose} />
            </Flex>
            <Tabs index={tabIndex} variant="enclosed" isFitted mt={-2}>
              <TabPanels>
                <TabPanel>
                  <ModalHeader textAlign="center">Update Student Details</ModalHeader>
                  <ModalBody pb={6}>
                    <Form>
                      <Field name="profileImgUrl">
                        {({ field, form }: any) => (
                          <FormControl>
                            <Flex direction="column" align="center">
                              <FormLabel>Upload Student Image</FormLabel>
                              <Avatar src={data.image} borderRadius="7px" size="xl" mb={1} />
                              <Flex
                                align="center"
                                ml={20}
                                className={styles.inputBtn}
                              >
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
                            </Flex>
                          </FormControl>
                        )}
                      </Field>

                      <Field name="firstName">
                        {({ field, form }: any) => (
                          <FormControl>
                            <FormLabel>First name</FormLabel>
                            <Input
                              {...field}
                              ref={initialRef}
                              focusBorderColor="#F4B95F"
                            />
                          </FormControl>
                        )}
                      </Field>

                      <Field name="lastName">
                        {({ field, form }: any) => (
                          <FormControl mt={4}>
                            <FormLabel>Last name</FormLabel>
                            <Input
                              {...field}
                              focusBorderColor="#F4B95F"
                            />
                          </FormControl>
                        )}
                      </Field>

                      <Flex direction="row" gap={5}>
                        <Field name="ageInput">
                          {({ field, form }: any) => (
                            <FormControl mt={4}>
                              <FormLabel>Age</FormLabel>
                              <Input
                                {...field}
                                type="number"
                                w="220px"
                                focusBorderColor="#F4B95F"
                              />
                            </FormControl>
                          )}
                        </Field>

                        <Field name="gender">
                          {({ field, form }: any) => (
                            <FormControl mt={4}>
                              <FormLabel>Gender</FormLabel>
                              <Select
                                {...field}
                                placeholder="Select Gender"
                                w="220px"
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
                          <FormControl mt={4}>
                            <FormLabel>Grade</FormLabel>
                            <Select
                              placeholder="Select Grade"
                              w="220px"
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

                      <Flex direction="column" mt={4}>
                        <Text fontWeight={600}>Start Date</Text>
                        <Flex>
                          <Field name="startDate.month">
                            {({ field, form }: any) => (
                              <FormControl mt={2}>
                                <Select
                                  placeholder="Month"
                                  name="startDate.month"
                                  w="220px"
                                  mr={5}
                                  focusBorderColor="#F4B95F"
                                  {...field}
                                >
                                  {monthDropDown.map((month, id) => (
                                    <option value={month.abbreviation} key={id}>
                                      {month.name}
                                    </option>
                                  ))}
                                </Select>
                              </FormControl>
                            )}
                          </Field>

                          <Field name="startDate.year">
                            {({ field, form }: any) => (
                              <FormControl ml={2} mt={2}>
                                <Select
                                  {...field}
                                  name="startDate.year"
                                  placeholder="Year"
                                  w="220px"
                                  focusBorderColor="#F4B95F"
                                >
                                  {startYears.map((v, i) => (
                                    <option value={v} key={i}>
                                      {v}
                                    </option>
                                  ))}
                                  {/* { startYearList } */}
                                </Select>
                              </FormControl>
                            )}
                          </Field>
                        </Flex>
                      </Flex>

                      <Flex direction="column" mt={4}>
                        <Text fontWeight={600}>End Date(or expected)</Text>
                        <Flex>
                          <Field name="endDate.month">
                            {({ field, form }: any) => (
                              <FormControl mt={2}>
                                <Select
                                  placeholder="Month"
                                  name="endDate.month"
                                  w="220px"
                                  mr={7}
                                  focusBorderColor="#F4B95F"
                                  {...field}
                                >
                                  {monthDropDown.map((month, id) => (
                                    <option value={month.abbreviation} key={id}>
                                      {month.name}
                                    </option>
                                  ))}
                                </Select>
                              </FormControl>
                            )}
                          </Field>

                          <Field name="endDate.year">
                            {({ field, form }: any) => (
                              <FormControl mt={2}>
                                <Select
                                  {...field}
                                  name="endDate.year"
                                  placeholder="Year"
                                  w="220px"
                                  focusBorderColor="#F4B95F"
                                >
                                  {endYears.map((v, i) => (
                                    <option value={v} key={i}>
                                      {v}
                                    </option>
                                  ))}
                                  {/* { endYearList } */}
                                </Select>
                              </FormControl>
                            )}
                          </Field>
                        </Flex>
                      </Flex>

                      <Flex direction="row" justify="end" mt={10}>
                        <Button
                          bg="#F4B95F"
                          color="white"
                          _hover={{ bg: "#DAA65D" }}
                          mr={3}
                          onClick={() => setTabIndex(1)}
                        >
                          Next
                        </Button>
                        <Button onClick={handleClose}>Cancel</Button>
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
                          <FormControl>
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
                              w="220px"
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
                          <FormControl>
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
                          <FormControl mt={4}>
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
                          <FormControl mt={4}>
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
                          <FormControl mt={4}>
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
                          isLoading={props.isSubmitting}
                        >
                          Update Student
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
