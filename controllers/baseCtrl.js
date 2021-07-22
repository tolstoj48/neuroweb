

// Render page with useful links
module.exports.home = (req, res) => { 
  res.render('main', { 
    layout: 'index',
    title: 'NGL - Homepage',
  });
}

// Render page with useful links
module.exports.links = (req, res) => { 
  res.render('links', { 
    layout: 'index',
    title: 'NGL - Links',
  });
}

// Render page with analysis uploads
module.exports.analysis = (req, res) => { 
  res.render('analysis', { 
    layout: 'index',
    title: 'NGL - Analysis',
  });
}

// Render page with db search
module.exports.dbsearch = (req, res) => { 
  res.render('dbsearch', { 
    layout: 'index',
    title: 'NGL - Db search',
  });
}

