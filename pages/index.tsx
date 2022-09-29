import React from "react";
import {
  Flex,
  Text,
  Image,
  Icon,
  Center,
  Modal,
  Select,
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
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import Header from "../src/components/Header";
import { IoPersonAddOutline } from "react-icons/io5";
import { AiOutlineFileSearch } from "react-icons/ai";

import { useRouter } from "next/router";
import GrayLayout from "../src/components/GrayLayout";
import {fakedb, fakecase, fakegender} from "fakedata.ts";

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
              Try registering a student to start a database.
            </Text>
            <Text fontSize={18} fontWeight={400} color="black" mt={2}>
              You can also search for a student, if they have a graybook
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
                <Text>Register a Student</Text>
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
                <Text>Search Database</Text>
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
              <Input ref={initialRef} placeholder='First name' focusBorderColor='#F4B95F' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input placeholder='Last name' focusBorderColor='#F4B95F' />
            </FormControl>

            <Flex direction="row">
            <FormControl mt={4}>
              <FormLabel>Age</FormLabel>
              <NumberInput w={40}>
                <NumberInputField placeholder="15" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Gender</FormLabel>
              <Select placeholder="Select Gender" w={40} focusBorderColor='#F4B95F'>
                {fakegender.map((p, i) => (
                  <option key={i}>{p}</option>
                ))}
              </Select>
            </FormControl>
            </Flex>

            <Flex direction="row">
            <FormControl mt={4}>
              <FormLabel>Grade Class</FormLabel>
              <Select placeholder="Select Grade" w={40} focusBorderColor='#F4B95F'>
                {fakedb.map((p) => (
                  <option key={p.grade}>Grade {p.grade} </option>
                ))}
              </Select>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Graybook Case</FormLabel>
              <Select placeholder="Select Case" w={40} focusBorderColor='#F4B95F'>
                {fakegender.map((p, i) => (
                  <option key={i}>{p}</option>
                ))}
              </Select>
            </FormControl>
            </Flex>

          </ModalBody>

          <ModalFooter>
            <Button bg="#F4B95F"
          color="white"
          _hover={{ bg: "#DAA65D" }} mr={3} type='submit'>
              Create
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </Center>
  );
};

export default Home;
