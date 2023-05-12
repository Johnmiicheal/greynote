import React from "react";
import Header from "./Header";
import {
  Center,
  Button,
  Flex,
  Heading,
  Text,
  Image,
  Box,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Alert,
  AlertTitle,
  AlertDescription,
  VStack,
  HStack,
  Stack,
} from "@chakra-ui/react";
import { IoChevronForward } from "react-icons/io5";
import Head from "next/head";
import Footer from "./Footer";
import { useRouter } from "next/router";
import { row1, row2, row3 } from "../../../fakedata";

const LandingPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Graybook - Simplifying Student Management</title>
        <link rel="shortcut icon" href="/gray2logo.png" />
      </Head>

      <Flex direction="column" overflow="hidden">
        <Center
          bgImg="/web/graybgg.png"
          bgRepeat="no-repeat"
          bgSize="cover"
          overflowX="hidden"
          mb={20}
          px={{ base: 5, lg: 0 }}
        >
          <Flex direction="column">
            <Header />
            <Flex
              direction={{ base: "column", lg: "row" }}
              justify="space-between"
              pt="4em"
            >
              <Flex direction="column" textAlign="start" justify="center" maxW={{ base: "sm", md: "md", lg: "lg"}}>
                <Heading
                  w={{ md: "600px" }}
                  fontSize={{ base: "2.5rem", md: "4rem" }}
                  textStyle="text"
                  color="white"
                >
                  Simplify Student Management with
                  <br />
                  <Text
                    bgGradient="linear(75deg, #8E6930, #000a16)"
                    bgClip="text"
                    fontSize={{ md: "6xl" }}
                    fontWeight="extrabold"
                    textStyle="text"
                  >
                    Graybook
                  </Text>
                </Heading>
                <Text mt="24px" textStyle="text">
                  The intuitive platform that streamlines student data,
                  performance monitoring, and communication with parents. Share
                  information effortlessly with other schools. Graybook - the
                  simple solution to school management.
                </Text>
                <Button
                  variant="solid"
                  px={4}
                  mt="24px"
                  w="40"
                  color="white"
                  bg="#F4B95F"
                  _hover={{ bg: "#DAA65D" }}
                  rightIcon={<IoChevronForward />}
                  onClick={onOpen}
                >
                  Join Graybook
                </Button>
              </Flex>
              <Box overflow="hidden" mr={-80}>
                <Image
                  src="/web/graymock.png"
                  alt="graybook_app"
                  pointerEvents="none"
                />
              </Box>
            </Flex>
          </Flex>
        </Center>
        {/* SECTION 2 */}
        <Center
          bgImg="/web/section2.png"
          bgRepeat="no-repeat"
          bgPos="center"
          mt={20}
          mb={20}
        >
          <Flex direction="column" align="center">
            <Text
              fontSize="2rem"
              color="#8E6930"
              px={{ base: 32, md: 20, lg: 80 }}
              fontWeight={600}
              textStyle="text"
              textAlign="center"
              mb={5}
            >
              We created Graybook to help you manage your students the{" "}
              <u>simple</u> way
            </Text>
            <Flex
              direction={{ base: "column", lg: "row" }}
              gap="2"
              w="40rem"
              pr={{ base: 10, lg: 10 }}
            >
              <VStack spacing={{ base: -8, md: "-2" }}>
                {row1.map((item, i) => (
                  <Flex align="center" key={i}>
                    <Box>
                      <Image src={item.img} alt={item.title} />
                    </Box>
                    <Flex direction="column" w={{ base: "12rem", md: "35rem" }} gap={2}>
                      <Text fontWeight={600} fontSize="1.1rem">
                        {item.title}
                      </Text>
                      <Text fontWeight="0.8rem" color="#4C4C4C">
                        {item.desc}
                      </Text>
                    </Flex>
                  </Flex>
                ))}
              </VStack>
              <VStack spacing={{ base: -8, md: "-2" }}>
                {row2.map((item, i) => (
                  <Flex align="center" key={i}>
                    <Box>
                      <Image src={item.img} alt={item.title} />
                    </Box>
                    <Flex direction="column" w={{ base: "12rem", md: "35rem" }} gap={2}>
                      <Text fontWeight={600} fontSize="1.1rem">
                        {item.title}
                      </Text>
                      <Text fontWeight="0.8rem" color="#4C4C4C">
                        {item.desc}
                        {i === 2 && (
                          <>
                            {" "}
                            <Button variant="link" color="#F4B95F">
                              Learn more
                            </Button>
                          </>
                        )}
                      </Text>
                    </Flex>
                  </Flex>
                ))}
              </VStack>
            </Flex>
          </Flex>
        </Center>

        {/* SECTION 3*/}
        <Center
          bgImg="/web/line.png"
          bgSize="auto"
          bgPos="right"
          mt={20}
          mb={20}
        >
          <Flex direction="column" px={{ base: 20, lg: 0 }}>
            <Text
              fontSize="2rem"
              color="#8E6930"
              px={{ base: 10, lg: 80 }}
              fontWeight={600}
              textStyle="text"
              textAlign="center"
              mb={{ base: 16, md: 5 }}
            >
              What can I do with <u>Graybook</u>?
            </Text>
            <Flex
              direction={{ base: "column", lg: "row" }}
              justify="space-between"
              align={{ base: "center", lg: "start" }}
            >
              <Flex
                direction="column"
                textAlign={{ base: "center", lg: "start" }}
                justify="center"
                bg="white"
                mb={{ base: 7, lg: 0 }}
              >
                <Heading fontSize="1.7rem" textStyle="text" color="#F4B95F">
                  Register Students
                </Heading>
                <Text mt="24px" textAlign="justify" w={{ base: "24rem", md: "30rem" }} textStyle="text">
                  At GrayBook, we make registering students a breeze. Our
                  easy-to-use platform allows you to quickly and efficiently
                  register new students in just a few simple steps. With our
                  app, you can enter important information such as their name,
                  contact information, academic history, and more. Plus, you can
                  also upload a profile picture for each student, giving you a
                  visual representation of your student body.
                </Text>
              </Flex>
              <Flex>
                <Image
                  src="/web/grayreg.png"
                  alt="Register students"
                  w="330px"
                  h="330px"
                />
              </Flex>
            </Flex>

            <Flex
              direction={{ base: "column-reverse", lg: "row" }}
              justify="space-between"
              align={{ base: "center", lg: "start" }}
              mt={20}
            >
              <Flex>
                <Image
                  src="/web/grayview.png"
                  alt="View student profile"
                  w="330px"
                  h="330px"
                />
              </Flex>
              <Flex
                direction="column"
                textAlign={{ base: "center", lg: "start" }}
                justify="center"
                bg="white"
                mb={{ base: 7, lg: 0 }}
              >
                <Heading fontSize="1.7rem" textStyle="text" color="#F4B95F">
                  View & Search Students
                </Heading>
                <Text mt="24px" w={{ base: "24rem", md: "30rem" }}  textAlign="justify" textStyle="text">
                  GrayBook provides quick and efficient access to student
                  information through advanced search capabilities. Our platform
                  allows you to view complete student profiles and receive
                  real-time updates on academic results and behavior. With
                  GrayBook, school management becomes a streamlined and
                  organized process.
                </Text>
              </Flex>
            </Flex>

            <Flex
              direction={{ base: "column", lg: "row" }}
              justify="space-between"
              align={{ base: "center", lg: "start" }}
              mt={20}
            >
              <Flex
                direction="column"
                textAlign={{ base: "center", lg: "start" }}
                align="center"
                bg="white"
                mb={{ base: 7, lg: 0 }}
              >
                <Heading
                  fontSize="1.7rem"
                  textStyle="text"
                  color="#F4B95F"
                  w={{ base: "24rem", md: "35rem" }}
                >
                  Request & Transfer Student Details
                </Heading>
                <Text mt="24px" w={{ base: "24rem", md: "32rem" }} textAlign="justify" textStyle="text">
                  GrayBook simplifies student transfers with its secure transfer
                  request system. The platform enables schools to easily and
                  efficiently transfer student records, including academic
                  history, behavior records, and contact information. GrayBook
                  offers a seamless and professional transfer solution.
                </Text>
              </Flex>
              <Flex>
                <Image
                  src="/web/graynew.png"
                  alt="Request for student details"
                  w="330px"
                  h="330px"
                />
              </Flex>
            </Flex>
          </Flex>
        </Center>

        {/* SECTION 4 */}
        <Center bgImg="/web/section4.png" bgRepeat="no-repeat" bgSize="cover">
          <Flex direction="column" justify={{ md: "center" }} maxW={{ base: "sm", md: "md", lg: "lg"}} align={{ md: "center" }} mt={20} >
            <Text
              fontSize="2rem"
              color="#8E6930"
              fontWeight={600}
              textStyle="text"
              mb={5}
            >
              Bringing <u>simplicity</u> to school management
            </Text>
            <Text w={{ base: "24rem", md: "35rem" , lg: "50rem" }} textStyle="text" fontSize="1.1rem">
              At Graybook, we believe that school management doesn't have to be
              complicated. With our simple and intuitive platform, we provide
              schools with the tools they need to manage student data, monitor
              performance, and communicate with parents. Our platform makes it
              easy to share information with other schools, streamlining the
              administrative process and saving valuable time. Say goodbye to
              complicated spreadsheets and frustrating administrative tasks -
              with Graybook, school management has never been simpler.
            </Text>

            <Button
              variant="solid"
              px={4}
              mt="24px"
              w="40"
              color="white"
              bg="#F4B95F"
              _hover={{ bg: "#DAA65D" }}
              rightIcon={<IoChevronForward />}
            >
              Learn more
            </Button>

            <Box
              py={{ base: 2, md: 10 }}
              px={{ base: 5, md: 20 }}
              mt="40"
              mb={{ md: "40" }}
              bgImg="/web/webcard.png"
              h="350px"
              w={{ base: 'sm', md: '630px', lg: "1160px" }}
              borderRadius="md"
              boxShadow="md"
            >
              <Heading
                fontSize="2rem"
                textStyle="text"
                color="#8E6930"
                w={{ base: "20rem", lg: "480px "}}
              >
                The simplest way to manage your students details
              </Heading>
              <Text mt="24px" color="#000" w={{ lg: "440px" }} textStyle="text">
                At GrayBook, we're committed to providing our users with the
                best possible experience. If you need help with any aspect of
                our platform, our support team is here to assist you.
              </Text>
              <Button
                variant="solid"
                w="200px"
                mt="30px"
                px={2}
                color="#FFF"
                bg="#8E6930"
                _hover={{ bg: "#9E6930" }}
                onClick={() =>
                  (window.location.href = "mailto:graybookacc@gmail.com")
                }
              >
                Contact Us
              </Button>
            </Box>
          </Flex>
        </Center>

        {/* SECTION 5 */}

        <Center
          bgImg="/web/section5.png"
          bgRepeat="no-repeat"
          bgSize="cover"
          minH={{ base: "70rem", md: "35rem" }}
          mb={{ lg: 20 }}
        >
          <Flex maxW={{ base: "sm", md: "md", lg: "lg"}} direction={{ base: "column", lg: "row" }} justify="space-between" mt={{ md: -20 }} gap={24}>
            <Flex direction="column" align="center">
              <Text
                fontSize="2rem"
                color="#8E6930"
                fontWeight={600}
                textStyle="text"
                mb={5}
              >
                Ready to get started?
              </Text>
              <Text w={{ base: "20rem", md: "30rem" }} textStyle="text" fontSize="1.1rem">
                Create an account, register your school and start exploring. You
                can also contact us for any enquiries
              </Text>
              <Flex gap={5}>
                <Button
                  variant="solid"
                  px={4}
                  mt="24px"
                  w="40"
                  color="white"
                  bg="#F4B95F"
                  _hover={{ bg: "#DAA65D" }}
                  rightIcon={<IoChevronForward />}
                  onClick={onOpen}
                >
                  Sign up
                </Button>
                <Button
                  variant="link"
                  px={4}
                  mt="24px"
                  w="40"
                  color="#F4B95F"
                  _hover={{ color: "#DAA65D" }}
                  rightIcon={<IoChevronForward />}
                  onClick={() =>
                    (window.location.href = "mailto:graybookacc@gmail.com")
                  }
                >
                  Contact Support
                </Button>
              </Flex>
            </Flex>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={{ base: 8, md: 10 }}>
              {row3.map((item, i) => (
                <Flex
                  direction="column"
                  align="center"
                  key={i}
                  gap={3}
                >
                  <Box>
                    <Image src={item.img} alt={item.title} w={{ base: "4rem" }} />
                  </Box>
                  <Text
                    w="10rem"
                    textAlign="center"
                    fontWeight={600}
                    fontSize="1.1rem"
                  >
                    {item.title}
                  </Text>
                </Flex>
              ))}
            </Stack>
          </Flex>
        </Center>

        <Center pb={20}>
          <Flex direction="column" align="center">
            <Box mt={{ base: -32, lg: -60 }}>
              <Image
                src="/web/gray2mock.png"
                pointerEvents="none"
                alt="use_graybook_beta"
                w="50rem"
              />
            </Box>
            <Text color="#7A7A7A">Free 7 days trial | Exclusive support</Text>
          </Flex>
        </Center>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>GrayBook - Scheduled Maintainance</ModalHeader>
          <ModalCloseButton />
          <ModalBody mb={7}>
            <Alert
              status="info"
              variant="left-accent"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              height="200px"
              colorScheme="yellw"
            >
              <AlertTitle mb={1} fontSize="lg">
                Hi there👋
              </AlertTitle>
              <AlertDescription maxWidth="sm">
                We are working hard and fast to bring you a seamless experience.
                Don't worry, we'll be back and better than ever before you know
                it🚀
              </AlertDescription>
            </Alert>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Flex minW="full">
        <Footer />
      </Flex>
    </>
  );
};

export default LandingPage;
