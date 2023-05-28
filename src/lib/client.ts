import { Client, ClientOptions } from 'discord.js';

/**
 * Singleton Discord client.
 */
export class DiscordClient extends Client {
  private static instance: DiscordClient;

  private constructor(options: ClientOptions) {
    super(options);
  }

  /**
   * Get the current instance of the Discord client. If no instance exists, a new one is created.
   * @param options Discord client options to use when creating a new instance.
   * @returns `DiscordClient` Discord client instance.
   */
  public static getInstance(options?: ClientOptions): DiscordClient {
    if (!DiscordClient.instance) {
      const defaultOptions: ClientOptions = {
        intents: [],
      };

      DiscordClient.instance = new DiscordClient(options || defaultOptions);
    }

    return DiscordClient.instance;
  }
}
