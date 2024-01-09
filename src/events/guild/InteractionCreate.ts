import { type Interaction, type CacheType } from 'discord.js';
import type { SlashCommand, SlashCommandInteraction } from '@/types/command';
import { Logger } from '@/lib/logger';
import { type DiscordClient } from '@/lib/client';

/**
 * Application command event
 */
export default async (interaction: Interaction<CacheType>) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  await executeSlashCommand(commandName, interaction);
};

/**
 * Execute a slash command
 * @param commandName  The name of the command
 * @param interaction  The interaction object
 */
async function executeSlashCommand(commandName: string, interaction: SlashCommandInteraction) {
  try {
    const client = interaction.client as DiscordClient;
    const commandConfig = client.slashConfigs.find((command) => command.name === commandName);

    if (!commandConfig) {
      Logger.warn(`Slash command "${commandName}" not found in config`);
      await interaction.reply({
        content: 'This command is not available!',
        ephemeral: true,
      });
      return;
    }

    const { command }: { command: SlashCommand } = (
      await import(`@/commands/slash/${commandConfig.fileName}`)
    ).default;
    await command.execute(interaction);
  } catch (error) {
    Logger.error(`Error executing slash command "${commandName}": \n\t${error}`);
    await interaction.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true,
    });
  }
}
