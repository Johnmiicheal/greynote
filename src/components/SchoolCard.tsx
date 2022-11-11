import {
  Box,
  Flex,
  Image,
  Text,
  useDisclosure,
  Badge,
  Button,
  VStack,
  Stack,
  Link,
  Divider,
  Avatar,
  AvatarBadge,
  Icon,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  ListItem,
  UnorderedList,
  IconButton,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useGetSchoolFromUrl } from "../utils/useGetSchoolFromUrl";
import { HiOutlineCake } from "react-icons/hi";
import { useGetSchoolStudentsCountQuery, useMeQuery } from "../gql/graphql";
import {
  IoLogoInstagram,
  IoLogoFacebook,
  IoLogoYoutube,
  IoLinkOutline,
} from "react-icons/io5";
import { useRouter } from "next/router";
import { format } from "date-fns";
import { RegStudent } from "./RegStudent";
import { NewGrayCase } from "./NewGrayCase";

export default function GroupCard() {
  const router = useRouter();
  const [{ data }] = useGetSchoolFromUrl();
  const [{ data: me }] = useMeQuery();
  const [{ data: numbers }] = useGetSchoolStudentsCountQuery({
    variables: {
      schoolId: data?.getSchoolByName?.school?.id!,
    },
  });

  const members = numbers?.getSchoolStudentsCount;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isRegOpen,
    onOpen: onRegOpen,
    onClose: onRegClose,
  } = useDisclosure();

  return (
    <Stack spacing={4} direction="column">
      <Box borderRadius="10px" px={1} pt={1} mb={3}>
        <Box bg="white" borderRadius="10px" pb={3} w={80}>
          <Flex
            borderRadius="10px 10px 0 0"
            px={4}
            bgGradient="linear(to-r, #F4B95F, #7A7A7A, #DAA65D)"
          >
            <Text fontSize={20} color="white">
              About School
            </Text>
          </Flex>
          <Flex px={4} mt={2} direction="column">
            <Text color="#000a16" fontWeight={400} fontSize={14} w={56}>
              {data?.getSchoolByName?.school?.description}
            </Text>

            <Stack direction="row" spacing={10} mt={3} mb={3}>
              <Text fontSize="1rem" fontWeight={400} mr={2}>
                <b> {members} </b>{" "}
                <Text fontSize="1rem" fontWeight={400}>
                  {members! > 1 ? "Members" : "Member"}
                </Text>
              </Text>

              <Text fontSize="1rem" mr={2}>
                <b>127</b> Cases
              </Text>
              <Box>
                <Badge
                  bgGradient="linear(to-r, green.200, pink.500)"
                  variant="solid"
                >
                  L3 ADMIN
                </Badge>
              </Box>
            </Stack>

            <Divider mb={3} />
            <Flex direction="row" align="center">
              <Icon as={HiOutlineCake} mr={2} />

              <Text>
                Created on {format(new Date(data?.getSchoolByName?.school?.createdAt), 'PP')}
              </Text>
            </Flex>
          </Flex>

          <Button
            w={60}
            color="#7A7A7A"
            borderColor="#7A7A7A"
            variant="outline"
            _hover={{
              bgGradient: "linear(to-r, #DAA65D, #7A7A7A)",
              textColor: "#000A16",
              borderColor: "white",
            }}
            ml={4}
            mt={2}
            onClick={onRegOpen}
          >
            Register Student
          </Button>

          <Button
            w={60}
            color="#7A7A7A"
            borderColor="#7A7A7A"
            variant="outline"
            _hover={{
              bgGradient: "linear(to-r, #DAA65D, #7A7A7A)",
              textColor: "#000A16",
              borderColor: "white",
            }}
            ml={4}
            mt={2}
            onClick={onOpen}
          >
            Create GrayCase
          </Button>
          <RegStudent isOpen={isRegOpen} onClose={onRegClose} />
          <NewGrayCase isOpen={isOpen} onClose={onClose} />

          <Divider mt={3} />

          <Accordion allowToggle borderRadius="md" mt={3}>
            <AccordionItem>
              <AccordionButton>
                <Box flex="1" textAlign="left" borderRadius="md">
                  Social Links
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <UnorderedList>
                  <ListItem>
                    <Flex
                      align="center"
                      borderRadius="md"
                      role="group"
                      cursor="pointer"
                      _hover={{
                        bg: "gray.200",
                      }}
                      mr={{ base: 0, md: 2 }}
                      onClick={() =>
                        window.open(
                          "https://google.com",
                          "_blank"
                        )
                      }
                    >
                      <IconButton
                        icon={<IoLinkOutline />}
                        borderRadius="md"
                        fontSize={{ base: 24, md: 26 }}
                        // _groupHover={{ color: "#5E00AB", bg: "#DDB2FF" }}
                        _hover={{ color: "none", bg: "none" }}
                        aria-label="Home"
                        variant="ghost"
                      />
                      <Text ml="1" pr={2}>
                        Website
                      </Text>
                    </Flex>
                  </ListItem>
                  <ListItem>
                    <Flex
                      align="center"
                      borderRadius="md"
                      role="group"
                      cursor="pointer"
                      _hover={{
                        bg: "gray.200",
                      }}
                      mr={{ base: 0, md: 2 }}
                      onClick={() =>
                        window.open("https://instagram.com", "_blank")
                      }
                    >
                      <IconButton
                        icon={<IoLogoInstagram />}
                        borderRadius="md"
                        fontSize={{ base: 24, md: 26 }}
                        // _groupHover={{ color: "#5E00AB", bg: "#DDB2FF" }}
                        _hover={{ color: "none", bg: "none" }}
                        aria-label="Home"
                        variant="ghost"
                      />
                      <Text ml="1" pr={2}>
                        Instagram
                      </Text>
                    </Flex>
                  </ListItem>
                  <ListItem>
                    <Flex
                      align="center"
                      borderRadius="md"
                      role="group"
                      cursor="pointer"
                      _hover={{
                        bg: "gray.200",
                      }}
                      mr={{ base: 0, md: 2 }}
                      onClick={() =>
                        window.open("https://facebook.com", "_blank")
                      }
                    >
                      <IconButton
                        icon={<IoLogoFacebook />}
                        borderRadius="md"
                        fontSize={{ base: 24, md: 26 }}
                        // _groupHover={{ color: "#5E00AB", bg: "#DDB2FF" }}
                        _hover={{ color: "none", bg: "none" }}
                        aria-label="Home"
                        variant="ghost"
                      />
                      <Text ml="1" pr={2}>
                        Facebook
                      </Text>
                    </Flex>
                  </ListItem>
                  <ListItem>
                    <Flex
                      align="center"
                      borderRadius="md"
                      role="group"
                      cursor="pointer"
                      _hover={{
                        bg: "gray.200",
                      }}
                      mr={{ base: 0, md: 2 }}
                      onClick={() =>
                        window.open("https://youtube.com", "_blank")
                      }
                    >
                      <IconButton
                        icon={<IoLogoYoutube />}
                        borderRadius="md"
                        fontSize={{ base: 24, md: 26 }}
                        // _groupHover={{ color: "#5E00AB", bg: "#DDB2FF" }}
                        _hover={{ color: "none", bg: "none" }}
                        aria-label="Home"
                        variant="ghost"
                      />
                      <Text ml="1" pr={2}>
                        Youtube
                      </Text>
                    </Flex>
                  </ListItem>
                </UnorderedList>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
      </Box>

      <Flex borderRadius="10px" px={1}>
        <Box bg="white" borderRadius="10px" pb={3} w={80}>
          <Flex borderRadius="10px 10px 0 0" bgImg="/graycard.png" overflow="hidden" h="70px">
          </Flex>
          <Flex ml={5} mt={2}>
            <Text color="#000a16" fontWeight={400} fontSize={14} w={56}>
              Graybook Guildlines and Privacy Policies
            </Text>
          </Flex>
          <NextLink href="/" passHref>
            <Link textDecoration="none">
              {" "}
              <Text color="#000a16" align="center">
                Privacy Policy
              </Text>
            </Link>
          </NextLink>
        </Box>
      </Flex>
      
    </Stack>
  );
}
