#!/usr/bin/env node
const { Command } = require("commander");
const { scanAndOptimize } = require("../src/core/local.js");
const { fetchAndOptimizeCloudImages } = require("../src/core/cloud.js");
const { logger } = require("../src/utils/logger.js");
const { randomFigletText } = require("../src/utils/ascii.js");

console.log(randomFigletText("photo-compressor"));

const program = new Command();

program
  .name("photo-compressor")
  .description("Optimize and compress images locally or from the cloud.")
  .version("1.0.0");

program
  .command("local")
  .description("Optimize images in a local directory")
  .option("-d, --dir <path>", "Directory to scan for images")
  .option(
    "-o, --output <path>",
    "Output directory for optimized images",
    "./optimized"
  )
  .action(async (options) => {
    logger.info("Starting local optimization...");
    await scanAndOptimize(options.dir, options.output);
    logger.info("Local optimization completed.");
  });

program
  .command("cloud")
  .description("Optimize images from a URL or a directory URL")
  .option(
    "-u, --url <url>",
    "URL of the image or directory of images to optimize"
  )
  .option(
    "-o, --output <path>",
    "Output directory for optimized images",
    "./optimized"
  )
  .action(async (options) => {
    logger.info("Starting cloud optimization...");
    await fetchAndOptimizeCloudImages(options.url, options.output);
    logger.info("Cloud optimization completed.");
  });

program.parse(process.argv);
