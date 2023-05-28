import { SlashCommand } from '@/types/command';
import { PermissionFlagsBits as Permissions } from 'discord.js';

const command: SlashCommand = {
  // permissions: 0,
  execute: async (interaction) => {
    const ping = await interaction.reply({ content: 'Pinging...', fetchReply: true });

    const emoji = interaction.options.get('emoji')?.value ?? '🏓';

    await interaction.editReply(
      `Pong ${emoji}! Latency is ${ping.createdTimestamp - interaction.createdTimestamp}ms.`
    );
  },
};

export default command;
