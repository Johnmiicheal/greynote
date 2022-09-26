import {
  Input,
  InputLeftElement,
  InputGroup,
  Flex,
  Image,
  Box,
  Center,
} from "@chakra-ui/react";
import UserProfile from "./UserProfile";
import { useRouter } from "next/router";
import { IoSearch } from "react-icons/io5";

export default function Header({ onOpen, ...rest }: any) {
  const router = useRouter();
  return (
    <Flex
      display="flex"
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
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<IoSearch color="#7A7A7A" />}
          />
          <Input type="text" placeholder="Search" _placeholder={{ color: "#7A7A7A"}} />
        </InputGroup>
      </Flex>

      <Flex justify="flex-end">
        <UserProfile onOpen={onOpen} />
      </Flex>
    </Flex>
  );
}
