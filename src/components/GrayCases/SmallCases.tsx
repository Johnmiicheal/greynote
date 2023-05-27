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
  useDisclosure,
  Divider,
} from "@chakra-ui/react";
import React from "react";
import { useMeQuery, Exact, GrayCase } from "../../gql/graphql";
import { useRouter } from "next/router";
import { formatDistanceToNow } from "date-fns";
import { CaseModal } from "./CaseModal";

interface CasesProps {
  p: Exact<GrayCase>;
}

const SmallCases: React.FC<CasesProps> = ({ p }) => {
  const router = useRouter();
  const [{ data: me }] = useMeQuery();
  const admin = me?.me?.admin!;
  const variant = () => {
    if (p?.category === "Expulsion") {
      return "gray";
    } else if (p?.category === "Suspension") {
      return "orange";
    } else if (p?.category === " Fees Default") {
      return "red";
    } else {
      return "green";
    }
  };
  const studentName = `${p?.firstName} ${p?.lastName}`;
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
                {studentName}
              </Heading>
              <Box mt={4} display={p.note.length > 1 ? "block" : "none"}>
                <Text fontSize={11} fontWeight={400} noOfLines={1}>
                  {p?.note}
                </Text>
              </Box>
            </Stack>
          </Stack>
        </Box>
        <Divider />
      </VStack>
      <CaseModal isOpen={isOpen} onClose={onClose} id={p.id} />
    </>
  );
};

export default SmallCases;
