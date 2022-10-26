import { Flex, Icon, Text, Image } from "@chakra-ui/react"
import { AiFillHome, AiOutlineHome, AiOutlineProfile, AiFillProfile } from "react-icons/ai"
import { RiContactsBookFill, RiContactsBookLine } from "react-icons/ri"
import { useRouter } from "next/router"

const GrayLayout = () => {
    const router = useRouter();
    return(
        <Flex
        direction="column"
        bg="#212121"
        minH="full"
        w="130px"
        pos="absolute"
        mx="auto"
        px={5}
        py={4}
        align="center"
        justify="start"
      >
        <Image src="/grayaxis.png" alt="grayaxis" minW="80px" pointerEvents='none'/>

        <Flex
          direction="column"
          mt={10}
          w="full"
          py={2}
          align="center"
          role="group"
          _hover={{ color: "#8E6930", bg: "#FFCE83" }}
          borderRadius="md"
          cursor="pointer"
          color={ router.pathname ==="/" ? "#FFCE83" : "gray.200" }
          onClick={() => router.push("/")}
        >
          <Icon as={ router.pathname === "/" ? AiFillHome : AiOutlineHome } w={6} h={6} mb={2} />
          <Text fontSize={13} fontWeight={router.pathname === "/" ? 500 : 400}>
            {" "}
            Home{" "}
          </Text>
        </Flex>

        <Flex
          direction="column"
          mt={10}
          w="full"
          py={2}
          align="center"
          role="group"
          _hover={{ color: "#8E6930", bg: "#FFCE83" }}
          borderRadius="md"
          cursor="pointer"
          color={ router.pathname ==="/graycase" ? "#FFCE83" : "gray.200" }
          onClick={() => router.push("/graycase")}
        >
          <Icon as={router.pathname === "/graycase" ? RiContactsBookFill : RiContactsBookLine} w={6} h={6} mb={2} />
          <Text fontSize={13} fontWeight={400}>
            {" "}
            Graycase{" "}
          </Text>
        </Flex>

        <Flex
          direction="column"
          mt={10}
          w="full"
          py={2}
          align="center"
          role="group"
          _hover={{ color: "#8E6930", bg: "#FFCE83" }}
          borderRadius="md"
          cursor="pointer"
          color={ router.pathname ==="/database" ? "#FFCE83" : "gray.200" }
          onClick={() => router.push("/database")}
        >
          <Icon as={router.pathname === "/database" ? AiFillProfile : AiOutlineProfile} w={6} h={6} mb={2} />
          <Text fontSize={13} fontWeight={400}>
            {" "}
            My Database{" "}
          </Text>
        </Flex>
      </Flex>
    )
}

export default GrayLayout