import { getServerSession } from "next-auth/next"
import { authOptions } from './api/auth/[...nextauth]'



export async function getServerSideProps({ req, res }) {
  return {
    props: {
      session: await getServerSession(req, res, authOptions)
    }
  }
}