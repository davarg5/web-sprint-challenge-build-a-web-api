const express = require('express');
const server = express();

// Complete your server here!
// Do NOT `server.listen()` inside this file!

server.use(express.json());

const ActionRouter = require('./actions/actions-router');
server.use('/api/actions', ActionRouter);

// const ProjectRouter = require('./projects/projects-router');
// server.use('/api/projects', ProjectRouter);

server.get('/', (req, res) => {
    res.send(`<h2>Welcome to the Posts and Actions API</h2>`)
})


module.exports = server;
