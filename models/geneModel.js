'use strict';

const mongoose = require('mongoose');

// Definition of new schema
const geneSchema = new mongoose.Schema({
    Chr: {
      type: String,
    },
    Start: {
      type: String,
    },
    End: {
      type: String,
    },
    Ref: {
      type: String,
    },
    Alt: {
      type: String,
    },
    gNomen: {
      type: String,
    },
    Func_refGene: {
      type: String
    },
    Gene_refGene: {
      type: String
    },
    AF_GNOMAD: {
      type: String
    },
    InterVar_automated: {
      type: String
    },
    clinvar: {
      type: String
    },
    MULTI_ALLELIC: {
      type: String
    },
    HOM_VAR: {
      type: String
    },
    HET_REF: {
      type: String
    },
    HET_OTHER: {
      type: String
    },
    HOM_REF: {
      type: String
    },
    NO_CALL: {
      type: String
    },
    OTHER_GT: {
      type: String
    },
    VAR: {
      type: String
    },
    CALLED: {
      type: String
    },
    QUAL: {
      type: String
    },
    AC: {
      type: String
    },
    AF: {
      type: String
    },
    HOM_VAR_samples: {
      type: String
    },
    HET_REF_samples: {
      type: String
    },
    HET_OTHERSamples: {
      type: String
    },
    HOM_REF_samples: {
      type: String
    },
    NO_CALL_samples: {
      type: String
    },
    OTHER_GT_samples: {
      type: String
    },
  });

const Gene = mongoose.model('Gene', geneSchema);

module.exports = Gene;