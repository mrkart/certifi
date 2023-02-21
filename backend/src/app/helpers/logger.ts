enum LoggerConfig {
    NONE = 'NONE',
    ALL = 'ALL',
    LOG = 'LOG',
    INFO = 'INFO',
    ERROR = 'ERROR'
}
enum LogLevel {
    LOG,
    INFO,
    ERROR
}
function printLog(level: number, message?: unknown, ...data: unknown[]) {
    process.env.LOGGER_CONFIG = process.env.LOGGER_CONFIG
        ? process.env.LOGGER_CONFIG
        : LoggerConfig.ALL;
    if (process.env.LOGGER_CONFIG === LoggerConfig.NONE) {
        return;
    }
    if (arguments.length > 1) {
        const ts = new Date();
        switch (level) {
            case LogLevel.LOG:
                if (
                    process.env.LOGGER_CONFIG === LoggerConfig.ALL ||
                    process.env.LOGGER_CONFIG === LoggerConfig.INFO ||
                    process.env.LOGGER_CONFIG === LoggerConfig.LOG
                ) {
                    console.log(
                        Logger.setColor(
                            `${ts.toISOString()}`,
                            ConsoleColor.YELLOW
                        ),
                        Logger.setColor('💬 [Log]:', ConsoleColor.GREEN),
                        message,
                        ...data
                    );
                }
                break;
            case LogLevel.INFO:
                if (
                    process.env.LOGGER_CONFIG === LoggerConfig.ALL ||
                    process.env.LOGGER_CONFIG === LoggerConfig.INFO
                ) {
                    console.log(
                        Logger.setColor(
                            `${ts.toISOString()}`,
                            ConsoleColor.YELLOW
                        ),
                        Logger.setColor('ℹ️  [Info]:', ConsoleColor.CYAN),
                        message,
                        ...data
                    );
                }
                break;
            case LogLevel.ERROR:
                if (
                    process.env.LOGGER_CONFIG === LoggerConfig.ALL ||
                    process.env.LOGGER_CONFIG === LoggerConfig.INFO ||
                    process.env.LOGGER_CONFIG === LoggerConfig.LOG ||
                    process.env.LOGGER_CONFIG === LoggerConfig.ERROR
                ) {
                    console.error(
                        Logger.setColor(
                            `${ts.toISOString()}`,
                            ConsoleColor.YELLOW
                        ),
                        Logger.setColor('❌ [Error]:', ConsoleColor.RED) + '\n',
                        message,
                        ...data
                    );
                    console.trace();
                }
                break;
        }
    } else {
        return;
    }
}

export enum ConsoleColor {
    CYAN,
    BLUE,
    GREEN,
    RED,
    WHITE,
    YELLOW
}
export class Logger {
    public static log(message?: unknown, ...data: unknown[]) {
        printLog(LogLevel.LOG, message, ...data);
    }

    public static info(message?: unknown, ...data: unknown[]) {
        printLog(LogLevel.INFO, message, ...data);
    }

    public static error(message?: unknown, ...data: unknown[]) {
        printLog(LogLevel.ERROR, message, ...data);
    }

    public static setColor(text: string, color: ConsoleColor) {
        switch (color) {
            case ConsoleColor.CYAN:
                return `\x1b[36m${text}\x1b[0m`;
            case ConsoleColor.BLUE:
                return `\x1b[34m${text}\x1b[0m`;
            case ConsoleColor.GREEN:
                return `\x1b[32m${text}\x1b[0m`;
            case ConsoleColor.RED:
                return `\x1b[31m${text}\x1b[0m`;
            case ConsoleColor.WHITE:
                return `\x1b[37m${text}\x1b[0m`;
            case ConsoleColor.YELLOW:
                return `\x1b[33m${text}\x1b[0m`;
            default:
                return `\x1b[0m${text}\x1b[0m`;
        }
    }
}

/**
 * returns the Javascript Console object
 */
export function logger() {
    // return Logger.getLogger();
    return console;
}
