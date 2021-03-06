import { GetStaticProps } from 'next'
import React from 'react'
import LikeWidget from '../components/LikeWidget'
import PostCard from '../components/post/PostCard'
import Posts from '../components/post/Posts'
import prisma from '../utils/prisma'

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: {
      published: true,
    },
    include: {
      comments: true,
      likes: true,
      author: {
        select: {
          name: true,
          email: true,

        },
      },
    },
    orderBy: [
      { updatedAt: 'desc' },
      { createdAt: 'desc' },
    ]
  })
  return {
    props: { feed: JSON.parse(JSON.stringify(feed)) },
  }
}

type Props = {
  feed: PostProps[]
}

const Index = (props: Props) => {

  return (

    <>
      <div className="card_grid">
        {props.feed.map((post) => (
          <Posts key={post.id} post={post} />
        ))}



      </div>

    </>
  )
}

export default Index
