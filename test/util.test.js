const sharp = require("sharp");
const { compressImage } = require("../src/utils/compress.js");

jest.mock("sharp");

describe("compressImage", () => {
  const mockImageBuffer = Buffer.from("mockImageBuffer");
  const mockOutputFilePath = "output/path/image.webp";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should compress the image and save to the specified output file path", async () => {
    const mockSharpInstance = {
      webp: jest.fn().mockReturnThis(),
      toFile: jest.fn().mockResolvedValue("compressedImageBuffer"),
    };
    sharp.mockReturnValue(mockSharpInstance);

    const result = await compressImage(mockImageBuffer, mockOutputFilePath);

    expect(sharp).toHaveBeenCalledWith(mockImageBuffer);
    expect(mockSharpInstance.webp).toHaveBeenCalledWith({
      quality: 85,
      effort: 6,
      nearLossless: true,
    });
    expect(mockSharpInstance.toFile).toHaveBeenCalledWith(mockOutputFilePath, {
      withoutMetadata: true,
    });
    expect(result).toBe("compressedImageBuffer");
  });

  it("should throw an error if compression fails", async () => {
    const mockSharpInstance = {
      webp: jest.fn().mockReturnThis(),
      toFile: jest.fn().mockRejectedValue(new Error("Compression error")),
    };
    sharp.mockReturnValue(mockSharpInstance);

    await expect(
      compressImage(mockImageBuffer, mockOutputFilePath)
    ).rejects.toThrow("Compression error");

    expect(sharp).toHaveBeenCalledWith(mockImageBuffer);
    expect(mockSharpInstance.webp).toHaveBeenCalledWith({
      quality: 85,
      effort: 6,
      nearLossless: true,
    });
    expect(mockSharpInstance.toFile).toHaveBeenCalledWith(mockOutputFilePath, {
      withoutMetadata: true,
    });
  });
});
