import express from 'express';
import apollo from 'config/apolloServer';
import helmet from 'helmet';
import path from 'path';
import dotenv from 'dotenv-flow';
import './config/objection';
dotenv.config({node_env: process.env.NODE_ENV || 'development'});
const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());
apollo.applyMiddleware({ app });

// Serve index.js
app.use(express.static(path.join(__dirname, '..')));
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = server;
