const inquirer = require("inquirer");
const fs = require("fs/promises");
const path = require("path");
const abPass = path.join(process.cwd(), "README.md");
// console.log("😎 ~ inquirer:", inquirer.prompt);

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

inquirer
  .prompt(questions)
  .then((answers) => {
    const {
      title,
      description,
      installation,
      usage,
      contributing,
      tests,
      license,
    } = answers;

    const readmeContent = ` 
${title}
Description
${description}

Installation
${installation}

Usage
${usage}

Contributing
${contributing}

Tests
${tests}

License
${license}
`;
    fs.writeFile(abPass, JSON.stringify(readmeContent), "utf-8");
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log(error);

      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
