import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { MessageType } from "@/types/types";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const message = formData.get("message") as string;
  const jsonMessage: MessageType = JSON.parse(message);

  // Empty arr to store the image urls
  const images: string[] = [];

  // Uploading the image(s)
  const url = `https://api.cloudinary.com/v1_1/${process.env.cloud_name}/upload`;

  const allFiles = formData.getAll("files");

  for (let File of allFiles) {
    if (File === '') {
      break;
    }
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
        { status: "Not Ok", Error: error },
        { status: 400 }
      );
    }
  }


  let update = await prisma.ticket.findUnique({
    where:{
      id: jsonMessage.id
    }
  })

  if (!update) {
    return NextResponse.json({ success: false, message: "Something went wrong!"}, { status: 400 });
  }

  const newMessage = {
    name: jsonMessage.name,
    user: jsonMessage.email,
    avatar: jsonMessage.avatar,
    text: jsonMessage.text,
    date: jsonMessage.date,
    images: images
  }

  update?.ticket.push(newMessage)
  if (jsonMessage.type === "admin") {
    update!.responder = [{name: jsonMessage.name, email: jsonMessage.email, phone: "+1 234 5678 90", lang: "ENGLISH", avatar: jsonMessage.avatar}]
  }

  const updateDB = await prisma.ticket.update({
    where: {
      id: jsonMessage.id
    },
    data: {
      ticket: update.ticket as any,
      responder: update.responder as any
    }
  })

  return NextResponse.json(
    { success: true },
    { status: 200 }
  );
}
