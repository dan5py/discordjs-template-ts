import { env } from "@/env"
import chalk from "chalk"

export class Logger {
  private static _getTimeStamp() {
    return `[${new Date().toISOString()}]`
  }

  public static log(...messages: any[]) {
    console.log(
      `${chalk.green("[LOG]")} ${this._getTimeStamp()} ${messages.join(" ")}`
    )
  }
  public static info(...messages: any[]) {
    console.log(
      `${chalk.blue("[INFO]")} ${this._getTimeStamp()} ${messages.join(" ")}`
    )
  }
  public static error(...messages: any[]) {
    console.error(
      `${chalk.red("[ERROR]")} ${this._getTimeStamp()} ${messages.join(" ")}`
    )
  }
  public static warn(...messages: any[]) {
    console.warn(
      `${chalk.yellow("[WARN]")} ${this._getTimeStamp()} ${messages.join(" ")}`
    )
  }
  public static debug(...messages: any[]) {
    if (env.DEBUG === false) return
    console.debug(
      `${chalk.magenta("[DEBUG]")} ${this._getTimeStamp()} ${messages.join(" ")}`
    )
  }
}
