import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;

    console.log(email, password);

    if (!email || !password) {
      return NextResponse.json(
        { message: "You must provide the credentials!" },
        { status: 400 }
      );
    }

    const isUser = await User.findOne({ email });

    if (!isUser) {
      return NextResponse.json(
        { message: "Invalid email address" },
        { status: 400 }
      );
    }

    const isMatch = await bcrypt.compare(password, isUser.password);

    if (!isMatch) {
      return NextResponse.json(
        { message: "Password wrong! Please enter correct password." },
        { status: 400 }
      );
    }

    const payload = {
      id: isUser._id,
      username: isUser.username,
      email: isUser.email,
    };

    const jwtToken = process.env.JWT_TOKEN;
    if (!jwtToken) {
      throw new Error("JWT token is not defined in environment variables");
    }

    const token = jwt.sign(payload, jwtToken, {
      expiresIn: "1d",
    });

    const response = NextResponse.json(
      { message: "User successfully logged in!", token: token },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      maxAge: 86400,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
