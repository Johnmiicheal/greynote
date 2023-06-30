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
    useDisclosure,
    LinkOverlay,
    useToast,
  } from "@chakra-ui/react";
  import React from "react";
  import { useMeQuery, Exact, Requests, useAcceptRequestMutation, useRejectRequestMutation, useDeleteRequestMutation } from "../../gql/graphql";
  import { useRouter } from "next/router";
  import { formatDistanceToNow } from "date-fns";
import { TransferStudent } from "../Modals/TransferStudent";
  
  interface RequestProps {
    p: Exact<Requests>;
  }
  
  const SmallRequests: React.FC<RequestProps> = ({ p }) => {
    const toast = useToast();
    const router = useRouter();
    const [{ data: me }] = useMeQuery();
    const [, accepted] = useAcceptRequestMutation();
    const [, rejected] = useRejectRequestMutation();
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
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleAcceptRequest = () => {
        onOpen();
        accepted({
            acceptRequestId: p.id
        })
    };

    const [, deleteRequest] = useDeleteRequestMutation();

    // const handleDeleteRequest = async () => {
    //   const response =  await deleteRequest({deleteRequestId: p?.id});
    //   if (response.error) {
    //     toast({
    //       title: "Error.",
    //       description: "We could not withdraw this request",
    //       status: "error",
    //       variant: "left-accent",
    //       duration: 5000,
    //       isClosable: true,
    //     });
    //     setTimeout(() => {
    //       router.reload();
    //     }, 1000)
    //   } else if (response.data?.deleteRequest === true) {
    //     toast({
    //       title: "Request Withdrawn.",
    //       description: "You've successfully withdrawn the request.",
    //       status: "success",
    //       variant: "left-accent",
    //       duration: 5000,
    //       isClosable: true,
    //     });
    //     setTimeout(() => {
    //       router.reload();
    //     }, 1000)
    //   }  
    // }

    const handleRejectRequest = async () => {
        const response = await rejected({
            rejectRequestId: p.id
        });
        if (response.error) {
          toast({
            title: "Error.",
            description: "We could not reject this request",
            status: "error",
            variant: "left-accent",
            duration: 5000,
            isClosable: true,
          });
          // setTimeout(() => {
          //   router.reload();
          // }, 1000)
        } else if (response.data?.rejectRequest === true) {
          toast({
            title: "Case Rejected.",
            description: "You have rejected this request",
            status: "success",
            variant: "left-accent",
            duration: 5000,
            isClosable: true,
          });
          // setTimeout(() => {
          //   router.reload();
          // }, 1000)
        }  
        
    }
    return (
        <>
      <VStack spacing={{ base: 0, md: 5 }}>
        <Box
          as="article"
          borderWidth="1px"
          borderRadius="lg"
          bg="white"
          borderColor="#F4B95F"
          _hover={{ borderColor: "gray.400" }}
          w={{ base: "full", lg: "320px" }}
          mb={{ base: 2 }}
          display={p?.status === "PENDING" ? 'block' : 'none'}
        >
          <Stack spacing={1} px={2}>
            <Flex py={2} px={1} align="center" overflow="hidden">
              <Avatar
                src={p?.schoolImg}
                size="md"
                mr={1}
                cursor="pointer"
                onClick={() => router.push(`app/school/${p?.school}`)}
              />
              <Flex direction="column" textAlign="start">
                <Text fontWeight={600} fontSize={13}>
                  {p?.school}
                </Text>
                <Text fontSize={12}>
                  Requesting for {p?.student?.firstName} {p?.student?.lastName}
                </Text>
              </Flex>
            </Flex>
            <Flex justify="space-between" direction="column" align="start">
              <Box
                px={2}
                py={2}
                bgColor="gray.200"
                w="full"
                textAlign="start"
                display={p.message.length > 1 ? "block" : "none"}
              >
                <Text fontSize={16} fontWeight={400} noOfLines={2}>
                  {p?.message}
                </Text>
              </Box>
              <Flex gap={2} mt={2}>
                <Button
                  size="sm"
                  bg="#F4B95F"
                  color="white"
                  _hover={{ bg: "#DAA65D" }}
                  fontWeight={400}
                  borderRadius="3px"
                  onClick={handleAcceptRequest}
                >
                  Accept
                </Button>
                <Button
                  size="sm"
                  border=" 1px solid #F4B95F"
                  bg="white"
                  color="#F4B95F"
                  _hover={{ bg: "#DAA65D", color: "white" }}
                  fontWeight={400}
                  borderRadius="3px"
                  onClick={handleRejectRequest}
                >
                  Reject
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
      <TransferStudent isOpen={isOpen} onClose={onClose} id={p?.student?.id} schoolName={p?.school} adminName={p?.reqAdmin} message={p?.message} />
      </>
    );
  };
  
  export default SmallRequests;
  