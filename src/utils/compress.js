/**
 *
 * @param {Buffer} image - The image buffer to compress and convert to webp
 * @param {string} outputFilePath - The output file path to save the compressed image
 * @returns {Promise} - The compressed image buffer
 */
async function compressImage(image, outputFilePath) {
  const compressedImage = await sharp(image)
    .webp({
      quality: 85, // Adjust quality level
      effort: 6, // Compression effort
      nearLossless: true, // Preserve near-original quality
    })
    .toFile(outputFilePath, { withoutMetadata: true });
  return compressedImage;
}
module.exports = { compressImage };
