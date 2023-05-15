import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Center,
  Flex,
  Image,
  Text,
  Avatar,
  Button,
  useDisclosure,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  useMeQuery,
  useUpdateSchoolDetailsMutation,
  useUpdateAdminDetailsMutation,
  useGetSchoolByNameQuery,
} from "../../src/gql/graphql";
import { Formik, Form, Field } from "formik";
import BarLoader from "react-spinners/BarLoader";
import Header from "../../src/components/Header";
import GrayLayout from "../../src/components/GrayLayout";
import FileBase from "react-file-base64";
import { toDate, format } from "date-fns";
import { useRouter } from "next/router";
import { EditSchool } from "../../src/components/Modals/EditSchool";

const Settings = () => {
  const [{ data: me, fetching }] = useMeQuery();
  const getAdmin = me?.me?.admin!;
  const [{ data: school, fetching: loading }] = useGetSchoolByNameQuery({
    variables: {
      schoolName: me?.me?.admin?.school!,
    },
  });
  const getSchool = school?.getSchoolByName?.school!;
  const [, updateSchool] = useUpdateSchoolDetailsMutation();
  const [, updateAdmin] = useUpdateAdminDetailsMutation();
  const toast = useToast();
  const router = useRouter();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const {
    isOpen: isSchoolOpen,
    onOpen: onSchoolOpen,
    onClose: onSchoolClose,
  } = useDisclosure();
  let d = new Date(school?.getSchoolByName?.school?.createdAt!);
  let dd = toDate(parseInt(me?.me?.admin?.createdAt!));
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  type State = {
    image: string;
  };
  const [data, setData] = useState<State>({
    image: getAdmin?.profileImgUrl!,
  });

  let page = null;
  if (fetching && loading) {
    page = (
      <Center>
        <Box minW="full" mt={{ base: 60, md: 60, lg: 40 }}>
          <Flex
            direction="column"
            align="center"
            minW={{ base: "full", lg: "650px" }}
          >
            <Image src="/graylogo.png" alt="zlogo" w={40} mb={3} />
            <BarLoader color="#ffd880" width="150px" />
          </Flex>
        </Box>
      </Center>
    );
  } else if (me?.me?.admin) {
    page = (
      <Center>
        <Flex justify="space-between" w="full" minH="100vh">
          <Flex direction="column">
            <GrayLayout />
          </Flex>

          <Flex
            direction="column"
            ml="130px"
            w="full"
            px={{ base: 4, md: 4, lg: 10 }}
          >
            <Header />
            <Flex
              direction="column"
              bg="#CBCBCB"
              h="full"
              mt="5"
              borderRadius="20px 20px 0 0 "
              py={5}
              px={10}
            >
              <Text fontSize={24} fontWeight={600} color="#212121">
                Settings
              </Text>
              <Tabs mt={5} colorScheme="yellow" borderColor="#BBBBBB">
                <TabList>
                  <Tab fontWeight={600} color="#212121">
                    School Settings
                  </Tab>
                  <Tab fontWeight={600} color="#212121">
                    Admin Profile
                  </Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
                    <Flex p={4} direction="column" bg="white" borderRadius="md">
                      <Flex direction="column">
                        <Box
                          w="full"
                          h="150px"
                          bgImg={school?.getSchoolByName?.school?.bannerImgUrl}
                          borderRadius="7px 7px 0 0"
                          overflow="hidden"
                          bgSize="cover"
                          bgPos="center"
                          bgRepeat="no-repeat"
                        ></Box>
                        <Flex gap={4} mt={-7} ml={4}>
                          <Avatar
                            src={school?.getSchoolByName?.school?.logoImgUrl}
                            size="xl"
                            border="5px solid white"
                            cursor="pointer"
                            onClick={onSchoolOpen}
                          />
                          <Flex direction="column" mt={7}>
                            <Text
                              fontSize={24}
                              fontWeight={600}
                              color="#212121"
                            >
                              {school?.getSchoolByName?.school?.schoolName}
                            </Text>
                            <Text
                              fontSize={18}
                              fontWeight={500}
                              color="#878787"
                            >
                              Created since {d.toDateString()}
                            </Text>
                          </Flex>
                        </Flex>
                      </Flex>

                      <Flex
                        bg="#212121"
                        borderRadius="md"
                        p={4}
                        direction="column"
                        mt={10}
                        gap={6}
                      >
                        <Flex justify="space-between" align="center">
                          <Text fontSize={18} fontWeight={700} color="#898989">
                            SCHOOL NAME
                            <Text fontSize={18} fontWeight={400} color="white">
                              {school?.getSchoolByName?.school?.schoolName}
                            </Text>
                          </Text>
                        </Flex>

                        <Flex justify="space-between" align="center">
                          <Text fontSize={18} fontWeight={700} color="#898989">
                            RC NUMBER
                            <Text fontSize={18} fontWeight={400} color="white">
                              {school?.getSchoolByName?.school?.rcnumber}
                            </Text>
                          </Text>
                          <Button
                            bg="#F4B95F"
                            _hover={{ bg: "#DAA65D" }}
                            color="black"
                            isDisabled
                          >
                            Edit
                          </Button>
                        </Flex>

                        <Flex justify="space-between" align="center">
                          <Text fontSize={18} fontWeight={700} color="#898989">
                            SCHOOL ADDRESS
                            <Text fontSize={18} fontWeight={400} color="white">
                              {school?.getSchoolByName?.school?.address}
                            </Text>
                          </Text>
                          <Button
                            bg="#F4B95F"
                            _hover={{ bg: "#DAA65D" }}
                            color="black"
                            isDisabled
                          >
                            Edit
                          </Button>
                        </Flex>

                        <Flex justify="space-between" align="center">
                          <Text fontSize={18} fontWeight={700} color="#898989">
                            DESCRIPTION
                            <Text fontSize={18} fontWeight={400} w="55em" noOfLines={2} color="white">
                              {school?.getSchoolByName?.school?.description}
                            </Text>
                          </Text>
                          <Button
                            bg="#F4B95F"
                            _hover={{ bg: "#DAA65D" }}
                            color="black"
                            onClick={onSchoolOpen}
                          >
                            Edit
                          </Button>
                        </Flex>
                      </Flex>

                      <Text mt={10} fontSize={18} fontWeight={700} color="red">
                        DANGER ZONE
                      </Text>
                      <Flex
                        bg="white"
                        border="2px solid red"
                        borderRadius="md"
                        p={4}
                        direction="column"
                        mt={1}
                        gap={6}
                      >
                        <Flex justify="space-between" align="center">
                          <Text fontSize={14} fontWeight={700} color="#212121">
                            Rename School
                            <Text fontSize={14} fontWeight={400} color="#898989">
                              Please note that your school would need to be re-verified to complete this process
                            </Text>
                          </Text>
                          <Button
                            bg="#FF000F"
                            _hover={{ bg: "#FF112F" }}
                            color="white"
                            onClick={onSchoolOpen}
                            fontSize={14}
                          >
                            Rename school
                          </Button>
                        </Flex>

                        <Flex justify="space-between" align="center">
                          <Text fontSize={14} fontWeight={700} color="#212121">
                            Delete this School
                            <Text fontSize={14} fontWeight={400} color="#898989">
                              Note that once deleted, it will be gone forever. Please be certain.
                            </Text>
                          </Text>
                          <Button
                            bg="#FF000F"
                            _hover={{ bg: "#FF112F" }}
                            color="white"
                            onClick={onSchoolOpen}
                            fontSize={14}
                          >
                            Delete this school
                          </Button>
                        </Flex>

                        </Flex>                      
                    </Flex>
                  </TabPanel>
                  <TabPanel>
                    <Flex p={4} direction="column" bg="white" borderRadius="md">
                      <Flex align="center" gap={4}>
                        <Avatar
                          src={me?.me?.admin?.profileImgUrl}
                          size="xl"
                          border="2px solid #FFBF5C"
                          cursor="pointer"
                          onClick={onEditOpen}
                        />
                        <Flex direction="column">
                          <Text fontSize={24} fontWeight={600} mb={1} color="#212121">
                            {me?.me?.admin?.adminName}
                          </Text>
                          <Text fontSize={18} fontWeight={400} color="#212121">
                            {me?.me?.admin?.school}
                          </Text>
                          <Text fontSize={16} fontWeight={500} color="#878787">
                            Created since {format(dd, "PP")}
                          </Text>
                        </Flex>
                      </Flex>

                      <Flex
                        bg="#212121"
                        borderRadius="md"
                        p={4}
                        direction="column"
                        mt={10}
                        gap={6}
                      >
                        <Flex justify="space-between" align="center">
                          <Text fontSize={18} fontWeight={700} color="#898989">
                            ADMIN NAME
                            <Text fontSize={18} fontWeight={400} color="white">
                              {me?.me?.admin?.adminName}
                            </Text>
                          </Text>
                          <Button
                            bg="#F4B95F"
                            _hover={{ bg: "#DAA65D" }}
                            color="black"
                            onClick={onEditOpen}
                          >
                            Edit
                          </Button>
                        </Flex>

                        <Flex justify="space-between" align="center">
                          <Text fontSize={18} fontWeight={700} color="#898989">
                            EMAIL
                            <Text fontSize={18} fontWeight={400} color="white">
                              {me?.me?.admin?.email}
                            </Text>
                          </Text>
                          <Button
                            bg="#F4B95F"
                            _hover={{ bg: "#DAA65D" }}
                            color="black"
                            isDisabled
                          >
                            Edit
                          </Button>
                        </Flex>

                        <Flex justify="space-between" align="center">
                          <Text fontSize={18} fontWeight={700} color="#898989">
                            PHONE NUMBER
                            <Text fontSize={18} fontWeight={400} color="white">
                              {me?.me?.admin?.phoneNumber}
                            </Text>
                          </Text>
                          <Button
                            bg="#F4B95F"
                            _hover={{ bg: "#DAA65D" }}
                            color="black"
                            isDisabled
                          >
                            Edit
                          </Button>
                        </Flex>
                      </Flex>
                    </Flex>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Flex>
          </Flex>
        </Flex>

        <Formik
          initialValues={{
            adminName: me?.me?.admin?.adminName,
            phoneNumber: me?.me?.admin?.phoneNumber,
            email: me?.me?.admin?.email,
            profileImgUrl: me?.me?.admin?.profileImgUrl,
          }}
          onSubmit={async (values, { setErrors }) => {
            const response = await updateAdmin({
              adminName: values.adminName,
              phoneNumber: values.phoneNumber,
              email: values.email,
              profileImgUrl: data.image,
            });
            if (response.error) {
              toast({
                title: "Error.",
                description: "Oops, We could not update this admin profile",
                status: "error",
                variant: "left-accent",
                duration: 5000,
                isClosable: true,
              });
              // setTimeout(() => {
              //   router.reload();
              // }, 1000);
            } else if (response.data?.updateAdminDetails) {
              toast({
                title: "Admin Details Updated",
                description: "We've successfully updated your admin profile",
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
            <Modal
              initialFocusRef={initialRef}
              finalFocusRef={finalRef}
              isOpen={isEditOpen}
              onClose={onEditClose}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Update Admin Profile</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <Form>
                    <Field name="profileImgUrl">
                      {({ field, form }: any) => (
                        <FormControl>
                          <Flex direction="column" align="center">
                            <FormLabel>Upload Profile Image</FormLabel>
                            <Avatar src={data.image} size="xl" mb={1} />
                            <Flex align="center" ml={20}>
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

                    <Field name="adminName">
                      {({ field, form }: any) => (
                        <FormControl>
                          <FormLabel>Admin Name</FormLabel>
                          <Input
                            {...field}
                            ref={initialRef}
                            focusBorderColor="#F4B95F"
                          />
                        </FormControl>
                      )}
                    </Field>

                    <Field name="email">
                      {({ field, form }: any) => (
                        <FormControl mt={4}>
                          <FormLabel>Email Address</FormLabel>
                          <Input
                            isDisabled
                            {...field}
                            type="email"
                            focusBorderColor="#F4B95F"
                          />
                        </FormControl>
                      )}
                    </Field>

                    <Field name="phoneNumber">
                      {({ field, form }: any) => (
                        <FormControl mt={4}>
                          <FormLabel>Phone Number</FormLabel>
                          <Input
                            isDisabled
                            {...field}
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
                      <Button onClick={onEditClose}>Cancel</Button>
                    </Flex>
                  </Form>
                </ModalBody>
              </ModalContent>
            </Modal>
          )}
        </Formik>
        

        {/** EDIT SCHOOL MODAL HERE */}
        <EditSchool s={getSchool} isOpen={isSchoolOpen} onClose={onSchoolClose} />
      </Center>
    );
  }

  return page;
};

export default Settings;
