import React from 'react'
import Home from "@/app/components/Home/Home";
import prisma from '@/prisma/client';

const Page = async ({params}: {params: {ticket: string[]}}) => {
    const ticketID = params.ticket[0]
    try {
        const data = await prisma.ticket.findUnique({
            where: {
                id: ticketID
            }
        })

  return (
      <Home ticket={data} documentTitle={data?.title} />
      )
    } catch (error) {
        console.log(error)
        return <div>Something went reallllly wrong :((</div>
    }
    
}


export default Page