import path from 'path';
import { Interaction, CacheType } from 'discord.js';
import { SlashCommand, SlashCommandConfig, SlashCommandInteraction } from '@/types/command';
import { Logger } from '@/lib/logger';
import _slashCommandsConfig from '@config/slashCommands.json';

const slashCommandsConfig = _slashCommandsConfig as SlashCommandConfig[];

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
    const commandConfig = slashCommandsConfig.find((command) => command.name === commandName);

    if (!commandConfig) {
      Logger.warn(`Slash command '${commandName}' not found in config`);
      await interaction.reply({
        content: 'This command is not available!',
        ephemeral: true,
      });
      return;
    }

    let commandPath = commandName;

    if (commandConfig.category !== undefined) {
      commandPath = path.join(commandConfig.category, commandPath);
    }

    commandPath = path.join('slash/', commandPath);
    const commandModule: SlashCommand = (await import(`@/commands/${commandPath}`)).default;
    await commandModule.execute(interaction);
  } catch (error) {
    Logger.error(`Error executing slash command '${commandName}': \n\t${error}`);
    await interaction.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true,
    });
  }
}
