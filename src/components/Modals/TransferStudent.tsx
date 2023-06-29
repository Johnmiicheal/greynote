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
  Box
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { fakecase } from "../../../fakedata";
import { useRouter } from "next/router";
import { useTransferStudentMutation, useGetStudentByIdQuery, useGetSchoolByNameQuery } from "../../gql/graphql";
import { IoCaretDown } from "react-icons/io5";

interface TransferProps {
 isOpen: any,
 onClose: any, 
 id: any,
 schoolName: string,
 adminName: string,
 message: string,
}

export const TransferStudent: React.FC<TransferProps> = ({isOpen, onClose, id, schoolName, adminName, message}) => {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const router = useRouter();
  const toast = useToast();
  
  const [{ data: student }] = useGetStudentByIdQuery({
    variables: {
      studentId: id
    }
  })

  const [{ data: school }] = useGetSchoolByNameQuery({
    variables: {
      schoolName: schoolName!
    }
  })
  const [, transfer] = useTransferStudentMutation();
  const studentName = `${student?.getStudentById?.student?.firstName} ${student?.getStudentById?.student?.lastName}`


  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent minW="40rem">
        <ModalHeader bg="#F4B95F">Transfer {studentName}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Text mb={4} color="red.400">
            You are about to transfer {studentName} to {school?.getSchoolByName?.school?.schoolName}. Take note that the changes are irreversible
          </Text>
          <Formik
            initialValues={{
              studentId: id,
              schoolId: school?.getSchoolByName?.school?.id!,
              adminId: school?.getSchoolByName?.school?.creator?.admin?.id!,
            }}
            onSubmit={async (values, { setErrors }) => {
              const response = await transfer({
                studentId: id,
                schoolId: school?.getSchoolByName?.school?.id!,
              adminId: school?.getSchoolByName?.school?.creator?.admin?.id!,
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
                      <Input {...field} pointerEvents="none" value={schoolName} />
                    </FormControl>
                  )}
                </Field>

                <Field name="adminId">
                  {({ field, form }: any) => (
                    <FormControl mt={5} px={4}>
                      <FormLabel>School Admin</FormLabel>
                      <Input {...field} pointerEvents="none"  value={adminName} />
                      </FormControl>
                  )}
                </Field>
                  
                <Flex mt={5} px={4} direction="column">
                  <Text fontWeight={600}>Message</Text>
                  <Box
                  px={4}
                  py={2}
                  mt={2}
                  bgColor="gray.200"
                  w="full"
                  textAlign="start"
                  display={message.length > 1 ? "block" : "none"}
                >
                  <Text fontSize={16} fontWeight={400} noOfLines={2}>
                    {message}
                  </Text>
                </Box>

                </Flex>

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
