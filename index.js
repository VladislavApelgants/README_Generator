const inquirer = require("inquirer");
const fs = require("fs/promises");
const path = require("path");

const abPass = path.join(process.cwd(), "README.md");

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
    type: "input",
    name: "license",
    message: "What license does your project use?",
  },
];

const readmeTemplate = `
# {{title}}

## Description

{{description}}

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
`;

inquirer
  .prompt(questions)
  .then((answers) => {
    const readmeContent = readmeTemplate.replace(
      /{{([^}]+)}}/g,
      (match, key) => answers[key]
    );

    return fs.writeFile(abPass, readmeContent, "utf-8");
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.error("Prompt couldn't be rendered in the current environment.");
    } else {
      console.error("Error generating README:", error);
    }
  });
