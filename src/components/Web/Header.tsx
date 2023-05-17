import {
  Flex,
  Image,
  Button,
  Text,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
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
  IconButton,
} from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";
import { IoChevronForward, IoMenu } from "react-icons/io5";
import { useMeQuery } from "../../gql/graphql";

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();
  const [{ data }] = useMeQuery();
  const admin = data?.me?.admin!;
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
        <Image
          src="/gray2full.png"
          alt="Graybook Logo"
          w="160px"
          pointerEvents="none"
        />
        {links.map((link) => (
          <Button
            display={{ base: "none", md: "flex" }}
            variant="link"
            key={link.path}
            color="white"
          >
            {link.text}
          </Button>
        ))}
      </Flex>
      <Flex justify="end" ml={10} display={{ base: "none", md: "flex" }}>
        <Button
          variant="solid"
          px={4}
          color="white"
          bg="#F4B95F"
          _hover={{ bg: "#DAA65D" }}
          rightIcon={<IoChevronForward />}
          onClick={() => {
            admin ? router.push("/app") : router.push("/register");
          }}
        >
          Dashboard
        </Button>
      </Flex>

      <Flex justify="end" display={{ base: "flex", md: "none" }}>
        <IconButton
          variant="ghost"
          aria-label="menu"
          icon={<IoMenu />}
          onClick={onDrawerOpen}
        />
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

      <Drawer isOpen={isDrawerOpen} placement="right" onClose={onDrawerClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>

          <DrawerBody>
            <Text>Links are under construction...</Text>
          </DrawerBody>

          <DrawerFooter>
            <Button
              variant="outline"
              colorScheme="yellow"
              mr={3}
              onClick={onDrawerClose}
            >
              Cancel
            </Button>
            <Button colorScheme="yellow">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default Header;
