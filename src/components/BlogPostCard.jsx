import { ButtonGroup, Card, CardBody, CardHeader, Flex, Heading } from '@chakra-ui/react'
import EditPost from './modal/EditPost'
import PostDetail from './modal/PostDetail'

export default function BlogPostCard({ post }) {
  return (
    <>
        <Card>
            <CardHeader>
                <Flex justifyContent='space-between' alignItems='center' gap='5'>
                    <Heading size='sm' fontWeight='500' textTransform='capitalize'>{ post.title }</Heading>
                    <ButtonGroup variant='outline' spacing='2' size='sm'>
                        <PostDetail post={ post }/>
                        <EditPost post={ post }/>
                    </ButtonGroup>
                </Flex>
            </CardHeader>
        </Card>
    </>
  )
}
