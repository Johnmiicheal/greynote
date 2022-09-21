import { Flex, Text, Center, Image } from "@chakra-ui/react";
import styles from '../styles/Login.module.css';

const Login = () => {
  return (
    <Center bg='gray.200' minH='100vh'>
    <div className={styles.wavy}>
        <Flex direction="row" w='full' align='center' px={40} zIndex={2} >
           <Flex direction="column" bg="white" p={5} borderRadius='md' mt={10}>
            <Image src="/grayfull.png" w={40} />
              <Text mt={2} fontSize={20} fontWeight={500}>Login to GrayBook</Text>
           </Flex>
        </Flex>
    </div>
    </Center>
  )
}

export default Login 
