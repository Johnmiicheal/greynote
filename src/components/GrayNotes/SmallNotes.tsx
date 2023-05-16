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
  useDisclosure,
  Divider,
} from "@chakra-ui/react";
import React from "react";
import { useMeQuery, Exact, Notes } from "../../gql/graphql";
import { useRouter } from "next/router";
import { formatDistanceToNow } from "date-fns";
import { NotesModal } from "./NotesModal";

interface CasesProps {
  p: Exact<Notes>;
}

const SmallNotes: React.FC<CasesProps> = ({ p }) => {
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <VStack>
        <Box
          as="article"
        //   borderWidth="1px"
          bg="white"
          borderColor="#F4B95F"
          _hover={{ bg: "gray.200" }}
          w={{ base: "full", lg: "320px" }}
          h="80px"
          cursor="pointer"
          onClick={onOpen}
          mb={2}
        >
          <Stack spacing={1}>
            <Stack px={3} cursor="pointer" textAlign="start">
              <Flex align="center">
                <Box>
                  <Badge
                    variant="outline"
                    fontSize={11}
                    colorScheme={variant()}
                  >
                    {p?.category}
                  </Badge>
                </Box>
                <Text fontSize={11} fontWeight={300} noOfLines={2} ml={3}>
                  {formatDistanceToNow(new Date(p?.createdAt), {
                    addSuffix: true,
                    includeSeconds: true,
                  })}
                </Text>
              </Flex>
              <Heading as="h4" fontSize={14} fontWeight={500} noOfLines={2}>
                {p?.title}
              </Heading>
              <Box mt={4} display={p.body.length > 1 ? "block" : "none"}>
                <Text fontSize={11} fontWeight={400} noOfLines={1}>
                  {p?.body}
                </Text>
              </Box>
            </Stack>
          </Stack>
        </Box>
        <Divider /> 
      </VStack>
      <NotesModal isOpen={isOpen} onClose={onClose} id={p.id} />
    </>
  );
};

export default SmallNotes;
