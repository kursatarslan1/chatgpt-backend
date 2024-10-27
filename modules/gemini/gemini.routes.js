// src/routes/chatRoutes.js
const express = require('express');
const { sendMessage } = require('./gemini.controller');

const router = express.Router();

router.post('/', sendMessage);

module.exports = router;
