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
  let data = "";
  // What has been searched for -> information for the search result in the view needed
  let searchedCategory = searchGnomen ? "gNomen" : "gene.Refgene";
  // Expression for the result of the search in the view
  let searchedExp = searchGnomen ? searchGnomen : searchGeneRefGene;
  // Trimed expression in the case user use whitespaces at the beginning and end of the searched expression
  if (searchedExp) searchedExp = searchedExp.trim();

  if (searchGnomen == "" || searchGnomen == " ") {
    // Fulltext search - GNomen - needs non existent and empty
    const dataNoGNomen = await Gene.find({ GNomen: { "$exists": false  } });
    const dataEmptyNoGNomen = await Gene.find({ GNomen: "" });
    data = dataNoGNomen.concat(dataEmptyNoGNomen);
    // Setup information for the search result - searched category
    searchedCategory = "gNomen";
  } else if (searchGnomen) {
    data = await Gene.find({ GNomen: { "$regex": `${searchGnomen.trim()}`, "$options": "i" } });
  } else if (searchGeneRefGene == "" || searchGeneRefGene == " ") {
    // Fulltext search - GeneRefGene - needs non existent and empty
    const dataNoGeneRefGene = await Gene.find({ GeneRefGene: { "$exists": false  } });
    const dataEmptyGeneRefGene = await Gene.find({ GeneRefGene: "" });
    data = dataNoGeneRefGene.concat(dataEmptyGeneRefGene);
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

  const numberOfDbEntries = await Gene.countDocuments({});

  res.render("genes/search-genes", {
    layout: 'index' ,
    title: 'NGL - search in-house db',
    numberOfDbEntries,
    data,
    searchedExp,
    searchedCategory,
    numberOfFoundPositions,
    searched: true,
  });
}

