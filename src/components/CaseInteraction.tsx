import {
  HStack,
  Box,
  Flex,
  Icon,
  Text,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { BsCaretDown, BsCaretUp } from "react-icons/bs";
import {
  IoChatbubbleOutline,
  IoShareSocialOutline,
  IoCaretDown,
  IoCaretUp,
  IoCaretUpOutline,
  IoCaretDownOutline,
  IoBookmarkOutline,
} from "react-icons/io5";
import { FiEdit } from 'react-icons/fi';
import { RiBookMarkLine } from 'react-icons/ri';
import { GrayCase, useMeQuery } from "../gql/graphql";

interface PostInteractionProps {
  postID: number;
  comments: number;
  post: Partial<GrayCase>;
}

const PostInteraction: React.FC<PostInteractionProps> = ({
  comments,
  postID,
  post,
}) => {
  const toast = useToast();
  const [{ data: me }] = useMeQuery();
  return (
    <Flex direction="row" justify="end" pr={2}>
        <Flex
          align="center"
          borderRadius="md"
          color="#000a16"
          cursor="pointer"
          _hover={{ color: "#FFBF5C",bg:'#FFEACA', borderWidth: '1px', borderColor: "#FFBF5C" }}
          mr={2}
          py={2}
          px={2}
        >
          <Icon as={FiEdit} w={5} h={5}  />
          <Text ml='1'>
            Update Case
          </Text>
        </Flex>

        <Flex
          align="center"
          borderRadius="md"
          color="#000a16"
          cursor="pointer"
          _hover={{ color: "#FFBF5C",bg:'#FFEACA', borderWidth: '1px', borderColor: "#FFBF5C" }}
          py={2}
          px={2}
        >
          <Icon as={RiBookMarkLine} w={5} h={5}  />
          <Text ml='1'>
            Archive Case
          </Text>
        </Flex>
      </Flex>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(PostInteraction);
