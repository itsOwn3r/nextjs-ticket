import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const ticket = JSON.parse(formData.get("data"));

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

  ticket.ticket[0].images = images
  const checkData = {
    title: ticket.title,
    ticket: ticket.ticket,
    tag: ticket.tags,
    userName: ticket.opener,
    userMail: ticket.openerEmail,
    department: ticket.department,
    priority: ticket.priority,
    date: Math.ceil(Date.now() / 1000)
  }


 const createTicket = await prisma.ticket.create({
    data: checkData
  })

ticket.images = images;
  return NextResponse.json(
    { success: true, ticket: ticket, path: createTicket.id },
    { status: 201 }
  );
}
