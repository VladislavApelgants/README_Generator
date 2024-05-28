// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
  if (license === "None") {
    return ""; // Возвращаем пустую строку, если лицензия не выбрана
  }
  const formattedLicense = license.replace(/\s/g, "%20"); // Заменяем пробелы на %20
  return `[![License](https://img.shields.io/badge/License-${formattedLicense}-brightgreen.svg)](https://opensource.org/licenses/${formattedLicense})`;
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
  if (license === "None") {
    return ""; // Возвращаем пустую строку, если лицензия не выбрана
  }
  const formattedLicense = license.replace(/\s/g, "%20"); // Заменяем пробелы на %20
  return `View the [license](https://opensource.org/licenses/${formattedLicense}) for more information.`;
}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
  if (license === "None") {
    return ""; // Возвращаем пустую строку, если лицензия не выбрана
  }
  return `
## License

This project is licensed under the ${license} License.

${renderLicenseBadge(license)}
${renderLicenseLink(license)}
`;
}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  return `# ${data.title}

`;
}

module.exports = { renderLicenseSection };
