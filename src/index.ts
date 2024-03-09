import { handleEvents } from "@/handlers/eventHandler"
import { loadSlashCommands } from "@/loaders/slashCommands"
import { GatewayIntentBits, REST, Routes } from "discord.js"

import { DiscordClient } from "@/lib/client"
import { Logger } from "@/lib/logger"

import { env } from "./env"

const client = DiscordClient.getInstance({
  intents: [GatewayIntentBits.Guilds],
})

// Refresh application slash commands
const rest = new REST({ version: "10" }).setToken(env.DISCORD_TOKEN)
;(async () => {
  try {
    Logger.debug("Started refreshing application (/) commands.")

    const { slashCommands, slashConfigs } = await loadSlashCommands()

    const res: any = await rest.put(
      Routes.applicationCommands(env.DISCORD_APP_ID!),
      {
        body: slashCommands,
      }
    )

    client.slashConfigs = slashConfigs

    Logger.debug(`Successfully reloaded ${res.length} (/) commands.`)
    client.login(env.DISCORD_TOKEN)
  } catch (error) {
    Logger.error(`Error refreshing application (/) commands: \n\t${error}`)
  }
})()

// Handle application events
handleEvents()
