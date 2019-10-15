import express from 'express';
import helmet from 'helmet';
import path from 'path';
import dotenv from 'dotenv-flow';
import cookieSession from 'cookie-session';
import './config/objection';
import passport from 'passport';
dotenv.config({ node_env: process.env.NODE_ENV || 'development' });
const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());

require('middleware/passport')(passport);

// Auth
app.use(
  cookieSession({
    name: 'boilerplate',
    keys: ['123asd', 'sggf323', 'asf3243'],
    maxAge: 14 * 24 * 60 * 60 * 1000, // 14 days
    sameSite: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('config/apolloServer')(passport).applyMiddleware({ app });
// Serve index.js
app.use(express.static(path.join(__dirname, '..')));
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = server;
