import { createPost } from "@/pages/api/posts";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { MdClose, MdOutlinePlaylistAdd, MdOutlineSave } from 'react-icons/md'

export default function CreatePost() {
    const queryClient = useQueryClient()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            title: '',
            body: ''
        }
    })
    const createPostMutation = useMutation({
        mutationFn: createPost,
        onMutate: async () => {
            await queryClient.cancelQueries(['posts'])
        },
        onSuccess: (data) => {
            const oldData = queryClient.getQueryData(['posts'])
            const newData = [...oldData, data]
            
            queryClient.setQueryData(['posts'], newData)

            onClose()
        }
    })
    
    async function onSubmit(data) {
        const userId = 1

        Object.assign(data, {userId: userId})
        
        createPostMutation.mutate(data)
    }
    
    return (
        <>
            <Button size="sm" variant="solid" colorScheme="teal" onClick={onOpen} leftIcon={<MdOutlinePlaylistAdd />}>
                Create Post
            </Button>
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalHeader>Create New Post</ModalHeader>
                        <ModalBody>
                            <Stack spacing='5'>
                                <FormControl isInvalid={errors.title}>
                                    <FormLabel htmlFor="title">Title</FormLabel>
                                    <Input id="title" {...register('title', { required: 'Title is required' })} />
                                    <FormErrorMessage>
                                        {errors.title && errors.title.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={errors.body}>
                                    <FormLabel htmlFor="body">Body</FormLabel>
                                    <Textarea id="body" {...register('body', {
                                        required: 'Body is required',
                                        maxLength: { value: 255, message: 'Max Char is 255'}
                                    })}/>
                                    <FormErrorMessage>
                                        {errors.body && errors.body.message}
                                    </FormErrorMessage>
                                </FormControl>
                            </Stack>
                        </ModalBody>
                        <ModalFooter>
                            <Flex justifyContent='end' gap='3'>
                                <Button size="sm" colorScheme="gray" leftIcon={<MdClose />} onClick={onClose} isDisabled={createPostMutation.isLoading}>
                                    Close
                                </Button>
                                <Button size="sm" colorScheme="teal" variant="outline" leftIcon={<MdOutlineSave />} isLoading={createPostMutation.isLoading} type="submit">
                                    Save
                                </Button>
                            </Flex>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    );
}
