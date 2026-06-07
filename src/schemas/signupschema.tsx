import * as z from "zod";

export const usernamevalidation = z
  .string()
  .min(3)
  .max(20)
  .regex(/^[a-zA-Z0-9_]+$/, {
    message: "Username can only contain letters, numbers, and underscore",
  });


export const signupSchema=z.object({
    username:usernamevalidation,
    email:z
    .string()
    .email({message:"Invaild email address"}),
    password:z.string()
    .min(6,{message:"password must be atleast 6 characters"})
})
