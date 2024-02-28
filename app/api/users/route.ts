import UserModel from "@models/userModel";
import { NewUserRequest } from "@types";
import { connectDB } from "@lib/db";
import { NextResponse } from "next/server";
import EmailVerificationToken from "@/app/models/emailVerificationModel";
import { sendEmail } from "@helpers/sendEmail";
import crypto from "crypto";

connectDB();

export const POST = async (req: Request) => {
  try {
    const body = (await req.json()) as NewUserRequest;
    // check if user is already registered
    const user = await UserModel.findOne({ email: body.email });
    if (user) {
      throw new Error(`Already registered ${user.email}`);
    }
    // create a new user
    const newUser = await UserModel.create({
      ...body,
    });
    // generate token
    const token = crypto.randomBytes(34).toString("hex");
    await EmailVerificationToken.create({
      user: newUser._id,
      token,
    });
    // //  send email verification
    const verifyURL = `http:/localhost:3000/verify?token=${token}&userId=${newUser._id}`;
    await sendEmail({
      to: newUser.email,
      subject: "Email verification",
      text: ``,
      html: `<div><h1>Please verify your email by clicking on <a href="${verifyURL}">this link</a></h1>
      </div>`,
    });
    return NextResponse.json({
      message:
        "User created successfully, Please check your email for verification your account.",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
