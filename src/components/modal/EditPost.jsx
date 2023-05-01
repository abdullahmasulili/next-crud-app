import { Button, Flex, FormControl, FormErrorMessage, FormLabel, IconButton, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Textarea, useDisclosure } from "@chakra-ui/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { MdClose, MdEditNote, MdOutlineSave } from "react-icons/md"
import { editPost } from '@/pages/api/posts'
import { useForm } from "react-hook-form"

export default function EditPost({ post }) {
    const queryClient = useQueryClient()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            title: post.title,
            body: post.body
        }
    })
    const editPostMutation = useMutation({
        mutationFn: editPost,
        onSuccess: (data) => {
            queryClient.setQueryData(['posts'], (prevData) => {
                const updateData = prevData.map(post => {
                    if(post.id === data.id) {
                        return data
                    } else {
                        return post
                    }
                })

                return updateData
            })
            
            onClose()
        },
    })

    async function onSubmit(data) {
        const newData = {
            ...post,
            title: data.title,
            body: data.body
        }
        
        editPostMutation.mutate(newData)
    }
    
    return (
        <>
            <IconButton size="sm" variant="solid" icon={<MdEditNote />} onClick={onOpen} />
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalHeader>Edit Post</ModalHeader>
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
                                        maxLength: { value: 255, message: 'Max Char is 255' }
                                    })} />
                                    <FormErrorMessage>
                                        {errors.body && errors.body.message}
                                    </FormErrorMessage>
                                </FormControl>
                            </Stack>
                        </ModalBody>
                        <ModalFooter>
                            <Flex justifyContent='end' gap='3'>
                                <Button size="sm" colorScheme="gray" leftIcon={<MdClose />} onClick={onClose} isDisabled={editPostMutation.isLoading}>
                                    Close
                                </Button>
                                <Button size="sm" colorScheme="teal" variant="outline" leftIcon={<MdOutlineSave />} isLoading={editPostMutation.isLoading} type="submit">
                                    Save
                                </Button>
                            </Flex>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    )
}
