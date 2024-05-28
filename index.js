const inquirer = require("inquirer");
const fs = require("fs/promises");
const path = require("path");
// const { renderLicenseSection } = require("./utils/generateMarkdown");

const pathToReadme = path.join(process.cwd(), "README.md");
const questions = [
  {
    type: "input",
    name: "title",
    message: "What is the title of your project?",
  },
  {
    type: "input",
    name: "description",
    message: "Provide a description of your project:",
  },
  {
    type: "input",
    name: "installation",
    message: "How to install your project?",
  },
  {
    type: "input",
    name: "usage",
    message: "How to use your project?",
  },
  {
    type: "input",
    name: "contributing",
    message: "How to contribute to your project?",
  },
  {
    type: "input",
    name: "tests",
    message: "How to test your project?",
  },
  {
    type: "list",
    name: "license",
    message: "Choose a license for your project:",
    choices: [
      "MIT",
      "GPLv3",
      "Apache 2.0",
      "BSD 2-Clause",
      "BSD 3-Clause",
      "MPL 2.0",
      "None",
    ],
  },
  {
    type: "input",
    name: "github",
    message: "What is your GitHub username?",
  },
  {
    type: "input",
    name: "email",
    message: "What is your email address?",
  },
];

const readmeTemplate = `
# {{title}}

## Description

{{description}}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Tests](#tests)
- [License](#license)
- [Questions](#questions)

## Installation

{{installation}}

## Usage

{{usage}}

## Contributing

{{contributing}}

## Tests

{{tests}}

## License

{{license}}

## Questions

For any questions, please reach out to me via [GitHub](https://github.com/{{github}}) or [email](mailto:{{email}}).
`;

// Функции для генерации лицензии
function renderLicenseBadge(license) {
  if (license === "None") {
    return ""; // Возвращаем пустую строку, если лицензия не выбрана
  }
  const formattedLicense = license.replace(/\s/g, "%20"); // Заменяем пробелы на %20
  return `[![License](https://img.shields.io/badge/License-${formattedLicense}-brightgreen.svg)](https://opensource.org/licenses/${formattedLicense})`;
}

function renderLicenseLink(license) {
  if (license === "None") {
    return ""; // Возвращаем пустую строку, если лицензия не выбрана
  }
  const formattedLicense = license.replace(/\s/g, "%20"); // Заменяем пробелы на %20
  return `View the [license](https://opensource.org/licenses/${formattedLicense}) for more information.`;
}

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

// Функция для генерации README
const generateReadmeFile = async ({ questions, readmeTemplate }) => {
  try {
    const answers = await inquirer.prompt(questions);

    const { license, ...otherAnswers } = answers; // Выделяем ответы о лицензии

    const readmeContent = readmeTemplate.replace(
      /{{([^}]+)}}/g,
      (match, key) => {
        if (key === "license") {
          return renderLicenseSection(license); // Генерируем раздел лицензии
        }
        return otherAnswers[key]; // Возвращаем другие ответы без изменений
      }
    );

    await fs.writeFile(pathToReadme, readmeContent, "utf-8");
  } catch (error) {
    console.error("Error generating README:", error);
  }
};

generateReadmeFile({ questions, readmeTemplate });
