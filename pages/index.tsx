import React from "react";
import { Center, Flex, Box, Image } from "@chakra-ui/react"
import { useMeQuery } from "../src/gql/graphql";
import BarLoader from "react-spinners/BarLoader";
import LandingPage from "../src/components/Web/LandingPage";
import {useRouter} from "next/router";

const Home = () => {
  return (<LandingPage />);
}
export default Home