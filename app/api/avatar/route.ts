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
        { status: "Not Ok", success: false, Error: error },
        { status: 400 }
      );
    }
  }
  // throwing an error if upload wasn't successful
if (images.length < 1) {
      return NextResponse.json(
    { success: false, message: "Failed to upload the Avatar" },
    { status: 400 }
  );
}

  let update = await prisma.user.findUnique({
    where:{
      email: message.user
    }
  })
  update!.avatar = images[0]

  delete update?.id
  // updating the db
  const updateDB = await prisma.user.update({
    where:{
        email: message.user
    },
    data: update
  })

  return NextResponse.json(
    { success: true, avatar:images[0] },
    { status: 200 }
  );
}
