import React from "react";
import { Flex, Icon, IconButton, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { IoSearch } from "react-icons/io5";
import { AiFillHome, AiFillProfile, AiOutlineHome, AiOutlineProfile } from "react-icons/ai";
import { RiContactsBookFill, RiContactsBookLine } from "react-icons/ri";

export const Nav = () => {
    const router = useRouter();
    const links = [
        { path: "/app", iconActive: AiFillHome, iconInactive: AiOutlineHome, text: "Home" },
        { path: "/app/graycase", iconActive: RiContactsBookFill, iconInactive: RiContactsBookLine, text: "Graycase", isAdmin: true },
        { path: "/app/search", iconActive: IoSearch, iconInactive: IoSearch, text: "Search" },
        { path: "/app/database", iconActive: AiFillProfile, iconInactive: AiOutlineProfile, text: "My Database", isAdmin: true },
      ];
    return(
        <Flex
        bottom={5}
        pos="fixed"
        w="full"
        h="6dvh"
        p={2}
        zIndex={2}
        align="center"
        bg="white"
        >
            {links.map((link) => (
        <Flex
          key={link.text}
          direction="column"
          mt={7}
          w="full"
          align="center"
          role="group"
          borderRadius="md"
          cursor="pointer"
          color={router.pathname === link.path ? "#F4B95F": "#A5A5A5"}
          onClick={() => router.push(link.path)}
          
        >
          <Icon as={router.pathname === link.path ? link.iconActive : link.iconInactive} w={6} h={6} mb={2} />
          <Text fontSize={11} fontWeight={router.pathname === link.path ? 500 : 400}>
            {link.text}
          </Text>
        </Flex>
      ))}
        </Flex>
    )
}