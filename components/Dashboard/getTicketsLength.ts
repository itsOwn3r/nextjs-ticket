
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/prisma/client";
import { TicketTypeFixed } from "@/types/types";
import { getServerSession } from "next-auth/next";

export const getTicketsLength: () => Promise<number> = async () => {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    let tickets;
    if (session?.user?.type === "admin") {
      tickets = await prisma.ticket.count();
     }else{
      tickets = await prisma.ticket.count({
        where: {
          userMail: email,
        },
      });
    }
    return tickets;
  }