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
} from "@chakra-ui/react";
import { IoChevronForward } from "react-icons/io5";
import Head from "next/head";
import Footer from "./Footer";
import { useRouter } from "next/router";
import { row1, row2 } from "../../../fakedata";

const LandingPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Graybook - Simplifying Student Management</title>
        <link rel="shortcut icon" href="/gray2logo.png" />
      </Head>

      <Flex direction="column">
        <Center
          bgImg="/web/graybgg.png"
          bgRepeat="no-repeat"
          bgSize="cover"
          overflowX="hidden"
          mb={20}
        >
          <Flex direction="column">
            <Header />
            <Flex justify="space-between" pt="4em">
              <Flex direction="column" textAlign="start" justify="center">
                <Heading
                  w="600px"
                  fontSize="4rem"
                  textStyle="text"
                  color="white"
                >
                  Simplify Student Management with
                  <br />
                  <Text
                    bgGradient="linear(75deg, #8E6930, #000a16)"
                    bgClip="text"
                    fontSize="6xl"
                    fontWeight="extrabold"
                    textStyle="text"
                  >
                    Graybook
                  </Text>
                </Heading>
                <Text mt="24px" w="35rem" textStyle="text">
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
                  onClick={() => router.push("/register")}
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
          <Flex direction="column">
            <Text
              fontSize="2rem"
              color="#8E6930"
              px={80}
              fontWeight={600}
              textStyle="text"
              textAlign="center"
              mb={5}
            >
              We created Graybook to help you manage your students the{" "}
              <u>simple</u> way
            </Text>
            <Flex gap="5" px={40}>
              <VStack spacing="4">
                {row1.map((item, i) => (
                  <Flex align="center" key={i}>
                    <Box>
                      <Image src={item.img} alt={item.title} />
                    </Box>
                    <Flex direction="column" w="35rem" gap={2}>
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
              <VStack spacing="4">
                {row2.map((item, i) => (
                  <Flex align="center" key={i}>
                    <Box>
                      <Image src={item.img} alt={item.title} />
                    </Box>
                    <Flex direction="column" w="35rem" gap={2}>
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
        <Center bgImg="/web/line.png" mt={20} mb={20}>
          <Flex direction="column">
            <Text
              fontSize="2rem"
              color="#8E6930"
              px={80}
              fontWeight={600}
              textStyle="text"
              textAlign="center"
              mb={5}
            >
              What can I do with <u>Graybook</u>?
            </Text>
            <Flex direction="row" justify="space-between">
              <Flex
                direction="column"
                textAlign="start"
                justify="center"
                bg="white"
              >
                <Heading fontSize="1.7rem" textStyle="text" color="#F4B95F">
                  Register Students
                </Heading>
                <Text mt="24px" w="30rem" textStyle="text">
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

            <Flex direction="row" justify="space-between" mt={20}>
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
                textAlign="start"
                justify="center"
                bg="white"
              >
                <Heading fontSize="1.7rem" textStyle="text" color="#F4B95F">
                  View & Search Students
                </Heading>
                <Text mt="24px" w="30rem" textStyle="text">
                  GrayBook provides quick and efficient access to student
                  information through advanced search capabilities. Our platform
                  allows you to view complete student profiles and receive
                  real-time updates on academic results and behavior. With
                  GrayBook, school management becomes a streamlined and
                  organized process.
                </Text>
              </Flex>
            </Flex>

            <Flex direction="row" justify="space-between" mt={20}>
              <Flex
                direction="column"
                textAlign="start"
                justify="center"
                bg="white"
              >
                <Heading
                  fontSize="1.7rem"
                  textStyle="text"
                  color="#F4B95F"
                  w="35rem"
                >
                  Request & Transfer Student Details
                </Heading>
                <Text mt="24px" w="30rem" textStyle="text">
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
        <Center
          bgImg="/web/section4.png"
          bgRepeat="no-repeat"
          bgSize="cover"
        >
          <Flex direction="column" justify="start" mt={20}>
            <Text
              fontSize="2rem"
              color="#8E6930"
              fontWeight={600}
              textStyle="text"
              mb={5}
            >
              Bringing <u>simplicity</u> to school management
            </Text>
            <Text w="50rem" textStyle="text" fontSize="1.1rem">
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
                  onClick={() => router.push("/register")}
                >
                  Learn more
                </Button>

            <Box
              py={10}
              px={20}
              mt="40"
              mb="40"
              bgImg="/web/webcard.png"
              h="350px"
              w="1160px"
              borderRadius="md"
              boxShadow="md"
            >
              <Heading
                fontSize="2rem"
                textStyle="text"
                color="#FFFFFF"
                w="480px"
              >
                The simplest way to manage your students details
              </Heading>
              <Text mt="24px" color="white" w="440px" textStyle="text">
                At GrayBook, we're committed to providing our users with the
                best possible experience. If you need help with any aspect of
                our platform, our support team is here to assist you.
              </Text>
              <Button
                variant="solid"
                w="200px"
                mt="30px"
                px={2}
                color="#F4B95F"
                bg="white"
                _hover={{ bg: "#FFEACA" }}
                onClick={() =>
                  (window.location.href = "mailto:graybookacc@gmail.com")
                }
              >
                Contact Us
              </Button>
            </Box>
          </Flex>
        </Center>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>GrayBook - Coming Soon</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Alert
              status="info"
              variant="left-accent"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              height="200px"
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

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Flex minW="full">
        <Footer />
      </Flex>
    </>
  );
};

export default LandingPage;
