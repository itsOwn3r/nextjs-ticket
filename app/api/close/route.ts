import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
export async function POST(request: NextRequest) {
  const req = await request.json();

if (!req.ticket || !req.user) {
  return NextResponse.json({ success: false, message: "Something went wrong!"}, { status: 400 });
}

  let findTicket = await prisma.ticket.findUnique({
    where:{
      id: req.ticket
    }
  })
  let removed;
  if ((findTicket?.userMail === req.user) || req.type === "admin") {
    const updateDB = await prisma.ticket.update({
    where:{
      id: req.ticket
    },
    data: { status : "closed" }
  })
  removed = true;
  }else{
    removed = false;
  }

  const message = removed === true ? "Closed" : "Failed to close";
  return NextResponse.json(
    { success: removed, ticket: message},
    { status: 200 }
  );
}
