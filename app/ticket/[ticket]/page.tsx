import React from 'react'
import Home from "@/components/Home/Home";
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';

const Page = async ({params}: {params: {ticket: string}}) => {
    const ticketID = params.ticket
    if (!ticketID) {
        return notFound();
    }
    try {
        const data = await prisma.ticket.findUnique({
            where: {
                id: ticketID
            }
        });

        if(!data){
            return notFound();
        }
  return (
      <Home ticket={data} documentTitle={data?.title} />
      )
    } catch (error) {
        console.log(error)
        return <div>Something went reallllly wrong :((</div>
    }
    
}


export default Page