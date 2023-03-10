import React from "react";
import { Center, Flex, Box, Image } from "@chakra-ui/react"
import { useMeQuery } from "../src/gql/graphql";
import BarLoader from "react-spinners/BarLoader";
import LandingPage from "../src/components/Web/LandingPage";
import App from "../src/components/Dashboard/App";

const AppPage = () => {
    const [{ data, fetching }] = useMeQuery();
    let page = null;
    if(fetching && !data?.me?.admin){
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
      )
}else if(data){
    page = ( <App /> )
  }

  return page;
}
export default AppPage;