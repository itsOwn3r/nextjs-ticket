import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'
import LogUp from '../login/Form'

const Page = async () => {
        const session = await getServerSession() 
        if (session?.user?.name !== undefined) {
          redirect("/dashboard")
        }

  return (
    <LogUp type='signup' />
  )
}

export default Page