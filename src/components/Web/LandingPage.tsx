import React from "react";
import Header from "./Header";
import { WebLayout } from "./WebLayout";
import {
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
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { Player } from "@lottiefiles/react-lottie-player";
import Footer from "./Footer";

const LandingPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <WebLayout>
      <Flex direction="column" mt="20" w="full" px="10px">
        <Flex justify="space-between" minH="80vh" pt="76px">
          <Flex direction="column" textAlign="start">
            <Heading w="500px" fontSize="3rem" textStyle="text" color="#F4B95F">
              Simplify Student Management with
              <br /> Graybook
            </Heading>
            <Text mt="24px" w="80" textStyle="text">
              Register, view and transfer students details with ease
            </Text>
            <Button
              variant="solid"
              w="200px"
              mt="30px"
              px={2}
              color="white"
              bg="#F4B95F"
              _hover={{ bg: "#DAA65D" }}
              onClick={onOpen}
            >
              Join Graybook
            </Button>
          </Flex>
          <Flex mt={-16}>
            <Player
              autoplay
              loop
              src="/web/bouncing.json"
              style={{ width: "500px", height: "500px" }}
            />
            {/* <Image src="/graylogo.png" alt="gray art" w="330px" h="330px" /> */}
          </Flex>
        </Flex>
        {/* SECTION 2*/}
        <Flex mt="120px" direction="column">
          <Flex direction="row" justify="space-between">
            <Flex direction="column" textAlign="start">
              <Heading fontSize="2.5rem" textStyle="text" color="#F4B95F">
                Register Students
              </Heading>
              <Text mt="24px" w="80" textStyle="text">
                At GrayBook, we make registering students a breeze. Our
                easy-to-use platform allows you to quickly and efficiently
                register new students in just a few simple steps. With our app,
                you can enter important information such as their name, contact
                information, academic history, and more. Plus, you can also
                upload a profile picture for each student, giving you a visual
                representation of your student body.
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

          <Flex direction="row" justify="space-between" mt={40}>
            <Flex>
              <Image
                src="/web/grayview.png"
                alt="View student profile"
                w="330px"
                h="330px"
              />
            </Flex>
            <Flex direction="column" textAlign="start">
              <Heading fontSize="2.5rem" textStyle="text" color="#F4B95F">
                View & Search
                <br /> Students
              </Heading>
              <Text mt="24px" w="80" textStyle="text">
                GrayBook provides quick and efficient access to student
                information through advanced search capabilities. Our platform
                allows you to view complete student profiles and receive
                real-time updates on academic results and behavior. With
                GrayBook, school management becomes a streamlined and organized
                process.
              </Text>
            </Flex>
          </Flex>

          <Flex direction="row" justify="space-between" mt={40}>
            <Flex direction="column" textAlign="start">
              <Heading
                fontSize="2.5rem"
                textStyle="text"
                color="#F4B95F"
                w="80"
              >
                Request & Transfer Student Details
              </Heading>
              <Text mt="24px" w="80" textStyle="text">
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

          <Box
            px={10}
            py={4}
            mt="40"
            mb="40"
            bgImg="/gray4book.png"
            h="280px"
            w="1020px"
            borderRadius="md"
            boxShadow="md"
          >
            <Heading fontSize="2rem" textStyle="text" color="#FFFFFF" w="480px">
              The simplest way to manage your students details
            </Heading>
            <Text mt="24px" color="white" w="440px" textStyle="text">
              At GrayBook, we're committed to providing our users with the best
              possible experience. If you need help with any aspect of our
              platform, our support team is here to assist you.
            </Text>
            <Button
              variant="solid"
              w="200px"
              mt="30px"
              px={2}
              color="#F4B95F"
              bg="white"
              _hover={{ bg: "#FFEACA" }}
              onClick={ () => window.location.href="mailto:graybookacc@gmail.com"}
            >
              Contact Us
            </Button>
          </Box>
        </Flex>
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
      
    </WebLayout>
    <Flex minW="full">
        <Footer />
      </Flex>
    </>
  );
};

export default LandingPage;
