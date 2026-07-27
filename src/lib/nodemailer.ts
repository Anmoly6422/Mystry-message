import nodemailer from "nodemailer";

console.log("ENV CHECK:", process.env.GMAIL_USER, process.env.GMAIL_APP_PASSWORD);

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});