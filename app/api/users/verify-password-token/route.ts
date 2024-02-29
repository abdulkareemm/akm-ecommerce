import PasswordResetToken from "@models/passwordResetTokenModel";
import { ResetPasswordLinkVerifyRequest } from "@/app/types";
import { connectDB } from "@lib/db";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

connectDB();

export const POST = async (req: Request) => {
  try {
    const { token, userId } =
      (await req.json()) as ResetPasswordLinkVerifyRequest;
    if (!isValidObjectId(userId) || !token) {
      return NextResponse.json(
        { error: "Invalid request, userId and token is required!" },
        { status: 401 }
      );
    }
    const verifyToken = await PasswordResetToken.findOne({
      user: userId,
    });
    if (!verifyToken) {
      return NextResponse.json({ error: "Invalid token!" }, { status: 401 });
    }
    const isMatched = await verifyToken.compareToken(token);
    if (!isMatched) {
      return NextResponse.json(
        { error: "Invalid token, token doesn't match!" },
        { status: 401 }
      );
    }
    return NextResponse.json({ verifyToken: true });
  } catch (error) {
    return NextResponse.json(
      {
        error: "could not reset password, something went wrong!",
      },
      { status: 500 }
    );
  }
};
