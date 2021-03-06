import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'
import prisma from '../../../utils/prisma'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try{

  const session = await getSession({ req })
 
  const profile = await prisma.user.findFirst({
    where: { 
      email: session?.user.email
    },
    include:{
        profile: true,
    }
  })
  res.status(200)
  res.json({profile})
    }catch(error){
      res.status(500)
      res.json({error: "Unable to Fetch"})
    }
 
}
