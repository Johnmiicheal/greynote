import {
  Flex,
  Text,
  Center,
  Image,
  Box,
  Divider,
  Button,
} from "@chakra-ui/react";
import { terms } from "../../fakedata";
import Footer from "../../src/components/Web/Footer";
import { useRouter } from "next/router";

const Terms = () => {
  const router = useRouter();
  return (
    <Center>
      <Flex direction="column" align="center" w="full">
        <Flex justify="space-between" align="center" bg="white" w="full" px={10}>
          <Flex align="center" justify="start" h="10vh">
            <Image src="/icons/greylight.png" w="40px" alt="greynote logo" />
            <Text fontWeight={600} fontSize={20}>
              Terms of Service
            </Text>
          </Flex>
          <Button
            px={8}
            py={5}
            borderWidth={1}
            borderColor="#007C7B"
            bg="#FFFFFF"
            color="#007C7B"
            _hover={{ bg: "#007C7B", color: "#FFFFFF" }}
            onClick={() => router.push("/")}
          >
            Return to Home
          </Button>
        </Flex>
        <Flex
          direction="column"
          justify="center"
          px={10}
          h="50vh"
          w="full"
          bgImage="/web/banner.png"
          bgSize="cover"
          bgRepeat="no-repeat"
        >
          <Text
            fontWeight="bold"
            fontSize={96}
            color="#001515"
            lineHeight="shorter"
          >
            Terms &<br /> Conditions
          </Text>
        </Flex>
        <Flex bg="#001515" w="full" h="10vh"></Flex>
        <Flex
          direction="column"
          w="70rem"
          gap={5}
          textAlign="justify"
          px={10}
          pt={10}
          mb={10}
        >
          <Box>
            <Text fontWeight="bold" fontSize={30} color="#001515">
              Disclaimer: User Liability for Data Input and Sharing
            </Text>
            <Text>
              By accessing and using the services provided by Greynote Nigeria
              Limited ("Greynote"), you acknowledge and agree that you are
              solely responsible for the data you input into the application and
              the manner in which you choose to share that data. This legal
              disclaimer outlines the terms and conditions governing your use of
              the Greynote app and emphasises that Greynote will not be held
              responsible for any abuse, issues, or consequences that may arise
              from your account usage and the handling of the data you input.
            </Text>
          </Box>
          <Divider bg="#001515" h="1px" />
          <Text fontWeight="bold" mt={5} fontSize={48} color="#001515">
            Greynote Terms & Conditions
          </Text>
          {terms.map((t) => (
            <Box key={t.title}>
              <Text fontWeight="bold" fontSize={30} color="#001515">
                {t.title}
              </Text>
              <Text>{t.message}</Text>
            </Box>
          ))}
          <Divider bg="#001515" h="1px" />
          <Box mt={5}>
            <Text fontWeight="600" color="#001515">
              By using the Greynote app, you acknowledge that you have read,
              understood, and agreed to the terms and conditions outlined in
              this legal disclaimer. If you do not agree with these terms, you
              must refrain from using the Greynote app. <br /><br/>
              This legal disclaimer shall be governed by and construed in
              accordance with the laws of Nigeria, and any disputes arising out
              of or in connection with this disclaimer shall be subject to the
              exclusive jurisdiction of the Nigerian courts.
            </Text>
          </Box>
        </Flex>
        <Footer bgColor="#001515" />
      </Flex>
    </Center>
  );
};

export default Terms;
