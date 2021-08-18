// Importing data into in-house database
const mongoose = require("mongoose");
const Gene = require("../models/geneModel");

const { makeString } = require("../utilities/makeString")

// připojení k DB - musí běžet
mongoose.connect('mongodb://localhost:27017/neuroweb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connection open!")
  })
  .catch(err => {
    console.log("Error of connection")
    console.log(err)
  });

const insertManyFunction = (numberOfTimes) => {

  for (let i = 0; i < numberOfTimes; i++) {
    // Insert data
    Gene.insertMany([
      { Chr: makeString(15), 
        Start: makeString(5), 
        End: makeString(5), 
        ef: makeString(5), 
        Alt: makeString(8), 
        GNomen: makeString(6), 
        FuncRefGene: makeString(8), 
        GeneRefGene: makeString(12), 
        AfGnomad: makeString(6), 
        InterVarAutomated: makeString(15) , 
        Clinvar: makeString(10),
        MultiAllelic: makeString(10),
        HomVar: makeString(10),
        HetRef: makeString(10),
        HetOther: makeString(10),
        HomRef: makeString(10),
        NoCall: makeString(10),
        OtherGt: makeString(10),
        Var: makeString(10),
        Called: makeString(10),
        Qual: makeString(10),
        Ac: makeString(10),
        Af: makeString(10),
        HomVarSamples: makeString(10),
        HetRefSamples: makeString(10),
        HetOtherSamples: makeString(10),
        HomRefSamples: makeString(10),
        NoCallSamples: makeString(6000),
        OtherGtSamples: makeString(5000),
      },
      { Chr: makeString(15), 
        Start: makeString(5), 
        End: makeString(5), 
        ef: makeString(5), 
        Alt: makeString(8), 
        GNomen: makeString(6), 
        FuncRefGene: makeString(8), 
        GeneRefGene: makeString(12), 
        AfGnomad: makeString(6), 
        InterVarAutomated: makeString(15) , 
        Clinvar: makeString(10),
        MultiAllelic: makeString(10),
        HomVar: makeString(10),
        HetRef: makeString(10),
        HetOther: makeString(10),
        HomRef: makeString(10),
        NoCall: makeString(10),
        OtherGt: makeString(10),
        Var: makeString(10),
        Called: makeString(10),
        Qual: makeString(10),
        Ac: makeString(10),
        Af: makeString(10),
        HomVarSamples: makeString(10),
        HetRefSamples: makeString(10),
        HetOtherSamples: makeString(10),
        HomRefSamples: makeString(10),
        NoCallSamples: makeString(6000),
        OtherGtSamples: makeString(5000),
      }
    ])
      .then(data => {
        console.log("It worked")
        // Imported data
        console.log(data)
      });
  }
}

process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected on app termination');
    process.exit(0);
  });
});

insertManyFunction(process.argv[2]);