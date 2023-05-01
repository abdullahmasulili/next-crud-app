import { Heading, IconButton, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Stack, Text, useDisclosure } from '@chakra-ui/react'
import { MdRemoveRedEye } from 'react-icons/md'

export default function PostDetail({ post }) {
    const { onOpen, onClose, isOpen } = useDisclosure()
    return (
        <>
            <IconButton variant='solid' size='sm' icon={<MdRemoveRedEye />} onClick={onOpen} />
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <Heading size='md'>Post ID: { post.id }</Heading>
                    </ModalHeader>
                    <ModalBody>
                        <Stack spacing='3'>
                            <Heading size='md'>{post.title}</Heading>
                            <Heading size='sm' fontWeight='500'>User ID: {post.userId}</Heading>
                            <Text>{post.body}</Text>
                        </Stack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
