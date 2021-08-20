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
    },
    Clinvar: {
      type: String
    },
    MultiAllelic: {
      type: String
    },
    HomVar: {
      type: String
    },
    HetRef: {
      type: String
    },
    HetOther: {
      type: String
    },
    HomRef: {
      type: String
    },
    NoCall: {
      type: String
    },
    OtherGt: {
      type: String
    },
    Var: {
      type: String
    },
    Called: {
      type: String
    },
    Qual: {
      type: String
    },
    Ac: {
      type: String
    },
    Af: {
      type: String
    },
    HomVarSamples: {
      type: String
    },
    HetRefSamples: {
      type: String
    },
    HetOtherSamples: {
      type: String
    },
    HomRefSamples: {
      type: String
    },
    NoCallSamples: {
      type: String
    },
    OtherGtSamples: {
      type: String
    },
  });

const Gene = mongoose.model('Gene', geneSchema);

module.exports = Gene;