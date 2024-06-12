import z from "zod";

export const errorMap: z.ZodErrorMap = (issue, ctx) => {
  if (issue.code === z.ZodIssueCode.too_small) {
    if (issue.minimum === 1) return { message: "Required" }
    else return { message: `Must be at least ${issue.minimum} characters` }
  }

  return { message: ctx.defaultError }
}

