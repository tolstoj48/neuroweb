'use strict';

const Gene = require("../models/geneModel");

// Import new db
module.exports.importDb = (req, res) => {
  res.render('comments/new-comment', {
    layout: 'index',
    title: 'NGL - import data to in-house db',
  });
}


// Search db for genomin position
module.exports.searchGene = async (req, res) => {
  const  { searchGnomen, searchGeneRefGene } = req.query;
  // What has been searched for -> information for the search result in the view needed
  let searchedCategory = searchGnomen ? "gNomen" : "gene.Refgene";
  let data = "";
  // Expression for the result of the search in the view
  let searchedExp = searchGnomen ? searchGnomen : searchGeneRefGene;
  // Trimed expression in the case user use whitespaces at the beginning and end of the searched expression
  if (searchedExp) searchedExp = searchedExp.trim();

  if (searchGnomen == "") {
    // Fulltext search - GNomen
    data = await Gene.find({ GNomen: { "$exists": false  } });
    // Setup information for the search result - searched category
    searchedCategory = "gNomen";
  } else if (searchGnomen) {
    data = await Gene.find({ GNomen: { "$regex": `${searchGnomen.trim()}`, "$options": "i" } });
  } else if (searchGeneRefGene == "") {
    data = await Gene.find({ GeneRefGene: { "$exists": false  } });
    // Setup information for the search result - searched category
    searchedCategory = "gene.Refgene";
  } else if (searchGeneRefGene) {
    // Fulltext search - geneRefGene
    data = await Gene.find({ GeneRefGene: { "$regex": `${searchGeneRefGene.trim()}`, "$options": "i" } });
  } else {
    // Fulltext search - nothing filled in by the user
    data = await Gene.find();
  }
  // Information about the number of gene positions result
  const numberOfFoundPositions = data.length;

  res.render("genes/search-genes", {
    layout: 'index' ,
    title: 'NGL - search in-house db',
    data,
    searchedExp,
    searchedCategory,
    numberOfFoundPositions,
    searched: true,
  });
}

