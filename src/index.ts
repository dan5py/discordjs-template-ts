import dotenv from 'dotenv';
// Load .env file
dotenv.config();

import '@/lib/aliases';
import { GatewayIntentBits, REST, Routes } from 'discord.js';
import { DiscordClient } from '@/lib/client';
import { Logger } from '@/lib/logger';
import { loadSlashCommands } from '@/loaders/slashCommands';
import { handleEvents } from '@/handlers/eventHandler';

if (process.env.DISCORD_TOKEN === undefined) {
  throw new Error('DISCORD_TOKEN is not defined');
}
if (process.env.DISCORD_APP_ID === undefined) {
  throw new Error('DISCORD_APP_ID is not defined');
}

const client = DiscordClient.getInstance({
  intents: [GatewayIntentBits.Guilds],
});

// Refresh application slash commands
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
(async () => {
  try {
    Logger.debug('Started refreshing application (/) commands.');

    const slashCommands = await loadSlashCommands();

    const res: any = await rest.put(Routes.applicationCommands(process.env.DISCORD_APP_ID!), {
      body: slashCommands,
    });

    Logger.debug(`Successfully reloaded ${res.length} (/) commands.`);
    client.login(process.env.DISCORD_TOKEN);
  } catch (error) {
    Logger.error(`Error refreshing application (/) commands: \n\t${error}`);
  }
})();

// Handle application events
handleEvents();
