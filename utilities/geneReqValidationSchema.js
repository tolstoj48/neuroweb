'use strict';

const BaseJoi = require('joi');


// JOI setup
const extension = (joi) => ({
  type: 'string',
  base: joi.string(),
  messages: {
      'string.escapeHTML': `{{#label}} can´t include HTML!`
  },
  rules: {
      escapeHTML: {
      }
  }
});

const Joi = BaseJoi.extend(extension);

// JOI validation of imported gene positions
const geneImportSchema = Joi.object({
  Chr: Joi.string().trim().allow(null, ""),
  Start: Joi.string().trim().allow(null, ""),
  End: Joi.string().trim().allow(null, ""),
  Ref: Joi.string().trim().allow(null, ""),
  Alt: Joi.string().trim().allow(null, ""),
  gNomen: Joi.string().trim().allow(null, ""),
  Func_refGene: Joi.string().trim().allow(null, ""),
  Gene_refGene: Joi.string().trim().allow(null, ""),
  AF_GNOMAD: Joi.string().trim().allow(null, ""),
  InterVar_automated: Joi.string().trim().allow(null, ""),
  clinvar: Joi.string().trim().allow(null, ""),
  MULTI_ALLELIC: Joi.string().trim().allow(null, ""),
  HOM_VAR: Joi.string().trim().allow(null, ""),
  HET_REF: Joi.string().trim().allow(null, ""),
  HET_OTHER: Joi.string().trim().allow(null, ""),
  HOM_REF: Joi.string().trim().allow(null, ""),
  NO_CALL: Joi.string().trim().allow(null, ""),
  OTHER_GT: Joi.string().trim().allow(null, ""),
  VAR: Joi.string().trim().allow(null, ""),
  CALLED: Joi.string().trim().allow(null, ""),
  QUAL: Joi.string().trim().allow(null, ""),
  AC: Joi.string().trim().allow(null, ""),
  AF: Joi.string().trim().allow(null, ""),
  HOM_VAR_samples: Joi.string().trim().allow(null, ""),
  HET_REF_samples: Joi.string().trim().allow(null, ""),
  HET_OTHER_samples: Joi.string().trim().allow(null, ""),
  HOM_REF_samples: Joi.string().trim().allow(null, ""),
  NO_CALL_samples: Joi.string().trim().allow(null, ""),
  OTHER_GT_samples: Joi.string().trim().allow(null, ""),
});

module.exports = { geneImportSchema };