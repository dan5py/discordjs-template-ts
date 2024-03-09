import type {
  CacheType,
  ChatInputCommandInteraction,
  MessageContextMenuCommandInteraction,
  PermissionsBitField,
  SlashCommandAttachmentOption,
  SlashCommandBooleanOption,
  SlashCommandChannelOption,
  SlashCommandIntegerOption,
  SlashCommandMentionableOption,
  SlashCommandNumberOption,
  SlashCommandRoleOption,
  SlashCommandStringOption,
  SlashCommandUserOption,
  UserContextMenuCommandInteraction,
} from "discord.js"

export type SlashCommandOption =
  | SlashCommandAttachmentOption
  | SlashCommandBooleanOption
  | SlashCommandChannelOption
  | SlashCommandIntegerOption
  | SlashCommandMentionableOption
  | SlashCommandNumberOption
  | SlashCommandRoleOption
  | SlashCommandStringOption
  | SlashCommandUserOption

export type SlashCommandInteraction =
  | ChatInputCommandInteraction<CacheType>
  | MessageContextMenuCommandInteraction<CacheType>
  | UserContextMenuCommandInteraction

export interface SlashCommand {
  permissions?: (typeof PermissionsBitField.Flags)[keyof typeof PermissionsBitField.Flags]
  execute: (interaction: SlashCommandInteraction) => Promise<void>
}

export interface SlashCommandOptionConfig {
  name: string | undefined
  description: string | undefined
  type:
    | "STRING"
    | "INTEGER"
    | "BOOLEAN"
    | "USER"
    | "CHANNEL"
    | "ROLE"
    | "MENTIONABLE"
    | "NUMBER"
    | "ATTACHMENT"
  required?: boolean
}

export interface SlashCommandStringOptionConfig
  extends SlashCommandOptionConfig {
  type: "STRING"
  choices?: StringOptionChoice[]
}

export interface SlashCommandNumberOptionConfig
  extends SlashCommandOptionConfig {
  type: "INTEGER" | "NUMBER"
  choices?: NumberOptionChoice[]
  minValue?: number
  maxValue?: number
}

export interface StringOptionChoice {
  name: string
  value: string
}

export interface NumberOptionChoice {
  name: string
  value: number
}

export interface SlashCommandConfig {
  name?: string | undefined
  description: string | undefined
  options?: (
    | SlashCommandOptionConfig
    | SlashCommandStringOptionConfig
    | SlashCommandNumberOptionConfig
  )[]
  nsfw?: boolean
  category?: string
  usage?: string
  /**
   * Used to execute the command after loading it
   */
  fileName?: string
}
