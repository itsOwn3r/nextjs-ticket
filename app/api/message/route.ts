import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const prisma = new PrismaClient()
  const formData = await request.formData();
  const message = JSON.parse(formData.get("message"));

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
      id: message.id
    }
  })


  const newMessage = {
    name: message.name,
    user: message.email,
    avatar: message.avatar,
    text: message.text,
    date: message.date,
    images: images
  }
  update?.ticket.push(newMessage)
  if (message.type === "admin") {
    update!.responder = [{name: message.name, email: message.email, phone: "+1 234 5678 90", lang: "ENGLISH", avatar: message.avatar}]
  }
  delete update?.id
  const updateDB = await prisma.ticket.update({
    where:{
      id:message.id
    },
    data: update
  })
  return NextResponse.json(
    { success: true },
    { status: 200 }
  );
}
