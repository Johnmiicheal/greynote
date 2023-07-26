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
import CaseInteraction from "./CaseInteraction";
import { GrayCase, useMeQuery, useGetStudentByGrayCaseQuery, Exact } from "../../gql/graphql";
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { formatDistanceToNow } from 'date-fns'

interface CasesProps {
  p: Exact<GrayCase>;
}

const Cases: React.FC<CasesProps> = ({ p }) => {

  const [{ data: s }] = useGetStudentByGrayCaseQuery({
    variables: {
      grayId: p.id!
    }
  })
  const period = 240000;
    const router = useRouter();
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
        borderWidth="1px"
        borderRadius="lg"
        bg="white"
        _hover={{ borderColor: "gray.400" }}
        pb={2}
        w={{ base: "full", lg: "750px" }}
        mb={{ base: 2 }}
      >
        <Stack spacing={1}>
          <NextLink
            href={{
              pathname: "/app/student/[id]",
              query: {
                id: s?.getStudentByGrayCase?.student?.id,
              },
            }}
            passHref
          >
            <LinkOverlay>
            <Flex py={4} px={2} align="center">
              <Avatar name={p?.firstName} src={s?.getStudentByGrayCase?.student?.profileImgUrl!} size={{base: "lg",lg: "xl"}}  />
                <Stack px={3} cursor="pointer">
                  <Flex>
                    <Heading
                      as="h4"
                      fontSize={20}
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
                    <Text fontSize={16} fontWeight={500} noOfLines={2}>
                      {p?.gradeClass + " - " + p?.gender}
                    </Text>
                  </Box>
                  <Text fontSize={12} fontWeight={300} noOfLines={2}>
                      {formatDistanceToNow(new Date(p?.createdAt), { addSuffix: true, includeSeconds: true } )}
                    </Text>
                </Stack>
            </Flex>
            </LinkOverlay>
          </NextLink>
          {/* <Box maxW="full" alignItems="center" mt={2} zIndex={2} display={ me?.me?.admin ? "block" : "none" }>
            <CaseInteraction
              post={p}
              pageProps={undefined}
            />
          </Box> */}
        </Stack>
      </LinkBox>
    </VStack>
  );
};

export default Cases;