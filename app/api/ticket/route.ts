import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { TicketType } from "@/types/types";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const ticket = formData.get("data") as string;
  const ticketJson: TicketType = JSON.parse(ticket);

  // Empty arr to store the image urls
  const images: string[] = [];

  // Uploading the image(s)
  const url = `https://api.cloudinary.com/v1_1/${process.env.cloud_name}/upload`;

  const allFiles = formData.getAll("files");

  for (let File of allFiles) {
    const secondFormData = new FormData();
    secondFormData.append("file", File);
    secondFormData.append("upload_preset", process.env.upload_preset!);
    
    try {
      const req = await fetch(url, {
        method: "POST",
        body: secondFormData,
      });
      const response = await req.json();
      if (response.secure_url) {
        images.push(response.secure_url);
      }

    } catch (error) {
      return NextResponse.json(
        { status: "Not Ok", success: false, Error: error },
        { status: 400 }
      );
    }
  }

  ticketJson.ticket[0].images = images
  const checkData = {
    title: ticketJson.title,
    ticket: ticketJson.ticket,
    tag: ticketJson.tags,
    userName: ticketJson.opener,
    userMail: ticketJson.openerEmail,
    department: ticketJson.department,
    priority: ticketJson.priority,
    date: Math.ceil(Date.now() / 1000)
  }


 const createTicket = await prisma.ticket.create({
    data: checkData
  })

  ticketJson.images = images;
  return NextResponse.json(
    { success: true, ticket: ticketJson, path: createTicket.id },
    { status: 201 }
  );
}
