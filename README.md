
# photo-compressor
![photo-compressor](https://i.postimg.cc/pL2P4fGW/photo-compressor.png)

[![npm version](https://img.shields.io/npm/v/photo-compressor?color=blue&label=npm%20version&logo=npm)](https://www.npmjs.com/package/photo-compressor)
[![downloads](https://img.shields.io/npm/dt/photo-compressor?color=green&label=downloads&logo=npm)](https://www.npmjs.com/package/photo-compressor)
[![license](https://img.shields.io/npm/l/photo-compressor?color=orange&label=license)](#license)
[![issues](https://img.shields.io/github/issues/J3rry320/photo-compressor?label=issues&logo=github)](https://github.com/J3rry320/photo-compressor/issues)
[![stars](https://img.shields.io/github/stars/J3rry320/photo-compressor?color=brightgreen&label=stars&logo=github)](https://github.com/J3rry320/photo-compressor/stargazers)
[![contributors](https://img.shields.io/github/contributors/J3rry320/photo-compressor?label=contributors&logo=github)](https://github.com/J3rry320/photo-compressor/graphs/contributors)
[![last commit](https://img.shields.io/github/last-commit/J3rry320/photo-compressor?color=yellow&label=last%20commit&logo=git)](https://github.com/J3rry320/photo-compressor/commits/main)
![Code Coverage](https://img.shields.io/badge/Coverage-90.9%25-brightgreen)





**photo-compressor** CLI is a command-line tool to optimize and compress images locally or from the cloud. This tool leverages sharp to perform image compression and conversion to `.webp` format. It's a great utility for web developers to convert their media to `.webp` and compress them to serve easily to their end users.

## Features

-   Optimize images in a local directory
    
-   Optimize images from a URL or a directory of image URLs
    
-   Automatically handles file name conflicts
    
-   Provides detailed logging with statistics on savings and processing time
    

## Installation

Install the CLI globally using npm:



```bash
npm install -g photo-compressor
```
or use yarn 
```bash
yarn global add photo-compressor
```
or use npx to run it without installation 
```bash
npx photo-compressor
```
## Usage

Below are the available commands and options for the Photo Compressor CLI.

### Common Options

-   `-h, --help`: Display help information for a command.
    
-   `-V, --version`: Output the current version of the package.
    

### Commands

#### `photo-compressor local`

**Description**: Optimize and compress images in a local directory.

**Usage**:



```bash
photo-compressor local --dir <path_to_directory> --output <path_to_output_directory>
```

**Options**:

-   `-d, --dir <path>`: Directory to scan for images (Required).
    
-   `-o, --output <path>`: Output directory for optimized images, default is `./optimized`.
    



#### `photo-compressor cloud`

**Description**: Optimize and compress images from a URL or a directory URL.

**Usage**:



```bash
photo-compressor cloud --url <image_url_OR_array_of_images> --output <path_to_output_directory>
```

**Options**:

-   `-u, --url <url>`: URL of the image or an array of image URLs to compress (Required).
    
-   `-o, --output <path>`: Output directory for optimized images, default is `./optimized`.
    

**Notes**:

-   `--url` option can take a single image URL or an array of image URLs for batch processing.


## Examples

### Optimize Local Images


```bash
photo-compressor local --dir ./images --output ./optimized
```

### Optimize Cloud Images



```bash
photo-compressor cloud --url ['https://example.com/image.jpg','https://example.com/image_2.jpg'] --output ./optimized
```

## Contributing

We welcome [contributions](https://github.com/J3rry320/photo-compressor/pulls) to enhance the functionality of Photo Compressor CLI! Here are some guidelines:

1.  Fork the repository.
    
2.  Create a new branch with a descriptive name (e.g., `feature-add-optimization`).
    
3.  Make your changes and commit them with clear and concise messages.
    
4.  Raise a pull request against the `main` branch. Include a detailed description of your changes and the problem you're addressing.
    
5.  Wait for the maintainers to review your pull request. Engage actively in any feedback and make necessary updates.
    

***Thank you for your contributions!***

## Issues

If you encounter any issues or bugs or have feature requests, please open an issue in the [Issues](https://github.com/J3rry320/photo-compressor/issues) section of the repository. When reporting an issue, please provide as much detail as possible, including:

-   Steps to reproduce the issue
    
-   Expected and actual behavior
    
-   Relevant logs or error messages
    
-   Screenshots (if applicable)
    

We appreciate your feedback and will strive to address issues promptly!

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/J3rry320/photo-compressor/blob/main/LICENSE) file for details.

## Hire Me

Hey there! I'm currently open to new opportunities and would love to work on exciting projects. If you're interested in collaborating or hiring me, feel free to reach out via [email](mailto:rutuparna.satpathy01@gmail.com) or connect with me on [LinkedIn](https://www.linkedin.com/in/jerrythejsguy/)

Let's create something amazing together! 🚀

## Notes

1.  This is yet another wrapper around sharp. Further optimizations will be added down the road, but it is a good utility to convert and optimize a bunch of images hassle-free.
    
2.  I was watching Silicon Valley and wanted to build something related to compression. (P.S. I'm a noob)
    
3.  This is a good utility tool for web developers to compress and convert a bunch of images to `.webp`.