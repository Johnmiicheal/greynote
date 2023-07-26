import {
  Image,
  Text,
  Flex,
  Box,
  Heading,
  Avatar,
  Badge,
  Stack,
  VStack,
  Button,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import React from "react";
import { useMeQuery, Exact, Notes } from "../../gql/graphql";
import { useRouter } from "next/router";
import { formatDistanceToNow } from "date-fns";

interface NotesProps {
  p: Exact<Notes>;
}

const Notes: React.FC<NotesProps> = ({ p }) => {
  const router = useRouter();
  const [{ data: me }] = useMeQuery();
  const admin = me?.me?.admin!;
  const variant = () => {
    if (p?.category === "Reminder") {
      return "yellow";
    } else if (p?.category === "Post") {
      return "teal";
    } else if (p?.category === "Report") {
      return "red";
    } else {
      return "green";
    }
  };
  return (
    <VStack spacing={{ base: 0, md: 5 }}>
      <Box
        as="article"
        borderWidth="1px"
        borderRadius="lg"
        bg="white"
        borderColor="#F4B95F"
        _hover={{ borderColor: "gray.400" }}
        w={{ base: "full", lg: "750px" }}
        mb={{ base: 2 }}
      >
        <Stack spacing={1}>
          <Flex py={4} px={2} overflow="hidden">
            <Box
              h="100"
              w="20px"
              bgColor="#F4B95F"
              ml={{base: -4, lg: -3}}
              mr={{base: 3, lg: 10}}
              borderRadius="0 5px 5px 0"
            />
            <Avatar
              name={admin.adminName}
              src={admin.profileImgUrl}
              size="md"
            />
            <Stack px={3} cursor="pointer">
              <Flex>
                <Heading as="h4" fontSize={20} fontWeight={500} noOfLines={2}>
                  {p?.title}
                </Heading>
                <Box ml={3}>
                  <Badge variant="outline" colorScheme={variant()}>
                    {p?.category}
                  </Badge>
                </Box>
              </Flex>
              <Box mt={4} display={p.body.length > 1 ? "block" : "none"}>
                <Text fontSize={16} fontWeight={400} noOfLines={2}>
                  {p?.body}
                </Text>
              </Box>
              <Text fontSize={12} fontWeight={300} noOfLines={2}>
                {formatDistanceToNow(new Date(p?.createdAt), {
                  addSuffix: true,
                  includeSeconds: true,
                })}
              </Text>
            </Stack>
          </Flex>

          <Box
            maxW="full"
            alignItems="center"
            mt={2}
            zIndex={2}
            display={me?.me?.admin ? "block" : "none"}
          ></Box>
        </Stack>
      </Box>
    </VStack>
  );
};

export default Notes;
