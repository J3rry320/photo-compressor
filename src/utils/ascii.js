const figlet = require("figlet");
const clc = require("cli-color");

// Define an array of legible fonts
const legibleFonts = [
  "Standard",
  "Slant",
  "Doom",
  "Big",
  "Larry 3D",
  "3D-ASCII",
  "Cyberlarge",
  "Banner",
  "Block",
  "Bubble",
  "Bulbhead",
  "Digital",
  "Ivrit",
  "Lean",
  "Ogre",
  "Pawp",
  "Rectangles",
  "Stop",
  "Small",
  "Shadow",
  "Speed",
  "Train",
  "Whimsy",
  // Add more legible fonts as desired
];

// Define an array of cli-color functions for different colors
const colors = [
  clc.red,
  clc.green,
  clc.yellow,
  clc.blue,
  clc.magenta,
  clc.cyan,
  clc.white,
];

// Function to generate random text using a random legible font and color
function randomFigletText(text) {
  const randomFont =
    legibleFonts[Math.floor(Math.random() * legibleFonts.length)];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  return `\n ${randomColor(
    figlet.textSync(text, {
      font: randomFont,
      horizontalLayout: "full",
    })
  )} \n`;
}

module.exports = { randomFigletText };
