import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Tooltip,
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
import { useRouter } from "next/router";
import { useGetGrayCaseQuery, useMeQuery, useGetStudentByGrayCaseQuery, useDeleteGrayCaseMutation } from "../../gql/graphql";
import { IoTrash, IoCaretDown, IoTrashBin } from "react-icons/io5";

interface CaseModalProps{
    id: number,
    isOpen: any,
    onClose: any
}

export const CaseModal: React.FC<CaseModalProps> = ({ isOpen, onClose, id}) => {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const router = useRouter();
  const toast = useToast();
  const [{ data: greyCases }] = useGetGrayCaseQuery({
    variables: {
        getGrayCaseId: id
    }
})
const cases = greyCases?.getGrayCase?.grayCase!;
  const [{data: findStudent }] = useGetStudentByGrayCaseQuery({
    variables: {
        grayId: cases?.id!
    }
  })
  const [, deleteCase] = useDeleteGrayCaseMutation();
  const [{ data }] = useMeQuery();
  const admin = data?.me?.admin!;
  const student = `${cases?.firstName} ${cases?.lastName}`;
  const _student = findStudent?.getStudentByGrayCase?.student!;
  const handleDeleteCase = async () => {
    const response =  await deleteCase({deleteGrayCaseId: id});
    if (response.error) {
      toast({
        title: "Error.",
        description: "We could not deactivate this case",
        status: "error",
        variant: "left-accent",
        duration: 5000,
        isClosable: true,
      });
      setTimeout(() => {
        router.reload();
      }, 1000)
    } else if (response.data?.deleteGrayCase === true) {
      toast({
        title: "Case Deactivated.",
        description: "We've deactivated the Case.",
        status: "success",
        variant: "left-accent",
        duration: 5000,
        isClosable: true,
      });
      setTimeout(() => {
        router.reload();
      }, 1000)
    }  
  }

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader bg="#007C7B" color="white" borderRadius="7px 7px 0 0">Case Report for {student}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
            <Flex direction="column">
                <Flex align="center" mb={4} gap={2} onClick={() => router.push(`/app/student/${_student.id}`)} cursor="pointer">
                    <Avatar src={_student?.profileImgUrl} size="md" name={student} />
                    <Flex direction="column" >
                        <Text fontWeight={600}>{student}</Text>
                        <Text fontSize={13}>{_student?.grayId} | {_student?.gradeClass}</Text>
                    </Flex>
                </Flex>
                <Text mb={4} fontWeight={600} color="black">{cases?.category}</Text>
                <Text>{cases?.note}</Text>
            </Flex>
        </ModalBody>
        <ModalFooter>
            <Tooltip label="deactivate case">
                <IconButton icon={<IoTrash />} bg="#F4B95F" onClick={handleDeleteCase} color="white" _hover={{ bg: "#8E6930"}} aria-label="deactivate case" />
            </Tooltip>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );    
};
