var figlet = require('figlet');

const renderTitle = () => {
  console.log(figlet.textSync('Rice GPT',{
    font: 'doom',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 100,
    whitespaceBreak: true
  }));
  console.log('Created by Felipe Nader [github.com/fsnader]\n');
};

module.exports = {
  renderTitle
};
