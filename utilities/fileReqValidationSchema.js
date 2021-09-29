'use strict';

const BaseJoi = require('joi')
    , sanitizeHtml = require('sanitize-html')

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
const fileNewSchema = Joi.object({
    original_name: Joi.string().trim().min(1).max(100).required().escapeHTML(),
    final_name: Joi.string().trim().min(1).max(100).allow(null, '').escapeHTML(),
    date_of_upload: Joi.string().trim().min(1).max(100).allow(null, '').escapeHTML(),
    status: Joi.string().trim().required().valid(
        'processed',
        'done',
    )
        .escapeHTML(),
});

module.exports = { fileNewSchema };
