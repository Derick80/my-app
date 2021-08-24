import React from 'react'
import { GetServerSideProps } from 'next'
import Layout from '../../components/Layout'
import Router from 'next/router'
import prisma from '../../utils/prisma'
import { useSession } from 'next-auth/client'

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(params?.id) || -1,
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  })
  return {
    props: { post: JSON.parse(JSON.stringify(post)) },
  }
}

async function publishPost(id: number): Promise<void> {
  await fetch(`http://localhost:8077/api/post/publish/${id}`, {
    method: 'PUT',
  })
  await Router.push('/')
}

async function deletePost(id: number): Promise<void> {
  await fetch(`http://localhost:8077/api/post/${id}`, {
    method: 'DELETE',
  })
  await Router.push('/')
}
type Props = {
  post: PostProps
}
const Post: React.FC<Props> = (props) => {
  console.log(props)

  const [session, loading] = useSession()
  if (loading) {
    return <div>Authenticating ...</div>
  }
  const userHasValidSession = Boolean(session)
  const postBelongsToUser = session?.user?.email === props.post.author?.email
  let title = props.post.title
  if (!props.post.published) {
    title = `${title} (Draft)`
  }

  return (
    <div>
      <h2>{title}</h2>
      <p>By {props?.post.author?.name || 'Unknown author'}</p>
      <p>{props.post.content}</p>
      {!props.post.published && userHasValidSession && postBelongsToUser && (
        <button onClick={() => publishPost(props.post.id)}>Publish</button>
      )}
      {userHasValidSession && postBelongsToUser && (
        <button onClick={() => deletePost(props.post.id)}>Delete</button>
      )}
    </div>
  )
}

export default Post