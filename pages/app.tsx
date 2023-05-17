import React from "react";
import { Center, Flex, Box, Image } from "@chakra-ui/react";
import { useMeQuery, useGetSchoolByNameQuery } from "../src/gql/graphql";
import BarLoader from "react-spinners/BarLoader";
import App from "../src/components/Dashboard/App";
import { useRouter } from "next/router";

const AppPage = () => {
  const router = useRouter();
  const [{ data, fetching }] = useMeQuery();
  const admin = data?.me?.admin!;
  let page = null;
  if (fetching) {
    page = (
      <Center>
        <Box minW="full" mt={{ base: 60, md: 60, lg: 40 }}>
          <Flex
            direction="column"
            align="center"
            minW={{ base: "full", lg: "650px" }}
          >
            <Image src="/graylogo.png" alt="zlogo" w={40} mb={3} />
            <BarLoader color="#ffd880" width="150px" />
          </Flex>
        </Box>
      </Center>
    );
  } else if (admin) {
    page = <App />;
  } else {
    router.push("/");
  }
  return page;
};
export default AppPage;
