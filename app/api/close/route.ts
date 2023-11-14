import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
export async function POST(request: NextRequest) {
  const req = await request.json()

  let findTicket = await prisma.ticket.findUnique({
    where:{
      id: req.ticket
    }
  })
  let removed;
  if (findTicket?.userMail === req.user || req.type === "admin") {
    delete findTicket?.id
    findTicket!.status = "closed"
    const updateDB = await prisma.ticket.update({
    where:{
      id: req.ticket
    },
    data: findTicket
  })
  removed = true
  }else{
    removed = false
  }

  const message = removed === true ? "Closed" : "Failed to close"
  return NextResponse.json(
    { success: removed, ticket: message},
    { status: 200 }
  );
}
