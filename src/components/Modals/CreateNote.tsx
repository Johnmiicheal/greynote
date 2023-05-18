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
  Input,
  Select
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { fakenotes } from "../../../fakedata";
import { useRouter } from "next/router";
import { useCreateNotesMutation, useMeQuery } from "../../gql/graphql";
import { IoCaretDown } from "react-icons/io5";

interface CreateNotesProps{
    isOpen: any,
    onClose: any
}

export const CreateNote: React.FC<CreateNotesProps> = ({ isOpen, onClose}) => {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const router = useRouter();
  const toast = useToast();
  const [, notes] = useCreateNotesMutation();
  const [{ data }] = useMeQuery();
  const admin = data?.me?.admin!;

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Graybook Notes</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Formik
            initialValues={{
              category: "",
              title: "",
              body: ""
            }}
            onSubmit={async (values, { setErrors }) => {
              const response = await notes({
                category: values.category,
                body: values.body,
                title: values.title
              });
              if (response.data?.createNotes.errors) {
                console.log(values)
                console.log(response.error)
                toast({
                  title: "Error",
                  description: `${response.data.createNotes.errors}`,
                  status: "error",
                  variant: "left-accent",
                  duration: 5000,
                  isClosable: true,
                });
                setTimeout(() => {
                  router.reload();
                }, 1000);
              } else if (response.data?.createNotes?.notes) {
                console.log(values)
                toast({
                  title: "Notes saved",
                  description: "We've successfully saved your notes",
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
               <Flex gap="5" bg="gray.100" justify="center" py={2} borderRadius="md" align="center">
                <Avatar src={admin.profileImgUrl} size="lg" />
                <Flex direction="column">
                  <Text textStyle="text" fontSize="1.1rem" fontWeight="500">
                    {admin.adminName}
                  </Text>
                  <Text fontSize="0.9rem" fontWeight="600" color="gray.600">
                    {admin.school}
                  </Text>
                </Flex>
               </Flex>
               <Field name="category">
                    {({ field, form }: any) => (
                      <FormControl mt={1} px={4} isRequired>
                        <FormLabel>Notes Category</FormLabel>
                        <Select
                          {...field}
                          placeholder="Select Case"
                          w="full"
                          focusBorderColor="#F4B95F"
                        >
                          {fakenotes.map((p, i) => (
                            <option key={i}>{p}</option>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  </Field>
               <Field name="title">
                  {({ field, form }: any) => (
                    <FormControl mt={5} px={4} isRequired>
                      <FormLabel>Title</FormLabel>
                      <Input
                      {...field}
                      placeholder="Enter Title"
                      focusBorderColor="#F4B95F"
                      />
                    </FormControl>
                  )}
                </Field>

                <Field name="body">
                  {({ field, form }: any) => (
                    <FormControl mt={5} px={4}>
                      <FormLabel>Body</FormLabel>
                      <Textarea
                      {...field}
                      placeholder="(Optional)"
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
