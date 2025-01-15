const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const clc = require("cli-color");
const { logger } = require("../utils/logger");
const { compressImage } = require("../utils/compress");

let totalSavings = 0; // Global variable to track total file savings

/**
 *
 * @param {string} dir - The path to the image files
 * @param {string} outputDir - The path to store the compressed and converted image files
 * @returns
 */
async function scanAndOptimize(dir, outputDir = "../optimized") {
  const startTime = Date.now(); // Start timer

  if (!fs.existsSync(dir)) {
    logger.error(`Directory not found: ${dir}`);
    return;
  }

  const files = fs
    .readdirSync(dir)
    .filter((file) =>
      [".jpg", ".jpeg", ".png", ".gif", ".webp"].includes(
        path.extname(file).toLowerCase()
      )
    );

  if (!files.length) {
    logger.warning("No valid image files found for optimization.");
    return;
  }

  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

  logger.info(`Found ${files.length} images. Processing in parallel...`);

  // Process files in parallel using Promise.all
  await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(dir, file);
      let outputFilePath = path.join(
        outputDir,
        `${path.basename(file, path.extname(file))}.webp`
      );
      if (fs.existsSync(outputFilePath)) {
        outputFilePath = path.join(
          outputDir,
          `${path.basename(file, path.extname(file))}_compressed.webp`
        );
      }

      try {
        const originalSize = fs.statSync(filePath).size;

        await compressImage(filePath, outputFilePath);

        const optimizedSize = fs.statSync(outputFilePath).size;
        const sizeDifference = originalSize - optimizedSize;
        const percentageSaved = Math.round(
          (sizeDifference / originalSize) * 100
        );

        // Update total savings
        totalSavings += sizeDifference;

        logger.success(
          `🎉 Optimized and compressed: ${file} -> ${outputFilePath} | Original: ${Math.round(
            originalSize / 1024
          )} KB Optimized: ${Math.round(
            optimizedSize / 1024
          )} KB Saved: ${Math.round(
            sizeDifference / 1024
          )} KB (${percentageSaved}%)`
        );
      } catch (error) {
        logger.error(`❌ Error optimizing ${file}: ${error.message}`);
      }
    })
  );

  const endTime = Date.now(); // End timer
  const timeTaken = ((endTime - startTime) / 1000).toFixed(2); // Calculate time taken in seconds

  logger.success("\nBatch optimization completed! 🚀\n");
  const savingsText = `${totalSavings} bytes (${Math.round(
    totalSavings / 1024
  )} KB / ${Math.round(totalSavings / 1024 / 1024)} MB)`;
  const timeText = `${timeTaken} seconds`;
  const filesText = `${files.length} files`;
  logger.art(
    `Optimization Summary:\n\nTotal savings: ${clc.yellowBright.bold(
      savingsText
    )}\n\nTime taken: ${clc.cyanBright.bold(
      timeText
    )}\n\nFiles processed: ${clc.greenBright.bold(filesText)}`
  );
}

module.exports = { scanAndOptimize };
