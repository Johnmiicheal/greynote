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
  Menu,
  MenuButton,
  useControllableState,
  Button,
  Flex,
  Select,
  useToast,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { fakecase } from "../../fakedata";
import { useRouter } from "next/router";
import { useTransferStudentMutation, useGetSchoolsQuery } from "../gql/graphql";
import { IoCaretDown } from "react-icons/io5";

export const TransferStudent = ({ isOpen, onClose, id }: any) => {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const router = useRouter();
  const toast = useToast();
  const [school, setSchool] = useControllableState({ defaultValue: 0 });
  const [{ data: schools }] = useGetSchoolsQuery();
  const [, transfer] = useTransferStudentMutation();

  const [name, setName] = useControllableState({
    defaultValue: "Select School",
  });

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Select a case</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Formik
            initialValues={{
              studentId: id,
              schoolId: school,
            }}
            onSubmit={async (values, { setErrors }) => {
              console.log(values);
              const response = await transfer({
                studentId: id,
                schoolId: school,
              });
              if (response.data?.transferStudent === false) {
                toast({
                  title: "Error.",
                  description: "We could not transfer the student",
                  status: "error",
                  variant: "left-accent",
                  duration: 5000,
                  isClosable: true,
                });
                // setTimeout(() => {
                //   router.reload();
                // }, 1000);
              } else if (response.data?.transferStudent === true) {
                toast({
                  title: "Student Transferred Successfully.",
                  description: "We've transferred the Student for you.",
                  status: "success",
                  variant: "left-accent",
                  duration: 5000,
                  isClosable: true,
                });
                // setTimeout(() => {
                //   router.reload();
                // }, 1000);
              }
            }}
          >
            {(props) => (
              <Form>
                <Field name="schoolId">
                  {({ field, form }: any) => (
                    <FormControl mt={1} px={4} isRequired>
                      <FormLabel>Select School</FormLabel>
                      <Menu>
                        {() => (
                          <>
                            <MenuButton
                              // isActive={isMenuOpen}
                              as={Button}
                              rightIcon={<IoCaretDown />}
                              name="schoolId"
                            >
                              {name}
                            </MenuButton>
                            <MenuList>
                              {schools?.getSchools.map((p) => (
                                <>
                                  <MenuItem
                                    name="schoolId"
                                    onClick={() => {
                                      setSchool(p.id);
                                      setName(p.schoolName);
                                    }}
                                  >
                                    {p.schoolName}
                                  </MenuItem>
                                </>
                              ))}
                            </MenuList>
                          </>
                        )}
                      </Menu>
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
                    Submit
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
                </Flex>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
