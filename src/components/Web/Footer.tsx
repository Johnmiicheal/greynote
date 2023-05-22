import React from "react";
import { Box, Flex, Text, Image, Divider, Button } from "@chakra-ui/react";
import { IoLogoTwitter, IoLogoLinkedin, IoLogoFacebook } from "react-icons/io5";

const Footer = () => {
    let year = new Date().getFullYear();
    const links = [
        { path: "/features", text: "Features" },
        { path: "/resources", text: "Resources" },
        { path: "/pricing", text: "Pricing" },
    ];
    const socials = [
        { path: "https://twitter.com", iconActive: IoLogoTwitter, text: "Twitter" },
        { path: "https://linkedin.com", iconActive: IoLogoLinkedin, text: "LinkedIn" },
        { path: "https://facebook.com", iconActive: IoLogoFacebook, text: "Facebook" },
      ];
    const foot = [
        {path: "/privacy", text: "Privacy Policy"},
        {path: "/terms", text: "Terms of Service"}
    ]
    return(
        <Flex bg="white" direction="column" w="full" align="center" px={{ base: 10, md: 18, lg: 24 }} py={10} overflow="hidden">
            <Flex justify={{base: "center", md: "space-between"}} direction={{ base: "column", md: "row" }} align={{ base: "start", md: "center" }} w="full"> 
                <Box>
                    <Image src="/icons/greyfull.png" pointerEvents="none" mb={{base: 5, md: 0}} alt="graybook_logo" w={{ base: "100px", md: "100px" ,lg: "160px"}} />
                </Box>
                <Flex direction={{ base: "column", md: "row" }} gap={5} ml={{base: 0, md: "auto" }} mr={{ base: "auto", md: 0 }} justify={{base: "center", md: "end"}} align={{ base: "start", md: "center"}}>
                    {socials.map((social) => (
                        <Button variant="link" key={social.path} color="#7A7A7A" leftIcon={<social.iconActive />}>{social.text}</Button>
                    ))}
                    {/* {links.map((link) => (
                        <Button variant="link" key={link.path} color="#7A7A7A">{link.text}</Button>
                    ))} */}
                </Flex>
            </Flex>
            <Box w="full" h="0.3" bgColor="gray.300" mt={6} />
            <Flex ml={{ md: "auto" }} gap={{ base: 3, md: 8}} mt={6} direction={{ base: "column", md: "row"}}>
                <Text textStyle="text" color="#7a7a7a" w={{ base: "full", md: "10rem"}}>
                &#169; {year} Greynote, Inc.
                </Text>
                {foot.map((foots) => (
                        <Button variant="link" key={foots.path} color="#7A7A7A" fontWeight={400}>{foots.text}</Button>
                    ))}
                
            </Flex>
        </Flex>
    )
}

export default Footer;