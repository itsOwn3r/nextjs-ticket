import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextApiRequest } from "next";
import { authOptions } from "../auth/[...nextauth]/route";
export async function POST(request: NextRequest, req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { status: "Not Ok", success: false, Error: "Unauthorized" },
      { status: 401 }
    );
  }
  const userEmail = session?.user.email;
  const formData = await request.formData();
  
  const email = formData.get("email");
  // console.log(email);
// return;
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
// console.log(images[0]);

  const user = await prisma.user.findUnique({
    where:{
      email: userEmail
    }
  })

  if (user?.email !== email as string) {
    return NextResponse.json({ status: "Not Ok", success: false, Error: "Unauthorized" },{ status: 401 });
  }

  // updating the db
  const updateDB = await prisma.user.update({
    where:{
        email: email as string
    },
    data: {
      avatar: images[0]
    }
  })

  return NextResponse.json(
    { success: true, avatar:images[0] },
    { status: 200 }
  );
}
