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
    IoChatbubbleEllipses,
    IoChatbubbleEllipsesOutline,
    IoNotificationsOutline,
    IoNotifications,
    IoCompassOutline,
    IoCompass,
    IoApps,
    IoCaretDown,
    IoFlashOutline,
    IoFlash
  } from "react-icons/io5";
  import { CgProfile } from "react-icons/cg";
  import { FiSettings, FiBookmark, FiLogOut } from "react-icons/fi";
  import { RiHome7Fill, RiHome7Line } from "react-icons/ri";
  import React from "react";
  import { useRouter } from "next/router";
  
  export default function UserProfile({ onOpen, ...rest }: { onOpen: any }) {
    const router = useRouter();  
    return (
      <HStack spacing={{ base: "0", md: "3" }} ml={1}>

  
        <Flex display={{ base: 'none', md: 'flex'}}>
        <Flex
        alignItems="center"
        _hover={{ bg: "#EBD2FF", color: "#000a16" }}
        borderRadius="md"
        bg={{ base: "none", md: "none" }}
        minW={{ base: 0, md: 40 }}
        h={{ base: 0, md: 12 }}
        display={{ base: 'none', md: 'flex' }}
      >
        <Menu>
          <MenuButton
            py={2}
            transition="all 0.3s"
            _focus={{ boxShadow: "none" }}
          >
            <HStack
              spacing="2"
              align="center"
              cursor="pointer"
              p={2}
              pr={2}
              display={{ base: "none", md: "flex" }}
            >
              <Avatar name="School Name" size="sm" ml={1} mr={1}>
                {" "}
                <AvatarBadge boxSize="1.25em" bg="green.500" />{" "}
              </Avatar>
              <VStack
                flexDir="column"
                display={{ base: "none", md: "flex" }}
                alignItems="flex-start"
                spacing="1px"
              >
                <Text fontWeight={600} fontSize="0.9em">
                 School Name
                </Text>
              </VStack>
              <Box display={{ base: "none", md: "flex" }}>
                <IoCaretDown />
              </Box>
            </HStack>
          </MenuButton>
          <MenuList
            // fontSize="md"
            bg="white"
            color="gray.700"
            borderColor="gray.200"
            display={{ base: "none", md: "block" }}
            mt={-2}
          >
            <MenuGroup title="My Stuff" >
              <NextLink href="#" passHref>
              <MenuItem icon={<CgProfile />}>
                Profile
               </MenuItem>
              </NextLink>
              <MenuItem icon={<FiBookmark />}>Saved Posts </MenuItem>
              <MenuItem icon={<FiSettings />}>Settings</MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuGroup title="Help" >
              <MenuItem>Docs</MenuItem>
              <MenuItem>FAQ</MenuItem>
            </MenuGroup>
            <MenuDivider />
            
              <MenuItem
                icon={<FiLogOut />}              
              >
                Logout
              </MenuItem>
           
          </MenuList>
        </Menu>
      </Flex>
        </Flex>  
       
        {/* <IconButton
          icon={<IoApps fontSize={24} />}
          aria-label="More Options"
          variant="ghost"
          display={{ base: "none", md: "flex" }}
          onClick={onOpen}
        /> */}
             <NextLink href='/login'>
      <Button ml={3} mr={3} colorScheme='yellow' color='white' borderRadius='md' size='sm'>Login</Button>
      </NextLink>
      <NextLink href='/register'>
      <Button mr={3} colorScheme='yellow' variant='ghost' borderRadius='md' size='sm'>Register</Button>
      </NextLink>
  
        {/* Mobile View Avatar */}
        <Flex ml={'auto'} display={{ base: 'flex', md: 'none' }}> 
        <HStack
        spacing="2"
        align="center"
        onClick={onOpen}
        cursor="pointer"
        p={2}
        display={{ base: "flex", md: "none" }}
      >
        <Avatar name="School Name" size="sm" ml={1} mr={1}>
          {" "}
          <AvatarBadge boxSize="1.25em" bg="green.500" />{" "}
        </Avatar>
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