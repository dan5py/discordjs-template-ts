import { Client, type ClientOptions } from "discord.js"

import type { SlashCommandConfig } from "@/types/command"

/**
 * Singleton Discord client.
 */
export class DiscordClient extends Client {
  private static _instance: DiscordClient
  public slashConfigs: SlashCommandConfig[] = []

  private constructor(options: ClientOptions) {
    super(options)
  }

  /**
   * Get the current instance of the Discord client. If no instance exists, a new one is created.
   * @param options Discord client options to use when creating a new instance.
   * @returns `DiscordClient` Discord client instance.
   */
  public static getInstance(
    options: ClientOptions = { intents: [] }
  ): DiscordClient {
    if (!DiscordClient._instance) {
      DiscordClient._instance = new DiscordClient(options)
    }

    return DiscordClient._instance
  }
}
