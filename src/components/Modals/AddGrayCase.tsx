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
  useDisclosure,
  Button,
  Flex,
  Select,
  useToast,
  Textarea,
  InputGroup,
  InputLeftElement,
  Icon,
  InputLeftAddon,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { fakecase } from "../../../fakedata";
import { useRouter } from "next/router";
import { useAddGrayCaseMutation } from "../../gql/graphql";

export const AddGrayCase = ({ isOpen, onClose, id }: any) => {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const router = useRouter();
  const toast = useToast();
  const [, create] = useAddGrayCaseMutation();

  const [greyCase, setGreyCase] = useState("");
  const handleStateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setGreyCase(value);
  };
  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a Graycase</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Formik
            initialValues={{
              studentId: id,
              category: "",
              note: "",
              amount: 0,
            }}
            onSubmit={async (values, { setErrors }) => {
              console.log(values);
              const response = await create({
                studentId: id,
                category: values.category,
                note: values.note,
              });
              if (response.error) {
                toast({
                  title: "Oops, an error",
                  description: "We could not add the case to the student",
                  status: "error",
                  variant: "left-accent",
                  duration: 5000,
                  isClosable: true,
                });
                setTimeout(() => {
                  router.reload();
                }, 1000);
              } else if (response.data?.addGrayCase?.grayCase) {
                toast({
                  title: "Student case added successfully.",
                  description: `We have added ${values.category} to the student`,
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
                <Field name="category">
                  {({ field, form }: any) => (
                    <FormControl mt={1} px={4}>
                      <FormLabel>Graybook Case</FormLabel>
                      <Select
                        {...field}
                        placeholder="Select Case"
                        w="full"
                        focusBorderColor="#F4B95F"
                      >
                        {fakecase.map((p, i) => (
                          <option key={i} value={p}>
                            {p}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                </Field>

                <Field name="note">
                  {({ field, form }: any) => (
                    <FormControl mt={3} px={4}>
                      <FormLabel>Short Note</FormLabel>
                      <Textarea
                        {...field}
                        placeholder="Short note about the case"
                        w="full"
                        focusBorderColor="#F4B95F"
                        maxLength={300}
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
