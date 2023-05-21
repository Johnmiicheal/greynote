import React from "react";
import { Center, Flex, Box, Image } from "@chakra-ui/react";
import { useMeQuery } from "../src/gql/graphql";
import BarLoader from "react-spinners/BarLoader";
import App from "../src/components/Dashboard/App";

const AppPage = () => {
  const [{ data, fetching }] = useMeQuery();
  return fetching ? (
    <Center>
        <Box minW="full" mt={{ base: 60, md: 60, lg: 40 }}>
          <Flex
            direction="column"
            align="center"
            minW={{ base: "full", lg: "650px" }}
          >
            <Image src="/icons/greyicon.png" alt="zlogo" w={40} mb={3} />
            <BarLoader color="#ffd880" width="150px" />
          </Flex>
        </Box>
      </Center>
  ) : (
    <App />
  )
};
export default AppPage;
