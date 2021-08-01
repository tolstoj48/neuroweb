"use strict";

const BaseJoi = require("joi");

const sanitizeHtml = require("sanitize-html");

// nastavení JOI
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

// JOI validation of newly created task
const taskNewSchema = Joi.object({
  date: Joi.string().trim().min(10).max(10).required().escapeHTML(),
  to_do_task: Joi.string().trim().max(1500).allow(null, "").escapeHTML(),
  who_wants_it: Joi.string().trim().max(50).allow(null, "").escapeHTML(),
  done: Joi.string().trim().max(10).required().valid(
    "true",
    "false", 
    "in process")
    .escapeHTML(),
});

module.exports = { taskNewSchema };
