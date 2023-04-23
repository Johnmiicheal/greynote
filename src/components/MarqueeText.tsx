import { Flex, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useState } from "react";

interface MarqueeTextProps {
    text: string,
    direction: string
}
const MarqueeText: React.FC<MarqueeTextProps> = ({ text, direction }) => {
    const [vector, setVector] = useState("-100%")
    if(direction === "right"){
        setVector("100%")
    }
  return (
    <Flex w="100%" overflow="hidden">
      <motion.div
        animate={{ x: vector }}
        transition={{ duration: 10, repeat: Infinity }}
      >
        <Text whiteSpace="nowrap">{text}</Text>
      </motion.div>
    </Flex>
  );
};

export default MarqueeText;
