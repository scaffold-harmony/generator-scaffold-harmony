"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  prompting() {
    this.log(
      yosay(
        `Welcome to the kickass ${chalk.red(
          "generator-scaffold-harmony"
        )} generator!`
      )
    );

    const prompts = [
      {
        type: 'input',
        name: 'projectTitle',
        message: 'Your project title',
      },
      {
        type: 'input',
        name: 'authorName',
        message: 'Your name',
      },
      {
        type: 'input',
        name: 'authorEmail',
        message: 'Your email',
      },
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath("dummyfile.txt"),
      this.destinationPath("dummyfile.txt")
    );
  }

  install() {
    this.installDependencies();
  }
};
