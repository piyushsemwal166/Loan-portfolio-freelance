const express = require('express');
const { body } = require('express-validator');
const { getChatReply } = require('../controllers/chatController');

const router = express.Router();

router.post(
  '/',
  [
    body('message')
      .trim()
      .notEmpty()
      .withMessage('Message is required.')
      .isLength({ min: 2, max: 500 })
      .withMessage('Message must be between 2 and 500 characters.'),
    body('history')
      .optional()
      .isArray({ max: 20 })
      .withMessage('History must be an array with at most 20 items.'),
  ],
  getChatReply,
);

module.exports = router;
