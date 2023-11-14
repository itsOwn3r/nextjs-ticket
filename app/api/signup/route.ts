import { createHmac } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function POST(resuqest: NextRequest) {
    const {email, password, name} = await resuqest.json()
    if (!email || !password || !name) {
        return NextResponse.json({error: "Something Went Wrong!"})
    }
                  const hash = createHmac('sha256', process.env.SECRET!)
                         .update(password)
                         .digest('hex');
    try {
    const createUser = await prisma.user.create({
        data:{
            name:name,
            email:email,
            password: hash
        }
    })
    if (createUser) {
        return NextResponse.json({success: true, email: email, name:name})
    }    
    } catch (error) {
        
    return NextResponse.json({success: false})
    }                 

}