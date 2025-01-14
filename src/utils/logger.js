// const { createLogger, format, transports } = require("winston");

// const logger = createLogger({
//   level: "info",
//   format: format.combine(
//     format.timestamp(),
//     format.colorize(),
//     format.printf(
//       ({ timestamp, level, message }) => `[${timestamp}] ${level}: ${message}`
//     )
//   ),
//   transports: [new transports.Console()],
// });
// module.exports = { logger };
const clc = require("cli-color");

/**
 * Wrapper utility for colored logging
 */
const addNewLines = (message) => `\n${message}\n`;
const logger = {
  info: (message) => {
    console.log(addNewLines(clc.cyan.underline(message)));
  },
  success: (message) => {
    console.log(addNewLines(clc.green.bold(message)));
  },
  warning: (message) => {
    console.log(addNewLines(clc.yellow.underline(message)));
  },
  error: (message) => {
    console.log(addNewLines(clc.red.bold(message)));
  },
  art: (text, style) => {
    let styledText = text;
    for (const key in style) {
      styledText = styledText.split(key).join(style[key]);
    }
    console.log(styledText);
  },
};

module.exports = { logger };
