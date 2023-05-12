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
        <Flex bg="white" direction="column" w="full" align="center" px={{ base: 10, md: 24 }} py={10} overflow="hidden">
            <Flex justify="space-between" w="full"> 
                <Box>
                    <Image src="/grayfull.png" pointerEvents="none" alt="graybook_logo" w="160px" />
                </Box>
                <Flex direction={{ base: "column", md: "row" }} gap={5} ml="auto" justify="end" align={{ base: "start", md: "center"}}>
                    {socials.map((social) => (
                        <Button variant="link" key={social.path} color="#7A7A7A" leftIcon={<social.iconActive />}>{social.text}</Button>
                    ))}
                    {links.map((link) => (
                        <Button variant="link" key={link.path} color="#7A7A7A">{link.text}</Button>
                    ))}
                </Flex>
            </Flex>
            <Box w="full" h="0.3" bgColor="gray.300" mt={6} />
            <Flex ml={{ md: "auto" }} gap={3} mt={6} direction={{ base: "column", md: "row"}}>
                <Text textStyle="text" color="#7a7a7a" w="full">
                &#169; {year} GrayBook, Inc.
                </Text>
                {foot.map((foots) => (
                        <Button variant="link" key={foots.path} color="#7A7A7A" fontWeight={400}>{foots.text}</Button>
                    ))}
                
            </Flex>
        </Flex>
    )
}

export default Footer;