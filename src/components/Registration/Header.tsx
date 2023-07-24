import { Flex, Image, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

export default function Header({ onOpen, ...rest }: any) {
  const router = useRouter();
  const [label, setLabel] = React.useState("");
  const [route, setRoute] = React.useState("");
  return (
    <Flex
      display="flex"
      zIndex="3"
      px={{ base: 4, md: 4, lg: "40px" }}
      top="0"
      bg="white"
      w="full"
      position="fixed"
      h={16}
      alignItems="center"
      justifyContent={{ base: "space-between", md: "space-between" }}
      boxShadow="md"
      {...rest}
    >
      <Flex
        justify="flex-start"
        onClick={() => router.push("/")}
        cursor="pointer"
      >
        <Image
          src="/icons/greyfull.png"
          alt="graybook logo"
          w={{ base: 24, md: 28, lg: '9rem' }}
          pointerEvents="none"
        />
      </Flex>

      <Flex justify="flex-end">
        <Button
          px={{ base: 2, lg: 8 }}
          py={5}
          fontSize={{ base: 12, md: 14, lg: 16}}
          borderWidth={1}
          borderColor="#FFBF5C"
          bg="#FFFFFF"
          color="#FFBF5C"
          _hover={{ bg: "#FFBF5C", color: "#FFFFFF" }}
          onClick={() =>
            router.push(router.pathname === "/login" ? "/register" : "/login")
          }
        >
          {router.pathname === "/login"
            ? "Create an Account"
            : "Login to Account"}
        </Button>
      </Flex>
    </Flex>
  );
}
