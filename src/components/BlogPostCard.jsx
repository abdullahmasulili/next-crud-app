import { ButtonGroup, Card, CardBody, CardHeader, Flex, Heading, IconButton, Text } from '@chakra-ui/react'
import { EditIcon, ViewIcon } from '@chakra-ui/icons'

export default function BlogPostCard({ post }) {
  return (
    <>
        <Card>
            <CardHeader>
                <Flex justifyContent='space-between' alignItems='center' gap='5'>
                    <Heading size='sm' fontWeight='500' textTransform='capitalize'>{ post.title }</Heading>
                    <ButtonGroup variant='outline' spacing='2' size='sm'>
                        <IconButton size='md' icon={<ViewIcon/>}/>
                        <IconButton size='md' icon={<EditIcon/>}/>
                    </ButtonGroup>
                </Flex>
            </CardHeader>
        </Card>
    </>
  )
}
