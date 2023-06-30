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
  useToast,
  LinkOverlay,
} from "@chakra-ui/react";
import React from "react";
import { useMeQuery, Exact, Requests, useDeleteRequestMutation } from "../../gql/graphql";
import { useRouter } from "next/router";
import { formatDistanceToNow } from "date-fns";

interface RequestProps {
  p: Exact<Requests>;
}

const Requests: React.FC<RequestProps> = ({ p }) => {
  const toast = useToast();
  const router = useRouter();
  const [{ data: me }] = useMeQuery();
  const admin = me?.me?.admin!;
  const variant = () => {
    if (p?.status === "PENDING") {
      return "yellow";
    } else if (p?.status === "APPROVED") {
      return "teal";
    } else if (p?.status === "REJECTED") {
      return "red";
    } else {
      return "green";
    }
  };
  const [, deleteRequest] = useDeleteRequestMutation();

  const handleDeleteRequest = async () => {
    const response =  await deleteRequest({deleteRequestId: p?.id});
    if (response.error) {
      toast({
        title: "Error.",
        description: "We could not withdraw this request",
        status: "error",
        variant: "left-accent",
        duration: 5000,
        isClosable: true,
      });
      setTimeout(() => {
        router.reload();
      }, 1000)
    } else if (response.data?.deleteRequest === true) {
      toast({
        title: "Request Withdrawn.",
        description: "You've successfully withdrawn the request.",
        status: "success",
        variant: "left-accent",
        duration: 5000,
        isClosable: true,
      });
      setTimeout(() => {
        router.reload();
      }, 1000)
    }  
  }

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
        <Stack spacing={1} px={4}>
          <Flex py={4} px={1} overflow="hidden">
            <Avatar
              src={p?.student?.school?.school?.logoImgUrl}
              size="md"
              mr={1}
            />
            <Flex direction="column">
              <Text fontWeight={600}>
                {p?.student?.school?.school?.schoolName}
              </Text>
              <Text>
                Requested for {p?.student?.firstName} {p?.student?.lastName}
              </Text>
            </Flex>
            <Flex justify="center" gap={2} ml="auto">
              <Text fontSize={12} fontWeight={300} noOfLines={2}>
                {formatDistanceToNow(new Date(p?.createdAt), {
                    addSuffix: true,
                    includeSeconds: true,
                })}
              </Text>
                <Box>
                  <Badge variant="outline" colorScheme={variant()}>
                    {p?.status}
                  </Badge>
                </Box>
            </Flex>
          </Flex>
          <Flex justify="space-between" align="end">
            <Box
              mt={4}
              px={2}
              py={4}
              bgColor="gray.200"
              minW="30rem"
              display={p.message.length > 1 ? "block" : "none"}
            >
              <Text fontSize={16} fontWeight={400} noOfLines={2}>
                {p?.message}
              </Text>
            </Box>
            <Flex gap={2}>
              <Button
                size="sm"
                bg="#F4B95F"
                color="white"
                _hover={{ bg: "#DAA65D" }}
                fontWeight={400}
                borderRadius="3px"
                onClick={handleDeleteRequest}
              >
                Withdraw Request
              </Button>
            </Flex>
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

export default Requests;
