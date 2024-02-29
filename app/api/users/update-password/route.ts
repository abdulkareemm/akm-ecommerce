import PasswordResetToken from "@models/passwordResetTokenModel";
import {
  ResetPasswordLinkVerifyRequest,
  UpdatePasswordRequest,
} from "@/app/types";
import { connectDB } from "@lib/db";
import { NextResponse } from "next/server";
import UserModel from "@/app/models/userModel";
import { sendEmail } from "@/app/helpers/sendEmail";

connectDB();

export const POST = async (req: Request) => {
  try {
    const { token, userId, password } =
      (await req.json()) as UpdatePasswordRequest;
    const user = await UserModel.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found!" }, { status: 404 });
    }
    user.password = password;
    await user.save();
    await PasswordResetToken.findOneAndDelete({ userId: user._id });
    await sendEmail({
      to: user.email,
      subject: "Password changed",
      text: ``,
      html: `<div><h1>Your password is now changed.</h1>
      </div>`,
    });
    return NextResponse.json({
      message: "Your password is now changed",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "could not reset password, something went wrong!",
      },
      { status: 500 }
    );
  }
};
