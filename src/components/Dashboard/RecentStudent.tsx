import {
    Text,
    Flex,
    Box,
    Heading,
    Avatar,
    Stack,
    VStack,
    Divider,
  } from "@chakra-ui/react";
  import React from "react";
  import { useMeQuery, Exact, Student } from "../../gql/graphql";
  import { useRouter } from "next/router";
  import { formatDistanceToNow } from "date-fns";
  
  interface CasesProps {
    p: Exact<Student>;
  }
  
  const RecentStudent: React.FC<CasesProps> = ({ p }) => {
    const router = useRouter();
    const [{ data: me }] = useMeQuery();
    const admin = me?.me?.admin!;
    const studentName = `${p?.firstName} ${p?.lastName}`;
    const monthshort = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ];
      let d = new Date(p?.createdAt);
      let day = d.getDate();
      let month = monthshort[d.getMonth()];
      let year = d.getFullYear();
    return (
      <>
        <VStack>
          <Box
            as="article"
            bg="white"
            _hover={{ bg: "gray.200" }}
            w={{ base: "full", lg: "320px" }}
            h="60px"
            cursor="pointer"
            onClick={() => router.push(`/app/student/${p?.id}`)}
            mb={2}
          >
            <Stack spacing={1}>
                <Flex py={2} px={2} justify="start">
                <Avatar src={p?.profileImgUrl} size="md" />    
                <Stack px={3} textAlign="start">
                    <Heading as="h4" fontSize={14} fontWeight={500} noOfLines={2}>
                    {studentName}
                    </Heading>
                    <Flex>
                    <Text fontSize={11} fontWeight={500}>
                        {p?.gender} | {p?.ageInput} | {p?.gradeClass}
                    </Text>
                    </Flex>
                </Stack>
                </Flex>
            </Stack>
          </Box>
          <Divider />
        </VStack>
      </>
    );
  };
  
  export default RecentStudent;
  