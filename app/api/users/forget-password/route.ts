import PasswordResetToken from "@models/passwordResetTokenModel"
import UserModel from "@models/userModel"
import { ForgetPasswordRequest } from "@types"
import { NextResponse } from "next/server"
import crypto from "crypto"
import { sendEmail } from "@helpers/sendEmail"



export const POST = async(req:Request)=>{
    try {
        const { email } = (await req.json()) as ForgetPasswordRequest;
        if (!email)
          return NextResponse.json({ error: "email is mismatch" }, { status: 401 });
        const user = await UserModel.findOne({ email });
        if (!user)
          return NextResponse.json(
            { error: "user not found" },
            { status: 404 }
          );

        // generate the token and send it to the given email
        await PasswordResetToken.findOneAndDelete({ user: user._id });
        const token = crypto.randomBytes(36).toString("hex");
        await PasswordResetToken.create({
          token,
          user: user._id,
        });
        const resetPasswordLink = `${process.env.PASSWORD_RESET_URL}?token=${token}&userId=${user._id}`;
        await sendEmail({
          to: email,
          subject: "Reset Password",
          text: ``,
          html: `<div><h1>Click on  <a href="${resetPasswordLink}">this link</a> to reset your password.</h1>
      </div>`,
        });
        return NextResponse.json({
          message: "Please check your email.",
          success: true,
        });
    } catch (error) {
        return NextResponse.json({error:(error as any).message},{status:500});       
    }

}