const fs = require("fs");
const { scanAndOptimize } = require("../src/core/local");
const { logger } = require("../src/utils/logger");
const path = require("path");
const { compressImage } = require("../src/utils/compress");
jest.mock("fs");
jest.mock("path");
jest.mock("../src/utils/logger");
jest.mock("../src/utils/compress");

describe("scanAndOptimize", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should log an error if the directory does not exist", async () => {
    fs.existsSync.mockReturnValue(false);

    await scanAndOptimize("invalid/dir");

    expect(logger.error).toHaveBeenCalledWith(
      "Directory not found: invalid/dir"
    );
  });

  it("should log a warning if no valid image files are found", async () => {
    fs.existsSync.mockReturnValue(true);
    fs.readdirSync.mockReturnValue(["file.txt"]);
    path.extname.mockImplementation((file) => ".txt"); // Mock implementation
    logger.warning = jest.fn(); // Ensure logger.warning is a mock function
    await scanAndOptimize("valid/dir");

    expect(logger.warning).toHaveBeenCalledWith(
      "No valid image files found for optimization."
    );
  });

  it("should create the output directory if it does not exist", async () => {
    fs.existsSync.mockReturnValueOnce(true).mockReturnValueOnce(false);
    fs.readdirSync.mockReturnValue(["image.jpg"]);
    path.extname.mockImplementation((file) => ".jpg");
    await scanAndOptimize("valid/dir", "output/dir");

    expect(fs.mkdirSync).toHaveBeenCalledWith("output/dir");
  });

  it("should process image files and log success", async () => {
    fs.existsSync.mockReturnValue(true);
    fs.readdirSync.mockReturnValue(["image.jpg"]);
    fs.statSync.mockReturnValue({ size: 1000 });
    compressImage.mockResolvedValue();

    await scanAndOptimize("valid/dir", "output/dir");

    expect(logger.info).toHaveBeenCalledWith(
      "Found 1 images. Processing in parallel..."
    );
    expect(logger.success).toHaveBeenCalledWith(
      expect.stringContaining("Optimized and compressed: image.jpg")
    );
  });

  it("should log an error if image optimization fails", async () => {
    fs.existsSync.mockReturnValue(true);
    fs.readdirSync.mockReturnValue(["image.jpg"]);
    fs.statSync.mockReturnValue({ size: 1000 });
    compressImage.mockRejectedValue(new Error("Compression error"));

    await scanAndOptimize("valid/dir", "output/dir");

    expect(logger.error).toHaveBeenCalledWith(
      expect.stringContaining("Error optimizing image.jpg: Compression error")
    );
  });
});
