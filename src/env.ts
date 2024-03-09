import dotenv from "dotenv"
import { z } from "zod"

import { Logger } from "./lib/logger"

dotenv.config()

const envSchema = z.object({
  DISCORD_TOKEN: z.string(),
  DISCORD_APP_ID: z.string(),
  DEBUG: z.string().transform((val) => {
    const lower = val.toLowerCase()
    if (lower === "true" || lower === "1") return true
    return false
  }),
  NODE_ENV: z.string(),
})

function parseEnv(schema: z.ZodSchema) {
  try {
    return schema.parse(process.env)
  } catch (err) {
    if (!(err instanceof z.ZodError)) {
      Logger.error(err)
      process.exit(1)
    }

    console.error("Invalid environment variables:", err.flatten().fieldErrors)
    process.exit(1)
  }
}

export const env = parseEnv(envSchema)
