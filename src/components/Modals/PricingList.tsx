import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

export const TransferStudent = ({ isOpen, onClose }: any) => {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const router = useRouter();
  const toast = useToast();

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Graybook Premium Prices</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
            <VStack>
                <Flex>
                    
                </Flex>
            </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
