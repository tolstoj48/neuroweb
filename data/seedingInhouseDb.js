// Importing data into in-house database
const mongoose = require('mongoose');
const Gene = require('../models/geneModel');

const { makeString } = require('../utilities/makeString')

// připojení k DB - musí běžet
mongoose.connect('mongodb://localhost:27017/neuroweb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connection open!')
  })
  .catch(err => {
    console.log('Error of connection')
    console.log(err)
  });

const insertManyFunction = (numberOfTimes) => {

  for (let i = 0; i < numberOfTimes; i++) {
    // Insert data
    Gene.insertMany([
      { Chr: makeString(15), 
        Start: makeString(5), 
        End: makeString(5), 
        Ref: makeString(5), 
        Alt: makeString(8), 
        gNomen: makeString(6), 
        Func_refGene: makeString(8), 
        GeneRefGene: makeString(12), 
        AF_GNOMAD: makeString(6), 
        InterVar_automated: makeString(15) , 
        clinvar: makeString(10),
        MULTI_ALLELIC: makeString(10),
        HOM_VAR: makeString(10),
        HET_REF: makeString(10),
        HET_OTHER: makeString(10),
        HOM_REF: makeString(10),
        NO_CALL: makeString(10),
        OTHER_GT: makeString(10),
        Var: makeString(10),
        CALLED: makeString(10),
        Qual: makeString(10),
        Ac: makeString(10),
        Af: makeString(10),
        HOM_VAR_samples: makeString(10),
        HET_REF_samples: makeString(10),
        HET_OTHERSamples: makeString(10),
        HOM_REF_samples: '2009KNO-0015_8609; 2009KNO-0015_9624; 2009KNO-0015_9630; 2009KNO-0015_9645; 2009KNO-0015_9647; 2009KNO-0015_9648; 2009KNO-0015_9649; 2009KNO-0015_9685; 2009KNO-0015_9699; 2009KNO-0015_9700; 2009KNO-0015_9767; 2009KNO-0015_9769; 2009KNO-0015_9770; 2009KNO-0015_9775; 2009KNO-0015_9828; 2009KNO-0015_9832; 2009KNO-0015_9851; 2009KNO-0015_9866; 2009KNO-0015_9867; 2010KNO-0003_9658; 2010KNO-0003_9872; 2010KNO-0003_9878; 2010KNO-0003_9881; 2010KNO-0003_9883; 2010KNO-0003_9886; 2010KNO-0003_9889; 2010KNO-0003_9890; WES022017_5794; WES022017_7386; WES022017_7443; WES022017_PL_1720; WES022017_PL_3775; WES022017_PL_6535; WES052016_3406; WES052016_3729; WES052016_4346; WES052016_6059; WES052016_6754; WES052016_6756; WES052016_6775; WES052016_6782; WES052016_6794; WES052016_858; WES072015_1909; WES072015_273; WES072015_5786; WES072015_6017; WES072015_6639; WES102015_6275; WES102015_6733; WES102015_6734; WES102015_6752; WES102015_6759; WES102015_6769; WES102015_6787; WES102015_6788; WES102015_6811; WES102015_6812; WES102015_6923; WES102015_6924; WES102015_6938; WES102015_6939; WES102015_6953; WES102015_6954; WES102015_6982; WES102015_6997; WES102015_6998; WES122015_4583; WES_012018_2_1538; WES_012018_2_5960; WES_012018_2_6086; WES_012018_2_6087; WES_012018_2_7390; WES_012018_2_776712; WES_012018_2_802216; WES_012018_2_8262; WES_012018_5801; WES_012018_5999; WES_012018_6990; WES_012018_7251; WES_012018_7644; WES_012018_8411; WES_012019_0306_3719; WES_012019_0306_7587; WES_012019_0306_8819; WES_012019_0306_8822; WES_012019_2_0046_4572; WES_012019_2_0046_6749; WES_012019_2_0046_6761; WES_012019_2_0046_6771; WES_012019_2_0046_6792; WES_012019_2_0046_6900; WES_012019_2_0046_6903; WES_012019_2_0046_7274; WES_012019_2_0046_7456; WES_012019_2_0046_7582; WES_012019_2_0046_7617; WES_012019_2_0046_7620; WES_012019_2_0046_7731; WES_012019_2_0046_7861; WES_012019_2_0046_7864; WES_012019_2_0046_7928; WES_012019_2_0046_8344; WES_012020_4035; WES_012020_4681; WES_012020_6242; WES_012020_7993; WES_012020_8330; WES_012020_8544; WES_012020_8623; WES_012020_8710; WES_012020_8713; WES_012020_9175; WES_012020_9349; WES_012020_HN00114721_9178; WES_012020_HN00114721_9233-B; WES_012020_HN00114721_D10; WES_012020_HN00114721_D1228; WES_012020_HN00114721_D1342; WES_012020_HN00114721_D150; WES_012020_HN00114721_D311; WES_012020_HN00114721_D321; WES_012020_HN00114721_D57; WES_012020_HN00114721_D78; WES_012020_HN00114721_D914; WES_012020_HN00118363_2076_07; WES_012020_HN00118363_5563_11; WES_012020_HN00118363_8686; WES_012020_HN00118363_8699; WES_012020_HN00118363_8796; WES_012020_HN00118363_8804; WES_012020_HN00118363_8807; WES_012020_HN00118363_9121; WES_012020_HN00118363_9226; WES_012020_HN00118363_9299; WES_012020_HN00118363_9302; WES_012020_HN00118363_9305; WES_012020_HN00118363_9352; WES_012020_HN00118363_9354; WES_012020_HN00118363_9356; WES_012020_HN00118363_9357; WES_012020_HN00118363_9359; WES_012020_HN00118363_9361; WES_012020_HN00118363_9403; WES_042017_6786; WES_052018_7378; WES_052018_7418; WES_062017_2702; WES_062017_5105; WES_062017_5126; WES_062017_5299; WES_062017_6092; WES_062017_6251; WES_062017_7008; WES_062017_7815; WES_062017_824; WES_062018_6394; WES_062018_6750; WES_062018_7101; WES_062018_7257; WES_062018_7258; WES_062018_7576; WES_062018_7619; WES_062018_8497; WES_062018_8498; WES_062018_8549; WES_072017_1843; WES_072017_3296; WES_072017_3980; WES_072017_4387; WES_072017_5609; WES_072017_629; WES_072017_6696; WES_072017_6697; WES_072017_6890; WES_072017_6891; WES_072017_6909; WES_072017_6910; WES_072017_6921; WES_072017_6922; WES_072017_6927; WES_072017_6960; WES_072017_6961; WES_072017_6975; WES_072017_6976; WES_072017_7621; WES_082018_113412; WES_082018_122917; WES_082018_1255717; WES_082018_201211; WES_082018_32318; WES_082018_399813; WES_082018_461016; WES_082018_5209; WES_082018_775212; WES_082018_826216; WES_082019_2834; WES_082019_3368; WES_082019_5390; WES_082019_7484; WES_082019_7870; WES_082019_8401; WES_082019_8566; WES_082019_8617; WES_082019_8881; WES_082019_9056; WES_102018_1021516; WES_102018_141615; WES_102018_1461217; WES_102018_207607; WES_102018_218517; WES_102018_233412; WES_102018_249417; WES_102018_258316; WES_102018_3180; WES_102018_340611; WES_102018_345211; WES_102018_429016; WES_102018_4836; WES_102018_518309; WES_102018_6302; WES_102018_730915; WES_102018_805316; WES_102018_850216; WES_102018_8756; WES_112017_115114; WES_112017_176612; WES_112017_219008; WES_112017_268911; WES_112017_339713; WES_112017_486412; WES_112017_618213; WES_112017_687813; WES_112017_704010; WES_112017_7830; WES_122018_4498; WES_122018_4691; WES_122018_6284; WES_122018_7128; WES_122018_7682; WES_122018_7805; WES_122018_7852; WES_122018_8427; WES_122018_8454; WES_122018_8502; WES_122019_117497_D1003; WES_122019_117497_D618; WES_122019_117497_D622; WES_122019_117497_D715; WES_122019_1585918; WES_122019_D119; WES_122019_D42; WES_122019_D438; WES_122019_D476; WES_122019_D50; WES_2003KNO-0029_8725; WES_2003KNO-0029_8830; WES_2003KNO-0029_8965; WES_2003KNO-0029_8989; WES_2003KNO-0029_9378; WES_2003KNO-0029_9384; WES_2003KNO-0029_9399; WES_2003KNO-0029_9400; WES_2003KNO-0029_9450; WES_2003KNO-0029_9453; WES_2003KNO-0029_9495; WES_2003KNO-0029_9547; WES_2003KNO-0029_9550; WES_2003KNO-0029_9553; WES_2003KNO-0029_9556; WES_2003KNO-0029_9559; WES_2003KNO-0029_9562; WES_2003KNO-0029_9565; WES_2003KNO-0029_9568; WES_2003KNO-0029_9572; WES_2003KNO-0029_9581; WES_2003KNO-0029_9584; WES_2003KNO-0029_9587; WES_2003KNO-0029_9590; WES_2003KNO-0029_9593; WES_2003KNO-0029_9599; WES_2003KNO-0029_9602; WES_2003KNO-0029_9607; WES_2004KNO-0015_1605319; WES_2004KNO-0015_1667319; WES_2004KNO-0015_9411; WES_2004KNO-0015_9412; WES_2004KNO-0015_9413; WES_2004KNO-0015_9432; WES_2004KNO-0015_9467; WES_2004KNO-0015_9473; WES_2004KNO-0015_9477; WES_2004KNO-0015_9487; WES_2004KNO-0015_9488; WES_2004KNO-0015_9493; WES_2004KNO-0015_9513; WES_2004KNO-0015_9541; WES_2007KNO-0011_9338; WES_2007KNO-0011_9397; WES_2007KNO-0011_9668; WES_2007KNO-0011_9671; WES_2007KNO-0011_9674; WES_2008KNO-0025_MCD1188; WES_2008KNO-0025_MCD1194; WES_2008KNO-0025_MCD1261; WES_2008KNO-0025_MCD1263; WES_2008KNO-0025_MCD1265; WES_5_082015_1065; WES_5_082015_201324152-6085x; WES_5_082015_2234; WES_5_082015_4390; WES_5_082015_5653; WES_5_082015_5952; WES_5_082015_6487; WES_5_082015_6695; WES_BB_012020_MCD1094; WES_BB_012020_MCD1097; WES_HN00119607_2123; WES_HN00119607_3155; WES_HN00119607_3401; WES_HN00119607_5543; WES_HN00119607_7560; WES_HN00119607_8693; WES_HN00121793_8414; WES_HN00121793_9447; WES_MCD_112020_MCD1104; WES_MCD_112020_MCD1221; WES_MCD_112020_MCD1267; WES_MCD_112020_MCD1270; WES_MCD_112020_MCD1271; WES_MCD_112020_MCD1275; WES_MCD_112020_MCD1283; WES_MCD_112020_MCD1293; WES_MCD_112020_MCD1296; WES_MCD_112020_MCD1299; WES_MCD_112020_MCD1305; WES_MCD_112020_MCD1308; WES_MCD_112020_MCD1312; WES_MCD_112020_MCD1315; WES_MCD_112020_MCD1319; WES_MCD_112020_MCD1324; WES_MU_3649; WES_MU_3650; WES_MU_3651; WES_MU_3652',
        NO_CALL_samples: '2009KNO-0015_8609; 2009KNO-0015_9624; 2009KNO-0015_9630; 2009KNO-0015_9645; 2009KNO-0015_9647; 2009KNO-0015_9648; 2009KNO-0015_9649; 2009KNO-0015_9685; 2009KNO-0015_9699; 2009KNO-0015_9700; 2009KNO-0015_9767; 2009KNO-0015_9769; 2009KNO-0015_9770; 2009KNO-0015_9775; 2009KNO-0015_9828; 2009KNO-0015_9832; 2009KNO-0015_9851; 2009KNO-0015_9866; 2009KNO-0015_9867; 2010KNO-0003_9658; 2010KNO-0003_9872; 2010KNO-0003_9878; 2010KNO-0003_9881; 2010KNO-0003_9883; 2010KNO-0003_9886; 2010KNO-0003_9889; 2010KNO-0003_9890; WES022017_5794; WES022017_7386; WES022017_7443; WES022017_PL_1720; WES022017_PL_3775; WES022017_PL_6535; WES052016_3406; WES052016_3729; WES052016_4346; WES052016_6059; WES052016_6754; WES052016_6756; WES052016_6775; WES052016_6782; WES052016_6794; WES052016_858; WES072015_1909; WES072015_273; WES072015_5786; WES072015_6017; WES072015_6639; WES102015_6275; WES102015_6733; WES102015_6734; WES102015_6752; WES102015_6759; WES102015_6769; WES102015_6787; WES102015_6788; WES102015_6811; WES102015_6812; WES102015_6923; WES102015_6924; WES102015_6938; WES102015_6939; WES102015_6953; WES102015_6954; WES102015_6982; WES102015_6997; WES102015_6998; WES122015_4583; WES_012018_2_1538; WES_012018_2_5960; WES_012018_2_6086; WES_012018_2_6087; WES_012018_2_7390; WES_012018_2_776712; WES_012018_2_802216; WES_012018_2_8262; WES_012018_5801; WES_012018_5999; WES_012018_6990; WES_012018_7251; WES_012018_7644; WES_012018_8411; WES_012019_0306_3719; WES_012019_0306_7587; WES_012019_0306_8819; WES_012019_0306_8822; WES_012019_2_0046_4572; WES_012019_2_0046_6749; WES_012019_2_0046_6761; WES_012019_2_0046_6771; WES_012019_2_0046_6792; WES_012019_2_0046_6900; WES_012019_2_0046_6903; WES_012019_2_0046_7274; WES_012019_2_0046_7456; WES_012019_2_0046_7582; WES_012019_2_0046_7617; WES_012019_2_0046_7620; WES_012019_2_0046_7731; WES_012019_2_0046_7861; WES_012019_2_0046_7864; WES_012019_2_0046_7928; WES_012019_2_0046_8344; WES_012020_4035; WES_012020_4681; WES_012020_6242; WES_012020_7993; WES_012020_8330; WES_012020_8544; WES_012020_8623; WES_012020_8710; WES_012020_8713; WES_012020_9175; WES_012020_9349; WES_012020_HN00114721_9178; WES_012020_HN00114721_9233-B; WES_012020_HN00114721_D10; WES_012020_HN00114721_D1228; WES_012020_HN00114721_D1342; WES_012020_HN00114721_D150; WES_012020_HN00114721_D311; WES_012020_HN00114721_D321; WES_012020_HN00114721_D57; WES_012020_HN00114721_D78; WES_012020_HN00114721_D914; WES_012020_HN00118363_2076_07; WES_012020_HN00118363_5563_11; WES_012020_HN00118363_8686; WES_012020_HN00118363_8699; WES_012020_HN00118363_8796; WES_012020_HN00118363_8804; WES_012020_HN00118363_8807; WES_012020_HN00118363_9121; WES_012020_HN00118363_9226; WES_012020_HN00118363_9299; WES_012020_HN00118363_9302; WES_012020_HN00118363_9305; WES_012020_HN00118363_9352; WES_012020_HN00118363_9354; WES_012020_HN00118363_9356; WES_012020_HN00118363_9357; WES_012020_HN00118363_9359; WES_012020_HN00118363_9361; WES_012020_HN00118363_9403; WES_042017_6786; WES_052018_7378; WES_052018_7418; WES_062017_2702; WES_062017_5105; WES_062017_5126; WES_062017_5299; WES_062017_6092; WES_062017_6251; WES_062017_7008; WES_062017_7815; WES_062017_824; WES_062018_6394; WES_062018_6750; WES_062018_7101; WES_062018_7257; WES_062018_7258; WES_062018_7576; WES_062018_7619; WES_062018_8497; WES_062018_8498; WES_062018_8549; WES_072017_1843; WES_072017_3296; WES_072017_3980; WES_072017_4387; WES_072017_5609; WES_072017_629; WES_072017_6696; WES_072017_6697; WES_072017_6890; WES_072017_6891; WES_072017_6909; WES_072017_6910; WES_072017_6921; WES_072017_6922; WES_072017_6927; WES_072017_6960; WES_072017_6961; WES_072017_6975; WES_072017_6976; WES_072017_7621; WES_082018_113412; WES_082018_122917; WES_082018_1255717; WES_082018_201211; WES_082018_32318; WES_082018_399813; WES_082018_461016; WES_082018_5209; WES_082018_775212; WES_082018_826216; WES_082019_2834; WES_082019_3368; WES_082019_5390; WES_082019_7484; WES_082019_7870; WES_082019_8401; WES_082019_8566; WES_082019_8617; WES_082019_8881; WES_082019_9056; WES_102018_1021516; WES_102018_141615; WES_102018_1461217; WES_102018_207607; WES_102018_218517; WES_102018_233412; WES_102018_249417; WES_102018_258316; WES_102018_3180; WES_102018_340611; WES_102018_345211; WES_102018_429016; WES_102018_4836; WES_102018_518309; WES_102018_6302; WES_102018_730915; WES_102018_805316; WES_102018_850216; WES_102018_8756; WES_112017_115114; WES_112017_176612; WES_112017_219008; WES_112017_268911; WES_112017_339713; WES_112017_486412; WES_112017_618213; WES_112017_687813; WES_112017_704010; WES_112017_7830; WES_122018_4498; WES_122018_4691; WES_122018_6284; WES_122018_7128; WES_122018_7682; WES_122018_7805; WES_122018_7852; WES_122018_8427; WES_122018_8454; WES_122018_8502; WES_122019_117497_D1003; WES_122019_117497_D618; WES_122019_117497_D622; WES_122019_117497_D715; WES_122019_1585918; WES_122019_D119; WES_122019_D42; WES_122019_D438; WES_122019_D476; WES_122019_D50; WES_2003KNO-0029_8725; WES_2003KNO-0029_8830; WES_2003KNO-0029_8965; WES_2003KNO-0029_8989; WES_2003KNO-0029_9378; WES_2003KNO-0029_9384; WES_2003KNO-0029_9399; WES_2003KNO-0029_9400; WES_2003KNO-0029_9450; WES_2003KNO-0029_9453; WES_2003KNO-0029_9495; WES_2003KNO-0029_9547; WES_2003KNO-0029_9550; WES_2003KNO-0029_9553; WES_2003KNO-0029_9556; WES_2003KNO-0029_9559; WES_2003KNO-0029_9562; WES_2003KNO-0029_9565; WES_2003KNO-0029_9568; WES_2003KNO-0029_9572; WES_2003KNO-0029_9581; WES_2003KNO-0029_9584; WES_2003KNO-0029_9587; WES_2003KNO-0029_9590; WES_2003KNO-0029_9593; WES_2003KNO-0029_9599; WES_2003KNO-0029_9602; WES_2003KNO-0029_9607; WES_2004KNO-0015_1605319; WES_2004KNO-0015_1667319; WES_2004KNO-0015_9411; WES_2004KNO-0015_9412; WES_2004KNO-0015_9413; WES_2004KNO-0015_9432; WES_2004KNO-0015_9467; WES_2004KNO-0015_9473; WES_2004KNO-0015_9477; WES_2004KNO-0015_9487; WES_2004KNO-0015_9488; WES_2004KNO-0015_9493; WES_2004KNO-0015_9513; WES_2004KNO-0015_9541; WES_2007KNO-0011_9338; WES_2007KNO-0011_9397; WES_2007KNO-0011_9668; WES_2007KNO-0011_9671; WES_2007KNO-0011_9674; WES_2008KNO-0025_MCD1188; WES_2008KNO-0025_MCD1194; WES_2008KNO-0025_MCD1261; WES_2008KNO-0025_MCD1263; WES_2008KNO-0025_MCD1265; WES_5_082015_1065; WES_5_082015_201324152-6085x; WES_5_082015_2234; WES_5_082015_4390; WES_5_082015_5653; WES_5_082015_5952; WES_5_082015_6487; WES_5_082015_6695; WES_BB_012020_MCD1094; WES_BB_012020_MCD1097; WES_HN00119607_2123; WES_HN00119607_3155; WES_HN00119607_3401; WES_HN00119607_5543; WES_HN00119607_7560; WES_HN00119607_8693; WES_HN00121793_8414; WES_HN00121793_9447; WES_MCD_112020_MCD1104; WES_MCD_112020_MCD1221; WES_MCD_112020_MCD1267; WES_MCD_112020_MCD1270; WES_MCD_112020_MCD1271; WES_MCD_112020_MCD1275; WES_MCD_112020_MCD1283; WES_MCD_112020_MCD1293; WES_MCD_112020_MCD1296; WES_MCD_112020_MCD1299; WES_MCD_112020_MCD1305; WES_MCD_112020_MCD1308; WES_MCD_112020_MCD1312; WES_MCD_112020_MCD1315; WES_MCD_112020_MCD1319; WES_MCD_112020_MCD1324; WES_MU_3649; WES_MU_3650; WES_MU_3651; WES_MU_3652',
        OTHER_GT_samples: makeString(5000),
      }
    ])
      .then(data => {
        console.log('The data has been seeded into the inhouse db!');
        // Imported data
        console.log(data);
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
