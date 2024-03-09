import { type DiscordClient } from "@/lib/client"
import { Logger } from "@/lib/logger"

export default async (client: DiscordClient) => {
  Logger.info(`Logged in as ${client.user?.tag}!`)
}
