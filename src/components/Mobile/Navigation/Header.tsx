import {
    Input,
    InputLeftElement,
    InputGroup,
    Flex,
    useDisclosure,
  } from "@chakra-ui/react";
  import UserProfile from "../../UserProfile";
  import { useRouter } from "next/router";
  
  export default function Header({ onOpen, ...rest }: any) {
    const router = useRouter();  
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
        bg="#FFF0D9"
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
  