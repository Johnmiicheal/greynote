import {
  IconButton,
  Avatar,
  Box,
  Flex,
  HStack,
  Heading,
  Text,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  MenuGroup,
  Badge,
  VStack,
  AvatarBadge,
  Button,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";

import NextLink from "next/link";
import {
  IoCaretDown, IoEllipsisHorizontal
} from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { FiSettings, FiBookmark, FiLogOut } from "react-icons/fi";
import { RiContactsBookLine } from "react-icons/ri";
import React from "react";
import { useRouter } from "next/router";
import { useMeQuery, useLogoutUserMutation } from "../gql/graphql";
import { SearchStudent } from "./Modals/SearchStudent";

export default function UserProfile({ onOpen, ...rest }: { onOpen: any }) {
  const router = useRouter();
  const [{ data: me }] = useMeQuery();
  const [,logout] = useLogoutUserMutation();
  function handleLogout(){
    logout({});
    router.push('/');
  }

  return (
    <HStack spacing={{ base: "0", md: "3" }} ml={1}>
      <Flex display={{ base: "none", md: "flex" }}>
        <Flex
          _hover={{ bg: "#E6E6E6", color: "#000a16" }}
          border="1px solid #E6E6E6"
          borderRadius="full"
          pr={3}
          bg={{ base: "none", md: "none" }}
          minW={{ base: 0, md: 40 }}
          h={{ base: 0, md: 12 }}
          display={me?.me?.admin ? 'block' : 'none' }
          align='center'
        >
          <Menu>
            <MenuButton
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
              py={1}
            >
              <Flex
                align="center"
                cursor="pointer"
                display={{ base: "none", md: "flex" }}
                pr={2}
              >
                <Avatar name={me?.me?.admin?.school!} src={me?.me?.admin?.schoolImg} size="sm" ml={1} mr={1} border="1px solid #FFCE83" />
                <Flex
                  direction="column"
                  textAlign="start"
                  justify="center"
                  display={{ base: "none", md: "flex" }}
                  gap="1px"
                >
                  <Text fontWeight={600} fontSize="0.9em">
                  {me?.me?.admin?.school} 
                  </Text>
                  <Text fontWeight={400} fontSize="0.6em">
                    @{me?.me?.admin?.adminName}
                  </Text>
                </Flex>
                {/* <Box ml={3} display={{ base: "none", md: "flex" }}>
                  <IoEllipsisHorizontal />
                </Box> */}
              </Flex>
            </MenuButton>
            <MenuList
              // fontSize="md"
              bg="white"
              color="gray.700"
              borderColor="gray.200"
              display={{ base: "none", md: "block" }}
              mt={-2}
            >
              <MenuGroup title="My School">
                <NextLink href={{ pathname: '/app/school/[schoolName]', query: { schoolName: me?.me?.admin?.school! } }}  passHref>
                  <MenuItem icon={<CgProfile />}>Profile</MenuItem>
                </NextLink>
                <MenuItem icon={<RiContactsBookLine />} onClick={() => router.push('/app/database')}>My Database</MenuItem>
                <MenuItem icon={<FiSettings />} onClick={() => router.push('/app/settings')}>Settings</MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuItem icon={<FiLogOut />} 
              onClick={handleLogout}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      <Flex display={ me?.me?.admin ? 'none' : 'block' } >
        <NextLink href="/login">
          <Button
            ml={3}
            mr={3}
            bg="#F4B95F"
            color="white"
            _hover={{ bg: "#DAA65D" }}
            borderRadius="md"
            size="sm"
          >
            Login
          </Button>
        </NextLink>

        <NextLink href="/register">
          <Button
            mr={3}
            color="#F4B95F"
            _hover={{ color: "#DAA65D" }}
            variant="ghost"
            borderRadius="md"
            size="sm"
          >
            Register
          </Button>
        </NextLink>
      </Flex>


      {/* Mobile View Avatar */}
      <Flex ml={"auto"} display={{ base: "flex", md: "none" }}>
        <HStack
          spacing="2"
          align="center"
          onClick={onOpen}
          cursor="pointer"
          p={2}
          display={{ base: "flex", md: "none" }}
        >
          <Avatar name={me?.me?.admin?.school!} src={me?.me?.admin?.schoolImg} size="sm" />
          <VStack
            flexDir="column"
            // ml={2}
            // mr={1}
            display={{ base: "none", md: "flex" }}
            alignItems="flex-start"
            spacing="1px"
          >
            <Text fontWeight={600} fontSize="0.9em">
              John Doe
            </Text>
            <Text fontSize="0.7rem">204 Points</Text>
          </VStack>
          <Box display={{ base: "none", md: "flex" }}>
            {/* <Badge colorScheme="green" ml={1} mr={4} variant="outline">
                    Fish
                  </Badge> */}
            <IoCaretDown />
          </Box>
        </HStack>
      </Flex>
    </HStack>
  );
}
