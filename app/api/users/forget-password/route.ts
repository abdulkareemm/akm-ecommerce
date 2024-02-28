import UserModel from "@models/userModel"
import { ForgetPasswordRequest } from "@types"
import { NextResponse } from "next/server"



export const POST = async(req:Request)=>{
    const {email} = await req.json() as ForgetPasswordRequest
    if(!email) return NextResponse.json({error:"Invalid email"},{status:401})
    const user = await UserModel.findOne({email})
    if (!user)
      return NextResponse.json({ error: "user not found" }, { status: 404 });

}