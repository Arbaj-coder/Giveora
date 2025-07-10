import PaymentPage from '@/component/PaymentPage'
import { notFound } from 'next/navigation'
import connectDb from '@/db/connectDb'
import User from '@/models/User'
import Navbar from '@/component/Navbar'

export default async function UsernamePage({ params }) {
  await connectDb()
  const username = params.username;

  const user = await User.findOne({ username })
  if (!user) return notFound()

  return ( <> <Navbar/>
   <PaymentPage username={username} />
  </>
  )
}

export async function generateMetadata({ params }) {
  const username = params.username;
  return {
    title: `Support ${username} - Giveova`,
  }
}
