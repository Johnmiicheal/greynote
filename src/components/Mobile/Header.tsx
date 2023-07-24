import {
    Input,
    InputLeftElement,
    InputGroup,
    Flex,
    useDisclosure,
  } from "@chakra-ui/react";
  import UserProfile from "../UserProfile";
  import { useRouter } from "next/router";
  import { IoSearch } from "react-icons/io5";
  
  export default function Header({ onOpen, ...rest }: any) {
    const router = useRouter();
    const { isOpen: isSearchOpen, onOpen: onSearchOpen, onClose: onSearchClose } = useDisclosure();
  
    return (
      <Flex
        display="flex"
        p={2}
        zIndex="3"
        top="0"
        position="fixed"
        h={14}
        alignItems="center"
        justifyContent="space-between"
        w="full"
        {...rest}
      >
        <Flex justify="flex-start" fontWeight={600} >
         greynote
        </Flex>
  
        <Flex justify="flex-end">
          <UserProfile onOpen={onOpen} />
        </Flex>
        </Flex>
    );
  }
  