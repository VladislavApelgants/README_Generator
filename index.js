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

// const readmeTemplate = `
// # {{title}}

// ## Description

// {{description}}

// ## Table of Contents
// - [Installation](#installation)
// - [Usage](#usage)
// - [Contributing](#contributing)
// - [Tests](#tests)
// - [License](#license)
// - [Questions](#questions)

// ## Installation

// {{installation}}

// ## Usage

// {{usage}}

// ## Contributing

// {{contributing}}

// ## Tests

// {{tests}}

// ## License

// {{license}}

// ## Questions

// For any questions, please reach out to me via [GitHub](https://github.com/{{github}}) or [email](mailto:{{email}}).
// `;

// Функции для генерации лицензии
function renderLicenseBadge(license) {
  if (license === "None") return ""; // Возвращаем пустую строку, если лицензия не выбрана

  let licenseURL_IMG;
  let licenseURL;
  switch (license) {
    case "BSD 2-Clause":
      licenseURL_IMG = "BSD2Clause";
      licenseURL = "bsd-3-clause";
      break;
    case "BSD 3-Clause":
      licenseURL_IMG = "BSD3Clause";
      licenseURL = "bsd-3-clause";
      break;
    case "Apache 2.0":
      licenseURL_IMG = "apache2.0";
      licenseURL = "apache-2-0";
      break;
    case "GPLv3":
      licenseURL = "gpl-3-0";
      licenseURL_IMG = "GPLv3";
      break;
    case "MPL 2.0":
      licenseURL = "mpl-2-0";
      licenseURL_IMG = "mpl2.0";
      break;
    case "MIT":
      licenseURL = "mit";
      licenseURL_IMG = "mit";
      break;
    default:
      licenseURL_IMG = license.replace(/\s/g, "%20");
      licenseURL = license.replace(/\s/g, "%20");
  }

  return `[![License](https://img.shields.io/badge/License-${licenseURL_IMG}-brightgreen.svg)](https://opensource.org/licenses/${licenseURL})`;
}

function renderLicenseLink(license) {
  if (license === "None") return ""; // Возвращаем пустую строку, если лицензия не выбрана

  let licenseURL;
  switch (license) {
    case "BSD 2-Clause":
      licenseURL = "bsd-3-clause";
      break;
    case "BSD 3-Clause":
      licenseURL = "bsd-3-clause";
      break;
    case "Apache 2.0":
      licenseURL = "apache-2-0";
      break;
    case "GPLv3":
      licenseURL = "gpl-3-0";
      break;
    case "MPL 2.0":
      licenseURL = "mpl-2-0";
      break;
    case "MIT":
      licenseURL = "mit";
      break;
    default:
      licenseURL = license.replace(/\s/g, "%20");
  }
  return `View the [license](https://opensource.org/licenses/${licenseURL}) for more information.`;
}

function renderLicenseSection(license) {
  if (license === "None") return ""; // Возвращаем пустую строку, если лицензия не выбрана

  return `
## License

This project is licensed under the ${license} License.

${renderLicenseBadge(license)}
${renderLicenseLink(license)}
`;
}

// Функция для генерации README
const generateReadmeFile = async (questions) => {
  try {
    const answers = await inquirer.prompt(questions);

    const {
      title,
      description,
      installation,
      usage,
      contributing,
      tests,
      license,
      github,
      email,
    } = answers;

    const readmeContent = `
# ${title}

## Description

${description}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Tests](#tests)
- [License](#license)
- [Questions](#questions)

## Installation

${installation}

## Usage

${usage}

## Contributing

${contributing}

## Tests

${tests}

## License

${renderLicenseSection(license)}

${license}

## Questions

For any questions, please reach out to me via [GitHub](https://github.com/${github}) or [email](mailto:${email}).
`;

    await fs.writeFile(pathToReadme, readmeContent, "utf-8");
  } catch (error) {
    console.error("Error generating README:", error);
  }
};

generateReadmeFile(questions);
