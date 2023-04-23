import { Flex, Icon, Text, Image } from "@chakra-ui/react"
import { AiFillHome, AiOutlineHome, AiOutlineProfile, AiFillProfile } from "react-icons/ai"
import { RiContactsBookFill, RiContactsBookLine } from "react-icons/ri"
import { useRouter } from "next/router"
import { useMeQuery } from "../gql/graphql"

const GrayLayout = () => {
  const [{ data: me }] = useMeQuery();
  const router = useRouter();

  const links = [
    { path: "/app", iconActive: AiFillHome, iconInactive: AiOutlineHome, text: "Home" },
    { path: "/app/graycase", iconActive: RiContactsBookFill, iconInactive: RiContactsBookLine, text: "Graycase", isAdmin: true },
    { path: "/app/database", iconActive: AiFillProfile, iconInactive: AiOutlineProfile, text: "My Database", isAdmin: true },
  ];

  return (
    <Flex
      direction="column"
      bg="#212121"
      minH="full"
      w="130px"
      pos="fixed"
      mx="auto"
      px={5}
      py={4}
      align="center"
      justify="start"
      zIndex={5}
    >
      <Image src="/grayaxis.png" alt="grayaxis" minW="80px" pointerEvents='none' />

      {links.map((link) => (
        (link.isAdmin && me?.me?.admin) || !link.isAdmin ?
        <Flex
          key={link.path}
          direction="column"
          mt={10}
          w="full"
          py={2}
          align="center"
          role="group"
          _hover={{ color: "#8E6930", bg: "#FFCE83" }}
          borderRadius="md"
          cursor="pointer"
          color={router.pathname === link.path ? "#FFCE83" : "gray.200"}
          onClick={() => router.push(link.path)}
        >
          <Icon as={router.pathname === link.path ? link.iconActive : link.iconInactive} w={6} h={6} mb={2} />
          <Text fontSize={13} fontWeight={router.pathname === link.path ? 500 : 400}>
            {link.text}
          </Text>
        </Flex> : null
      ))}
    </Flex>
  );
}

export default GrayLayout;
