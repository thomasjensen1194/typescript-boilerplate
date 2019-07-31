const { connection } = require('./config');

module.exports = {
  development: {
    client: 'mysql',
    connection: connection
  }
};
