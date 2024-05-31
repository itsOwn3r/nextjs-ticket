import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/prisma/client";
import { TicketTypeFixed } from "@/types/types";
import { getServerSession } from "next-auth/next";

export const getTickets: (page: number) => Promise<TicketTypeFixed> = async (page: number) => {
    const skip = page * 10; // It will be showing 10 tickets per page
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
     let tickets;
  
     if (session?.user?.type === "admin") {
      tickets = await prisma.ticket.findMany({
        orderBy: {
          date: "desc"
        },
        skip: skip,
        take: 10,
      });
  
     }else{
      tickets = await prisma.ticket.findMany({
        where: {
          userMail: email,
        },
        orderBy: {
          date: "desc"
        },
        skip: skip,
        take: 10,
      });
    }
  
    tickets = tickets.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      }else{
        return -1;
      }
    })
    return tickets;
  }