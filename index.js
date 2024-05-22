const inquirer = require("inquirer");
const fs = require("fs/promises");
const path = require("path");

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

const generateReadmeFile = async ({ questions, readmeTemplate }) => {
  try {
    const answers = await inquirer.prompt(questions);

    const readmeContent = readmeTemplate.replace(
      /{{([^}]+)}}/g,
      (match, key) => answers[key]
    );

    await fs.writeFile(pathToReadme, readmeContent, "utf-8");
  } catch (error) {
    console.error("Error generating README:", error);
  }
};

generateReadmeFile({ questions, readmeTemplate });
