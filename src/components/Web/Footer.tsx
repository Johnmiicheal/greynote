import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import { format } from "date-fns";

const Footer = () => {
    let year = new Date().getFullYear()
    return(
        <Flex bg="#F4B95F" w="full" h="10" align="center" px={4} boxShadow="md">
            <Text textStyle="text" color="whiteAlpha.700">
            &#169; {year} GrayBook Student Management
            </Text>
        </Flex>
    )
}

export default Footer;