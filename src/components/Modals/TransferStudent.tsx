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
import { fakecase } from "../../../fakedata";
import { useRouter } from "next/router";
import { useTransferStudentMutation, useGetSchoolsQuery, useGetAdminsQuery, useGetStudentByIdQuery } from "../../gql/graphql";
import { IoCaretDown } from "react-icons/io5";

export const TransferStudent = ({ isOpen, onClose, id }: any) => {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const router = useRouter();
  const toast = useToast();
  const [school, setSchool] = useControllableState({ defaultValue: 0 });
  const [admin, setAdmin] = useControllableState({ defaultValue: 0 });
  const [{ data: schools }] = useGetSchoolsQuery();
  const [{ data: admins }] = useGetAdminsQuery();
  const [{ data: student }] = useGetStudentByIdQuery({
    variables: {
      studentId: id
    }
  })
  const [, transfer] = useTransferStudentMutation();

  const [name, setName] = useControllableState({
    defaultValue: "Select School",
  });
  const studentName = `${student?.getStudentById?.student?.firstName} ${student?.getStudentById?.student?.lastName}`

  const [adminName, setAdminName] = useControllableState({
    defaultValue: "Select Admin",
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
        <ModalHeader>Transfer {studentName}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Formik
            initialValues={{
              studentId: id,
              schoolId: school,
              adminId: admin,
            }}
            onSubmit={async (values, { setErrors }) => {
              const response = await transfer({
                studentId: id,
                schoolId: school,
                adminId: admin,
              });
              if (response.data?.transferStudent === false) {
                console.log(values)
                console.log(response.error)
                toast({
                  title: "Error.",
                  description: "We could not transfer the student",
                  status: "error",
                  variant: "left-accent",
                  duration: 5000,
                  isClosable: true,
                });
                setTimeout(() => {
                  router.reload();
                }, 1500);
              } else if (response.data?.transferStudent === true) {
                console.log(values)
                toast({
                  title: "Student Transferred Successfully.",
                  description: "We've transferred the Student for you.",
                  status: "success",
                  variant: "left-accent",
                  duration: 5000,
                  isClosable: true,
                });
                setTimeout(() => {
                  router.reload();
                }, 1000);
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

                <Field name="adminId">
                  {({ field, form }: any) => (
                    <FormControl mt={5} px={4} isRequired>
                      <FormLabel>Select Admin</FormLabel>
                      <Menu>
                        {() => (
                          <>
                            <MenuButton
                              // isActive={isMenuOpen}
                              as={Button}
                              rightIcon={<IoCaretDown />}
                              name="adminId"
                            >
                              {adminName}
                            </MenuButton>
                            <MenuList>
                              {admins?.getAdmins.map((p) => (
                                <>
                                  <MenuItem
                                    name="adminId"
                                    onClick={() => {
                                      setAdmin(p.id);
                                      setAdminName(p.adminName);
                                    }}
                                  >
                                    {p.adminName}
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
