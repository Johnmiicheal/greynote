import {
    Image,
    Text,
    Flex,
    Box,
    Heading,
    IconButton,
    Avatar,
    Badge,
    Stack,
    VStack,
    Button,
    LinkBox,
    LinkOverlay,
    useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import CaseInteraction from "./CaseInteraction";
import { GrayCase, useMeQuery, useGetStudentByIdQuery } from "../gql/graphql";
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { formatDistanceToNow } from 'date-fns'

interface CasesProps {
  p: Partial<GrayCase>;
}

const Cases: React.FC<CasesProps> = ({ p }) => {
  const period = 240000;
    const router = useRouter();
    const toast = useToast();
    const[{data: me}] = useMeQuery();
    const variant = () => {
      if(p?.category === "Expulsion"){
        return "gray"
      }else if(p?.category === "Suspension"){
        return "orange"
      }else if(p?.category === " Fees Default"){
        return "red"
      }else{
      return "green"
      }
    }
  return (
    <VStack spacing={{ base: 0, md: 5 }}>
      <LinkBox
        as="article"
        borderWidth="2px"
        borderRadius="lg"
        bg="white"
        _hover={{ borderColor: "gray.400" }}
        pb={2}
        w={{ base: "full", lg: "650px" }}
        
        mb={{ base: 2 }}
      >
        <Stack spacing={10}>
          <NextLink
            href={{
              pathname: "/s/[student]",
              query: {
                student: p?.firstName,
              },
            }}
            passHref
          >
            <LinkOverlay>
            <Flex py={4} px={2} align="center">
              <Avatar name={p?.firstName} size="xl"  />
                <Stack px={3} cursor="pointer">
                  <Flex>
                    <Heading
                      as="h4"
                      fontSize={24}
                      fontWeight={500}
                      noOfLines={2}
                    >
                      {p?.firstName + " " + p?.lastName}
                    </Heading>
                    <Box ml={3}>
                      <Badge variant='outline' colorScheme={variant()}>
                        {p?.category}
                      </Badge>
                    </Box>

                  </Flex>
                  <Box mt={4}>
                    <Text fontSize={18} fontWeight={500} noOfLines={2}>
                      {p?.gradeClass + " - " + p?.gender}
                    </Text>
                  </Box>
                  <Text fontSize={16} fontWeight={300} noOfLines={2}>
                      {formatDistanceToNow(new Date(p?.createdAt), { addSuffix: true, includeSeconds: true } )}
                    </Text>
                </Stack>
            </Flex>
            </LinkOverlay>
          </NextLink>

          <Box maxW="full" alignItems="center" mt={5} zIndex={2}>
            <CaseInteraction
              comments={2}
              postID={p?.id}
              post={p}
              count={p?.id}
              pageProps={undefined}
            />
          </Box>
        </Stack>
      </LinkBox>
    </VStack>
  );
};

export default Cases;