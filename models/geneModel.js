'use strict';

const mongoose = require("mongoose");

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
    GNomen: {
      type: String,
    },
    FuncRefGene: {
      type: String
    },
    GeneRefGene: {
      type: String
    },
    AfGnomad: {
      type: String
    },
    InterVarAutomated: {
      type: String
    }
  });

const Gene = mongoose.model("Gene", geneSchema);

module.exports = Gene;