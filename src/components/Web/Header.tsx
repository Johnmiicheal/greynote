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
import { IoChevronForward } from "react-icons/io5";

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const links = [
    { path: "/features", text: "Features" },
    { path: "/resources", text: "Resources" },
    { path: "/pricing", text: "Pricing" },
  ];

  return (
    <Flex
      display="flex"
      zIndex="1"
      top="0"
      w="full"
      align="center"
      justify="space-between"
      h={16}
    >
      <Flex justify="start" gap={10}>
        <Image src="/gray2full.png" alt="Graybook Logo" w="160px" pointerEvents="none" />
        {links.map((link) => (
          <Button variant="link" key={link.path} color="white" onClick={() => router.push(link.path)}>
            {link.text}
          </Button>
        ))}

      </Flex>
      <Flex justify="end">
          <Button
            variant="solid"
            px={4}
            color="white"
            bg="#F4B95F"
            _hover={{ bg: "#DAA65D" }}
            rightIcon={<IoChevronForward />}
            onClick={() => router.push('/register')}
          >
            Sign up
          </Button>
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
