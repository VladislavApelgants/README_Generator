function renderLicenseBadge(license) {
  if (license === "None") return "";

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
      licenseURL_IMG = license.replace(/\s/g, "");
      licenseURL = license.replace(/\s/g, "");
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

module.exports = { renderLicenseSection };
