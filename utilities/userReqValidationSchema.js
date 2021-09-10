'use strict';

const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

// JOI setup
const extension = (joi) => ({
  type: 'string',
  base: joi.string(),
  messages: {
      'string.escapeHTML': `{{#label}} can´t include HTML!`
  },
  rules: {
      escapeHTML: {
          validate(value, helpers) {
              const clean = sanitizeHtml(value, {
                  allowedTags: [],
                  allowedAttributes: {},
              })
              if (clean !== value) return helpers.error('string.escapeHTML', { value })
              return clean
          }
      }
  }
});

const Joi = BaseJoi.extend(extension);

// JOI validation of newly created task
const userNewSchema = Joi.object({
  username: Joi.string().trim().max(100).required().escapeHTML(),
  email: Joi.string().trim().max(100).required().escapeHTML(),
  role: Joi.string().trim().max(100).required().valid(
    'Admin',
    'Normal')
    .escapeHTML(),
  password: Joi.string().required().escapeHTML()
});

module.exports = { userNewSchema };
