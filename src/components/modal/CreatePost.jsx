import {
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Textarea,
    useDisclosure,
} from "@chakra-ui/react";
import { MdClose, MdOutlineSave } from 'react-icons/md'

export default function CreatePost() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Button size="sm" variant="solid" colorScheme="teal" onClick={onOpen}>
                Create Post
            </Button>
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create New Post</ModalHeader>
                    <ModalBody>
                        <Stack spacing='5'>
                            <FormControl>
                                <FormLabel>Title</FormLabel>
                                <Input type="text" required/>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Body</FormLabel>
                                <Textarea required/>
                            </FormControl>
                        </Stack>
                    </ModalBody>
                    <ModalFooter>
                        <Flex justifyContent='end' gap='3'>
                            <Button size="sm" colorScheme="gray" leftIcon={<MdClose />} onClick={onClose}>
                                Close
                            </Button>
                            <Button size="sm" colorScheme="teal" variant="outline" leftIcon={<MdOutlineSave />}>
                                Save
                            </Button>
                        </Flex>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
