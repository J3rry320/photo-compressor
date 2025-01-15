const fs = require("fs");
const path = require("path");
const axios = require("axios");
const sharp = require("sharp");
const { logger } = require("../utils/logger.js");
const { compressImage } = require("../utils/compress.js");
let totalSavings = 0; // Global variable to track total file savings
let totalFiles = 0; // Global variable to track total number of files processed
/**
 * Fetch and optimize images from a cloud URL.
 * @param {string} url - Either a single URL or an array of URL's of the image  containing images.
 * @param {string} outputDir - Directory to save optimized images.
 */
async function fetchAndOptimizeCloudImages(url, outputDir = "../optimized") {
  const startTime = Date.now();
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

  try {
    const response = await axios.get(url);

    // Determine if URL is a single image or a directory listing
    if (Array.isArray(url)) {
      logger.info(
        `You provided an array of images containing ${url.length} images. Processing in parallel...`
      );

      await Promise.all(
        url.map((imageUrl) => {
          if (isValidImageURL(imageUrl)) {
            return processImage(imageUrl, outputDir);
          }
        })
      );

      logger.info("Batch processing completed.");
    } else if (typeof response.data === "string" && isValidImageURL(url)) {
      logger.info("Detected a single image.");
      await processImage(url, outputDir);
    } else {
      logger.error(
        "Invalid URL: Must point to a single image or a directory listing of image URLs."
      );
    }
  } catch (error) {
    logger.error(`Error processing cloud images: ${error.message}`);
  }
  const endTime = Date.now(); // End timer
  const timeTaken = ((endTime - startTime) / 1000).toFixed(2); // Calculate time taken in seconds
  const savingsText = `${totalSavings} bytes (${Math.round(
    totalSavings / 1024
  )} KB / ${Math.round(totalSavings / 1024 / 1024)} MB)`;
  const timeText = `${timeTaken} seconds`;
  logger.art(
    `Optimization Summary:\n\nTotal savings: ${clc.yellowBright.bold(
      savingsText
    )}\n\nTime taken: ${clc.cyanBright.bold(
      timeText
    )}\n\nFiles processed: ${clc.greenBright.bold(filesText)}`
  );
}

/**
 * Validate if a URL points to a valid image.
 * @param {string} url - The URL to validate.
 * @returns {boolean} True if valid image URL.
 */
function isValidImageURL(url) {
  return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
}

/**
 * Process and optimize a single image.
 * @param {string} imageUrl - URL of the image.
 * @param {string} outputDir - Directory to save optimized image.
 */
async function processImage(imageUrl, outputDir) {
  try {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const fileName = path.basename(imageUrl).split("?")[0]; // Remove query params
    const outputFilePath = path.join(
      outputDir,
      `${fileName.split(".")[0]}.webp`
    );
    const originalSize = Buffer.byteLength(response.data);
    await compressImage(response.data, outputFilePath);
    const optimizedSize = fs.statSync(outputFilePath).size;
    const sizeDifference = originalSize - optimizedSize;
    const percentageSaved = Math.round((sizeDifference / originalSize) * 100); // Update global counters
    totalSavings += sizeDifference;
    totalFiles += 1;
    loggerUtil.success(
      `🎉 Optimized and compressed: ${imageUrl} -> ${outputFilePath} | Original: ${Math.round(
        originalSize / 1024
      )} KB Optimized: ${Math.round(
        optimizedSize / 1024
      )} KB Saved: ${Math.round(
        sizeDifference / 1024
      )} KB (${percentageSaved}%)`
    );
  } catch (error) {
    loggerUtil.error(`❌ Error optimizing ${imageUrl}: ${error.message}`);
  }
}
module.exports = {
  fetchAndOptimizeCloudImages,
};
