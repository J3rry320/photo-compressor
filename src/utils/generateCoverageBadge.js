const fs = require("fs");
const path = require("path");

// Paths
const coverageFilePath = path.join(
  __dirname,
  "../../coverage",
  "coverage-summary.json"
);
const readmePath = path.join(__dirname, "../../README.md");

// Define color ranges for coverage percentage
const getBadgeColor = (coverage) => {
  if (coverage >= 90) return "brightgreen";
  if (coverage >= 75) return "yellowgreen";
  if (coverage >= 50) return "yellow";
  return "red";
};

// Read coverage summary and update README
try {
  // Read and parse the coverage file
  const coverageData = JSON.parse(fs.readFileSync(coverageFilePath, "utf8"));

  const { lines } = coverageData.total;

  // Calculate the coverage percentage
  const coveragePercentage = lines.pct;
  const badgeColor = getBadgeColor(coveragePercentage);

  // Generate badge URL
  const badgeURL = `https://img.shields.io/badge/Coverage-${coveragePercentage}%25-${badgeColor}`;

  // Badge Markdown
  const badgeMarkdown = `![Code Coverage](${badgeURL})`;

  // Read the README file
  let readmeContent = fs.readFileSync(readmePath, "utf8");

  // Replace existing badge or insert a new one
  const badgeRegex =
    /!\[Code Coverage\]\(https:\/\/img\.shields\.io\/badge\/Coverage-.*?\)/;
  if (badgeRegex.test(readmeContent)) {
    // Update existing badge
    readmeContent = readmeContent.replace(badgeRegex, badgeMarkdown);
  } else {
    // Insert the badge at the top of the README
    readmeContent = `${badgeMarkdown}\n\n${readmeContent}`;
  }

  // Write the updated README back to the file
  fs.writeFileSync(readmePath, readmeContent, "utf8");

  console.log("README updated with new coverage badge:", badgeMarkdown);
} catch (error) {
  console.error("Error updating coverage badge:", error.message);
}
