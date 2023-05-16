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
  Button,
  Flex,
  Text,
  useToast,
  Textarea,
  Avatar,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { fakecase } from "../../../fakedata";
import { useRouter } from "next/router";
import { useCreateRequestMutation, Student } from "../../gql/graphql";
import { IoCaretDown } from "react-icons/io5";

interface RequestStudentProps{
    req: Partial<Student>
    isOpen: any,
    onClose: any
}

export const RequestStudent: React.FC<RequestStudentProps> = ({ req, isOpen, onClose}) => {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const router = useRouter();
  const toast = useToast();
  const [, request] = useCreateRequestMutation()
  const studentName = `${req.firstName} ${req.lastName}`;

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Request for {studentName}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Formik
            initialValues={{
              studentId: req.id,
              message: "",
            }}
            onSubmit={async (values, { setErrors }) => {
              const response = await request({
                studentId: req.id!,
                message: values.message
              });
              if (response.error) {
                console.log(values)
                console.log(response.error)
                toast({
                  title: "Error.",
                  description: `${response.error.message}`,
                  status: "error",
                  variant: "left-accent",
                  duration: 5000,
                  isClosable: true,
                });
                // setTimeout(() => {
                //   router.reload();
                // }, 1000);
              } else if (response.data?.createRequest?.requests) {
                console.log(values)
                toast({
                  title: "Request Sent",
                  description: "We've successfully created the request",
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
               <Flex gap="5" bg="gray.100" justify="center" py={2} borderRadius="md" align="center">
                <Avatar src={req.profileImgUrl} size="lg" />
                <Flex direction="column">
                  <Text textStyle="text" fontSize="1.1rem" fontWeight="500">
                    {req.firstName}{" "}{req.lastName}
                  </Text>
                  <Text fontSize="0.8rem" fontWeight="400">
                    {req.grayId}
                  </Text>
                  <Text fontSize="0.9rem" fontWeight="600" color="gray.600">
                    {req.school?.school?.schoolName}
                  </Text>
                </Flex>
               </Flex>

                <Field name="message">
                  {({ field, form }: any) => (
                    <FormControl mt={5} px={4} isRequired>
                      <FormLabel>Send a note</FormLabel>
                      <Textarea
                      {...field}
                      placeholder="Say Hello"
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
