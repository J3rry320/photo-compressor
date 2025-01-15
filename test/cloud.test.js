const {
  fetchAndOptimizeCloudImages,
  isValidImageURL,
  processImage,
} = require("../src/core/cloud");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const { logger } = require("../src/utils/logger.js");
const { compressImage } = require("../src/utils/compress.js");

jest.mock("axios");
jest.mock("fs");
jest.mock("path");
jest.mock("../src/utils/logger.js");
jest.mock("../src/utils/compress.js");

describe("Cloud Image Optimization", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("isValidImageURL should return true for valid image URLs", () => {
    expect(isValidImageURL("http://example.com/image.jpg")).toBe(true);
    expect(isValidImageURL("http://example.com/image.png")).toBe(true);
    expect(isValidImageURL("http://example.com/image.gif")).toBe(true);
    expect(isValidImageURL("http://example.com/image.webp")).toBe(true);
  });

  test("isValidImageURL should return false for invalid image URLs", () => {
    expect(isValidImageURL("http://example.com/image.txt")).toBe(false);
    expect(isValidImageURL("http://example.com/image")).toBe(false);
  });

  test("fetchAndOptimizeCloudImages should process a single valid image URL", async () => {
    const url = "http://example.com/image.jpg";
    const outputDir = "../optimized";
    axios.get.mockResolvedValue({ data: "image data" });
    fs.existsSync.mockReturnValue(false);
    fs.mkdirSync.mockImplementation(() => {});
    path.basename.mockReturnValue("image.jpg");
    fs.statSync.mockReturnValue({ size: 500 });

    await fetchAndOptimizeCloudImages(url, outputDir);

    expect(axios.get).toHaveBeenCalledWith(url);
    expect(fs.existsSync).toHaveBeenCalledWith(outputDir);
    expect(fs.mkdirSync).toHaveBeenCalledWith(outputDir);
    expect(logger.info).toHaveBeenCalledWith("Detected a single image.");
    expect(logger.success).toHaveBeenCalled();
  });

  test("fetchAndOptimizeCloudImages should process multiple valid image URLs", async () => {
    const urls = [
      "http://example.com/image1.jpg",
      "http://example.com/image2.png",
    ];
    const outputDir = "../optimized";
    axios.get.mockResolvedValue({ data: "image data" });
    fs.existsSync.mockReturnValue(false);
    fs.mkdirSync.mockImplementation(() => {});
    path.basename.mockReturnValue("image.jpg");
    fs.statSync.mockReturnValue({ size: 500 });

    await fetchAndOptimizeCloudImages(urls, outputDir);

    expect(axios.get).toHaveBeenCalledWith(urls);
    expect(fs.existsSync).toHaveBeenCalledWith(outputDir);
    expect(fs.mkdirSync).toHaveBeenCalledWith(outputDir);
    expect(logger.info).toHaveBeenCalledWith(
      `You provided an array of images containing ${urls.length} images. Processing in parallel...`
    );
    expect(logger.success).toHaveBeenCalled();
  });

  test("fetchAndOptimizeCloudImages should log an error for invalid URL", async () => {
    const url = "http://example.com/image.txt";
    axios.get.mockResolvedValue({ data: "invalid data" });

    await fetchAndOptimizeCloudImages(url);

    expect(logger.error).toHaveBeenCalledWith(
      "Invalid URL: Must point to a single image or a directory listing of image URLs."
    );
  });

  test("processImage should optimize and compress a valid image", async () => {
    const imageUrl = "http://example.com/image.jpg";
    const outputDir = "../optimized";
    axios.get.mockResolvedValue({ data: Buffer.from("image data") });
    path.basename.mockReturnValue("image.jpg");
    fs.statSync.mockReturnValue({ size: 500 });

    await processImage(imageUrl, outputDir);

    expect(axios.get).toHaveBeenCalledWith(imageUrl, {
      responseType: "arraybuffer",
    });
    expect(compressImage).toHaveBeenCalled();
    expect(logger.success).toHaveBeenCalled();
  });

  test("processImage should log an error for failed optimization", async () => {
    const imageUrl = "http://example.com/image.jpg";
    const outputDir = "../optimized";
    axios.get.mockRejectedValue(new Error("Network error"));

    await processImage(imageUrl, outputDir);

    expect(logger.error).toHaveBeenCalledWith(
      `❌ Error optimizing ${imageUrl}: Network error`
    );
  });
});
