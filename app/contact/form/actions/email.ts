"use server"

import { ActionState, setActionError, setActionMessage } from "lib/actions"
import { errorMap } from "lib/zod/error-map"
import z from "zod"

const emailSchema = z.object({
  name: z.string(),
  email: z.string()
    .min(1, { message: "Need an email address to respond" })
    .email({ message: "The email address doesn't seem to be correct" }),
  message: z.string().min(1, { message: "Need a brief introduction" })
})

export async function email(currentState: ActionState<typeof emailSchema>, actionData: FormData): Promise<ActionState<typeof emailSchema>> {
  const { success, data, error } = emailSchema.safeParse(Object.fromEntries(actionData), { errorMap })
  if (!success) return { error: error.format() }
  const { name, email, message } = data

  try {
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
    };

    await transporter.sendMail(mailOptions)

    return setActionMessage("Thanks for reaching out. Will get back to you soon!")
  } catch (error) {
    return setActionError((error as Error).message)
  }
}