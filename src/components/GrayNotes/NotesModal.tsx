import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Button,
  Flex,
  Text,
  useToast,
  Textarea,
  Avatar,
  Input,
  Select,
  IconButton
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { fakenotes } from "../../../fakedata";
import { useRouter } from "next/router";
import { useGetNotesQuery, useMeQuery } from "../../gql/graphql";
import { IoCaretDown, IoTrashBin } from "react-icons/io5";

interface NotesModalProps{
    id: number,
    isOpen: any,
    onClose: any
}

export const NotesModal: React.FC<NotesModalProps> = ({ isOpen, onClose, id}) => {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const router = useRouter();
  const toast = useToast();
  const [{ data: notes }] = useGetNotesQuery({
    variables: {
        getNotesId: id
    }
  })
  const [{ data }] = useMeQuery();
  const admin = data?.me?.admin!;
  const note = notes?.getNotes?.notes!;

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader bg="#F4B95F" borderRadius="7px 7px 0 0">My Notes</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
            <Flex direction="column">
                <Text mb={4} fontWeight={600} color="black">{note?.title}</Text>
                <Text>{note?.body}</Text>
            </Flex>
        </ModalBody>
        <ModalFooter>
            <IconButton icon={<IoTrashBin />} colorScheme="red" aria-label="delete note" />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );    
};
