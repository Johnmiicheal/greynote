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
  useDisclosure,
  Button,
  Flex,
  Select,
  useToast,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { fakegender, fakeclass, fakecase } from "../../../fakedata";
import { useRouter } from "next/router";
import { useCreateNewGrayCaseMutation } from "../../gql/graphql";

export const NewGrayCase = ({ isOpen, onClose }: any) => {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const router = useRouter();
  const toast = useToast();
  const [, create] = useCreateNewGrayCaseMutation();
  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create a case</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Formik
            initialValues={{
              firstname: "",
              lastname: "",
              ageInput: 0,
              gender: "",
              gradeClass: "",
              grayCase: "",
            }}
            onSubmit={async (values, { setErrors }) => {
              console.log(values);
              const response = await create({
                ageInput: values.ageInput,
                gradeClass: values.gradeClass,
                gender: values.gender,
                lastName: values.lastname,
                firstName: values.firstname,
                category: values.grayCase,
              });
              if (response.data?.createNewGrayCase?.errors) {
                toast({
                  title: "Error.",
                  description: "We could not create the graycase",
                  status: "error",
                  variant: "left-accent",
                  duration: 5000,
                  isClosable: true,
                });
                setTimeout(() => {
                  router.reload();
                }, 1000);
              } else if (response.data?.createNewGrayCase?.grayCase) {
                toast({
                  title: "Student registerd Successfully.",
                  description: "We've registered your Student for you.",
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
                <Field name="firstname">
                  {({ field, form }: any) => (
                    <FormControl isRequired>
                      <FormLabel>First Name</FormLabel>
                      <Input
                        ref={initialRef}
                        {...field}
                        placeholder="First Name"
                        focusBorderColor="#F4B95F"
                      />
                    </FormControl>
                  )}
                </Field>

                <Field name="lastname">
                  {({ field, form }: any) => (
                    <FormControl isRequired>
                      <FormLabel>Last Name</FormLabel>
                      <Input
                        {...field}
                        placeholder="Last Name"
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
                            <option value={p} key={i}>{p}</option>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  </Field>
                </Flex>

                <Flex direction="row">
                  <Field name="gradeClass">
                    {({ field, form }: any) => (
                      <FormControl mt={4} isRequired>
                        <FormLabel>Grade Class</FormLabel>
                        <Select
                          {...field}
                          placeholder="Select Grade"
                          w={40}
                          focusBorderColor="#F4B95F"
                        >
                          {fakeclass.map((p, i) => (
                            <option value={p} key={i}>{p}</option>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="grayCase">
                    {({ field, form }: any) => (
                      <FormControl mt={4} isRequired>
                        <FormLabel>Graybook Case</FormLabel>
                        <Select
                          {...field}
                          placeholder="Select Case"
                          w={40}
                          focusBorderColor="#F4B95F"
                        >
                          {fakecase.map((p, i) => (
                            <option key={i}>{p}</option>
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
                    type="submit"
                  >
                    Create
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
