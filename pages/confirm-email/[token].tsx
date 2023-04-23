import React, { useState, useEffect } from "react";
import {
  Center,
  Button,
  Text,
  Flex,
} from "@chakra-ui/react";
import { Player } from "@lottiefiles/react-lottie-player";
import { useRouter } from "next/router";


const EmailVerification = () => {
  const router = useRouter();
  Redirect('/onboarding', 3);
  return (
    <Center>
      <Flex direction="column" align="center" mt={10} color="#000A16" gap="2">
        <Text fontSize="22" fontWeight={700}>Account Verified</Text>
        <Player autoplay loop src="/verified.json" style={{ width: "300px", height: "300px" }} />
        <Text fontWeight={600} w="350px" textAlign='center'>You'll be automatically redirected to the onboarding page. If not yet redirected, Click <Button variant="link" color="#F4B95F" fontWeight={700}>here</Button> </Text>
      </Flex>
    </Center>
  );
};

export default EmailVerification;


function Redirect(redirectTo: string, seconds = 5) {
  const [secondsRemaining, setSecondsRemaining] = useState(seconds);
  const router = useRouter();

  useEffect(() => {
    if (secondsRemaining === 0) router.push('/onboarding');

    const timer = setTimeout(() => {
      setSecondsRemaining((prevSecondsRemaining) => prevSecondsRemaining - 1);
      if (secondsRemaining === 1) router.push(redirectTo);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [router, secondsRemaining, redirectTo]);
}
