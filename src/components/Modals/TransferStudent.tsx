import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Text,
  Button,
  Flex,
  Input,
  useToast,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { fakecase } from "../../../fakedata";
import { useRouter } from "next/router";
import { useTransferStudentMutation, useGetStudentByIdQuery } from "../../gql/graphql";
import { IoCaretDown } from "react-icons/io5";

export const TransferStudent = ({ isOpen, onClose, id }: any) => {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const router = useRouter();
  const toast = useToast();
  const [{ data: student }] = useGetStudentByIdQuery({
    variables: {
      studentId: id
    }
  })
  const [, transfer] = useTransferStudentMutation();
  const studentName = `${student?.getStudentById?.student?.firstName} ${student?.getStudentById?.student?.lastName}`
  const admin = student?.getStudentById?.student?.creator!;
  const school = student?.getStudentById?.student?.school!;

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
          <Text mb={4}>
            You are about to transfer {studentName}. Take note that the changes are irreversible
          </Text>
          <Formik
            initialValues={{
              studentId: id,
              schoolId: 0,
              adminId: 0,
            }}
            onSubmit={async (values, { setErrors }) => {
              const response = await transfer({
                studentId: id,
                schoolId: school?.school?.id!,
                adminId: admin?.admin?.id!,
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
                    <FormControl mt={1} px={4}>
                      <FormLabel>School Name</FormLabel>
                      <Input {...field} value={school?.school?.schoolName} />
                      
                    </FormControl>
                  )}
                </Field>

                <Field name="adminId">
                  {({ field, form }: any) => (
                    <FormControl mt={5} px={4}>
                      <FormLabel>School Admin</FormLabel>
                      <Input {...field} value={admin?.admin?.adminName} />
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
                    Transfer
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
