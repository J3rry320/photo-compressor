const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const { logger } = require("../utils/logger.js");
/**
 *
 * @param {string} dir - The path to the image files
 * @param {string} outputDir - The path to store the compressed and converted image files
 * @returns
 */
async function scanAndOptimize(dir, outputDir) {
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
    logger.warn("No valid image files found for optimization.");
    return;
  }

  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

  logger.info(`Found ${files.length} images. Processing in parallel...`);

  // Process files in parallel using Promise.all
  await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(dir, file);
      const outputFilePath = path.join(
        outputDir,
        `${path.basename(file, path.extname(file))}.webp`
      );

      try {
        await sharp(filePath)
          .webp({
            quality: 85, // Adjust quality level
            effort: 6, // Compression effort
            nearLossless: true, // Preserve near-original quality
          })
          .toFile(outputFilePath);

        logger.info(`Optimized and compressed: ${file} -> ${outputFilePath}`);
      } catch (error) {
        logger.error(`Error optimizing ${file}: ${error.message}`);
      }
    })
  );

  logger.info("Batch optimization completed.");
}

module.exports = { scanAndOptimize };
