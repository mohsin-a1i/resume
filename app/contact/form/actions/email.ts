"use server"

import { ActionState, setActionError, setActionMessage } from "lib/actions"
import { errorMap } from "lib/zod/error-map"
import z from "zod"

const emailSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1)
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
      from: `${name} <${email}>`,
      to: process.env["EMAIL_USERNAME"],
      subject: "Resume Contact",
      text: message
    };

    await transporter.sendMail(mailOptions)

    return setActionMessage("Your email was sent. Will get back to you soon")
  } catch (error) {
    return setActionError((error as Error).message)
  }
}