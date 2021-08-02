"use strict";

const BaseJoi = require("joi");

const sanitizeHtml = require("sanitize-html");

// JOI setup
const extension = (joi) => ({
  type: "string",
  base: joi.string(),
  messages: {
      "string.escapeHTML": `{{#label}} can´t include HTML!`
  },
  rules: {
      escapeHTML: {
          validate(value, helpers) {
              const clean = sanitizeHtml(value, {
                  allowedTags: [],
                  allowedAttributes: {},
              })
              if (clean !== value) return helpers.error("string.escapeHTML", { value })
              return clean
          }
      }
  }
});

const Joi = BaseJoi.extend(extension);

// JOI validation of newly created comment
const commentNewSchema = Joi.object({
  name: Joi.string().trim().max(150).required().escapeHTML(),
  content: Joi.string().trim().max(3000).allow(null, "").escapeHTML(),
});

module.exports = { commentNewSchema };
