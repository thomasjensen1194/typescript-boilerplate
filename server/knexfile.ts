require('dotenv-flow').config({ node_env: process.env.NODE_ENV || 'development', path: '../' });

module.exports = {
  development: {
    client: 'mysql',
    connection: process.env.DB_URL
  }
};
