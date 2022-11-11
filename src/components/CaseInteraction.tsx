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
          borderRadius="lg"
          color="#000a16"
          cursor="pointer"
          _hover={{ color: "#8E6930", bg: "#FFCE83" }}
          mr={2}
          py={2}
          px={2}
        >
          <Icon as={IoChatbubbleOutline} w={6} h={6}  />
          <Text ml='1px'>
            Update Case
          </Text>
        </Flex>

        <Flex
          align="center"
          borderRadius="lg"
          color="#000a16"
          cursor="pointer"
          _hover={{ color: "#8E6930", bg: "#FFCE83" }}
          py={2}
          px={2}
        >
           <Icon as={IoBookmarkOutline} w={6} h={6}  />
          <Text ml='1px'>
            Archive
          </Text>
        </Flex>
      </Flex>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(PostInteraction);
