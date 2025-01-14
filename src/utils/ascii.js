const figlet = require("figlet");
const fonts = figlet.fontsSync();
function randomFigletText(text) {
  const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
  return figlet.textSync(text, { font: randomFont, horizontalLayout: "full" });
}
module.exports = { randomFigletText };
