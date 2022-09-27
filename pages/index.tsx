import React from "react";
import {
  Flex,
  Text,
  Image,
  Icon,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input
} from "@chakra-ui/react";
import Header from "../src/components/Header";
import { IoPersonAddOutline } from "react-icons/io5";
import { AiOutlineFileSearch } from "react-icons/ai";

import { useRouter } from "next/router";
import GrayLayout from "../src/components/GrayLayout";

const Home = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  return (
    <Center>
      <Flex direction="row" justify="space-between" w="full" minH="100vh">
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
            <Text fontSize={24} fontWeight={600} color="black">
              Dashboard
            </Text>
            <Text fontSize={18} fontWeight={500} color="black" mt={10}>
              Welcome to GrayBook
            </Text>
            <Text fontSize={18} fontWeight={400} color="black" mt={2}>
              Try creating a case to start a database.
            </Text>
            <Text fontSize={18} fontWeight={400} color="black" mt={2}>
              You can also search for your candidate, if they have a graybook
              case
            </Text>
            <Flex direction="row" mt={10}>
              <Flex
                bg="white"
                px={4}
                py={10}
                h="100px"
                w="300px"
                borderRadius="md"
                align="center"
                cursor="pointer"
                role="group"
                _hover={{ borderWidth: "1px", borderColor: "gray.400" }}
                onClick={onOpen}
              >
                <Flex
                  color="#8E6930"
                  bg="#FFCE83"
                  borderRadius="full"
                  p={3}
                  mr={1}
                >
                  <Icon as={IoPersonAddOutline} w={7} h={7} />
                </Flex>
                <Text>Create a graybook case</Text>
              </Flex>

              <Flex
                bg="white"
                ml={10}
                px={4}
                py={10}
                h="100px"
                w="300px"
                borderRadius="md"
                align="center"
                cursor="pointer"
                role="group"
                _hover={{ borderWidth: "1px", borderColor: "gray.400" }}
              >
                <Flex
                  color="#343434"
                  bg="#979797"
                  borderRadius="full"
                  p={3}
                  mr={1}
                >
                  <Icon as={AiOutlineFileSearch} w={7} h={7} />
                </Flex>
                <Text>Search for a candidate</Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>

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
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input ref={initialRef} placeholder='First name' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input placeholder='Last name' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Grade Class</FormLabel>
              <Input placeholder='Grade Class' />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} type='submit'>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
};

export default Home;
