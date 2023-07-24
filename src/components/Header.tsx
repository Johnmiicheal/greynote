import {
  Input,
  InputLeftElement,
  InputGroup,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import UserProfile from "./UserProfile";
import { useRouter } from "next/router";
import { IoSearch } from "react-icons/io5";
import { SearchStudent } from "./Modals/SearchStudent";

export default function Header({ onOpen, ...rest }: any) {
  const router = useRouter();
  const { isOpen: isSearchOpen, onOpen: onSearchOpen, onClose: onSearchClose } = useDisclosure();

  return (
    <Flex
      display="flex"
      py={2}
      zIndex="3"
      top="0"
      bg="white"
      position="sticky"
      h={14}
      alignItems="center"
      justifyContent="space-between"
      w="full"
      {...rest}
    >
      <Flex justify="flex-start" >
        <InputGroup onClick={onSearchOpen}>
          <InputLeftElement
            pointerEvents="none">
              {<IoSearch color="#7A7A7A" />}
          </InputLeftElement>
          <Input type="text" borderRadius="full" placeholder="Search" _placeholder={{ color: "#7A7A7A"}} focusBorderColor='#F4B95F' />
        </InputGroup>
      </Flex>

      <Flex justify="flex-end">
        <UserProfile onOpen={onOpen} />
      </Flex>

      <SearchStudent isOpen={isSearchOpen} onClose={onSearchClose} />
    </Flex>
  );
}
