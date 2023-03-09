import {
  Flex,
  Image,
  Button,
  Text,
  ButtonGroup,
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
} from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  return (
    <Flex
      display="flex"
      px={10}
      zIndex="1"
      top="0"
      position="fixed"
      boxShadow="md"
      w="full"
      align="center"
      justify="space-between"
      h={16}
      bg="white"
    >
      <Flex justify="start" pointerEvents="none">
        <Image src="/grayfull.png" alt="Graybook Logo" w="160px" />
      </Flex>
      <Flex justify="end">
        <ButtonGroup>
          <Button
            variant="unstyled"
            color="#F4B95F"
            mr="30px"
            _hover={{ color: "#DAA65D" }}
            onClick={() => router.push('/login')}
          >
            Sign In
          </Button>
          <Button
            variant="solid"
            px={2}
            color="white"
            bg="#F4B95F"
            _hover={{ bg: "#DAA65D" }}
            onClick={() => router.push('/register')}
          >
            Join Graybook
          </Button>
        </ButtonGroup>
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
    </Flex>
  );
};

export default Header;
