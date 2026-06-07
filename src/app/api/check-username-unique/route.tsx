import { NextResponse } from "next/server";
import * as z from "zod";

import dbconnect from "@/lib/dbconnect";
import UserModel from "@/model/User";
import { usernamevalidation } from "@/schemas/signupschema";

const UsernameQuerySchema = z.object({
  username: usernamevalidation,
});

export async function GET(request: Request) {
  await dbconnect();

  try {
    const { searchParams } = new URL(request.url);

    const username = searchParams.get("username");
    //console.log("USERNAME RECEIVED:", username);

    const result = UsernameQuerySchema.safeParse({
      username,
    });

    if (!result.success) {
      const usernameErrors =
        result.error.format().username?._errors || [];

      return NextResponse.json(
        {
          success: false,
          message:
            usernameErrors.length > 0
              ? usernameErrors.join(", ")
              : "Invalid query parameter",
        },
        { status: 400 }
      );
    }

    const { username: validatedUsername } = result.data;

    const existingVerifiedUser = await UserModel.findOne({
      username: validatedUsername,
      isVerified: true,
    });

    if (existingVerifiedUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Username is already taken",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Username is unique",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error checking username:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Error checking username",
      },
      { status: 500 }
    );
  }
}
