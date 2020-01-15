require('dotenv-flow').config({ default_node_env: 'development', path: '../' });

module.exports = {
    client: 'mysql',
    connection: process.env.DB_URL
};
