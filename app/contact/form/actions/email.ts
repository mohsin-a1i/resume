"use server"

import { ActionBuilder } from "components/actions/builder"
import z from "zod"

const emailSchema = z.object({
  name: z.string(),
  email: z.string()
    .min(1, { message: "Need an email address to respond" })
    .email({ message: "The email address doesn't seem to be correct" }),
  message: z.string().min(1, { message: "Need a brief introduction" })
})

export const email = new ActionBuilder<typeof emailSchema>()
  .schema(emailSchema)
  .action(async ({ name, email, message }) => {
    const nodemailer = require("nodemailer")

    const transporter = nodemailer.createTransport({
      service: process.env["EMAIL_SERVICE"],
      auth: {
        user: process.env["EMAIL_USERNAME"],
        pass: process.env["EMAIL_PASSWORD"]
      }
    })

    const mailOptions = {
      from: `Resume <${process.env["EMAIL_USERNAME"]}>`,
      to: process.env["EMAIL_USERNAME"],
      subject: "Contact Me",
      text: `name: ${name}\nemail: ${email}\nmessage: ${message}`
    }

    //await transporter.sendMail(mailOptions)

    await new Promise(resolve => setTimeout(resolve, 5000))
  })