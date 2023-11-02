import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'
import LogUp from './Form'

const Page = async () => {
        const session = await getServerSession() 
        if (session?.user?.name !== undefined) {
          redirect("/")
        }

  return (
    <LogUp type='login' />
  )
}

export default Page