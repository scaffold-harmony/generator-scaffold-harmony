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
        type: "input",
        name: "projectTitle",
        message: "Your project title",
      },
      {
        type: "input",
        name: "authorName",
        message: "Your name",
      },
      {
        type: "input",
        name: "authorEmail",
        message: "Your email"
      },
      {
        type: "input",
        name: "onewalletAddress",
        message: "Your ONE Wallet Chrome extension address"
      },
      {
        type: "input",
        name: "testnetPrivateKey",
        message: "Your hexadecimal private key for testnet deployment",
        default: ""
      },
      {
        type: "input",
        name: "mainnetPrivateKey",
        message: "Your hexadecimal private key for mainnet deployment",
        default: ""
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(this.templatePath("contracts"), this.destinationPath("contracts"));
    this.fs.copy(this.templatePath("frontend"), this.destinationPath("frontend"));
    this.fs.copyTpl(this.templatePath("frontend/package.json"), this.destinationPath("frontend/package.json"), this.props);
    this.fs.copy(this.templatePath("migrations"), this.destinationPath("migrations"));
    this.fs.copy(this.templatePath("test"), this.destinationPath("test"));
    this.fs.copyTpl(this.templatePath(".env.tpl"), this.destinationPath(".env"), this.props);
    this.fs.copy(this.templatePath(".gitattributes.tpl"), this.destinationPath(".gitattributes"));
    this.fs.copy(this.templatePath(".gitignore.tpl"), this.destinationPath(".gitignore"));
    this.fs.copy(this.templatePath("gulpfile.js"), this.destinationPath("gulpfile.js"));
    this.fs.copyTpl(this.templatePath("package.json"), this.destinationPath("package.json"), this.props);
    this.fs.copy(this.templatePath("private-provider.js"), this.destinationPath("private-provider.js"));
    this.fs.copy(this.templatePath("truffle-config.js"), this.destinationPath("truffle-config.js"));
    this.fs.copy(this.templatePath("scripts"), this.destinationPath("scripts"));
    this.fs.copy(this.templatePath("README.md"), this.destinationPath("README.md"));
  }

  install() {
    this.installDependencies({
      npm: true,
      bower: false,
      yarn: false
    });
  }
};
