import { Container, Heading, Card, CardHeader, Flex, Stack } from '@chakra-ui/react'
import Head from 'next/head'
import BlogPostCard from '@/components/BlogPostCard'
import styles from '@/styles/Home.module.css'
import { fetchPosts } from './api/posts'
import CreatePost from '@/components/modal/CreatePost'
import { useQuery } from '@tanstack/react-query'

export default function Home() {
  const postQuery = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts
  })
  
  if(postQuery.isLoading) {
    return <p>Loading...</p>
  }

  if(postQuery.isError) {
    return <p>Error Fetching Data</p>
  }
  
  return (
    <>
      <Head>
        <title>Next CRUD App</title>
        <meta name="description" content="IMP Studio Test Case App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Container>
          <Card marginBottom='15'>
            <CardHeader>
              <Flex justifyContent='space-between' alignItems='center'>
                <Heading size='md'>Blog Posts</Heading>
                <CreatePost />
              </Flex>
            </CardHeader>
          </Card>

          <Stack spacing='4'>
            {postQuery.data.map((post) => (
              <BlogPostCard key={post.id} post={post}/>
            ))}
          </Stack>
        </Container>
      </main>
    </>
  )
}
