// Include packages needed for this application
const inquirer = require('inquirer')
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown');

const questions = () => {
   return inquirer.prompt([
    {
      type:'input',
      message:'What is your GitHub username?',
      name:'github'
    },
    {
      type:'input',
      message:'What is your email?',
      name:'email'
    },
    {
      type:'input',
      message:'Project Title?',
      name:'title'
    },
    {
      type:'input',
      message:'What is the description of your project?',
      name:'description',
    },
    {
      type:'input',
      message:'What are the instructions for installation?',
      name:"installation",
    },
    {
      type:'input',
      message:'Instructions for usage',
      name:"usage",
    },
    {
      type: 'list',
      name: 'licenses',
      message: 'What type of license whould you like to include?',
      choices: ['MIT', 'GPL'],
      when: (confirmLicenses) => {
        if (confirmLicenses) {
            return true;
        } else {
            return false;
        }
      }
    },
]);
};

const writeFile = data => {
  fs.writeFile('README.md', data, err => {
      if (err) {
          console.log(err);
          return;
      } else {
          console.log("Success!")
      }
  })
}; 

questions()
.then(answers => {
  return generateMarkdown(answers);
})
.then(data => {
  return writeFile(data);
})
.catch(err => {
  console.log(err)
})



