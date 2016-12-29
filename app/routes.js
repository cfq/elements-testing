var express = require('express')
var router = express.Router()

// Route index page
router.get('/', function (req, res) {
  res.render('index', {
    snippets: require('./snippets.json'),
    examples: require('./examples.json')
  })
})

// All elements on a single page
router.get('/test/all', function (req, res) {
  res.render('test-pages/all', {
    snippets: require('./snippets.json'),
    examples: require('./examples.json')
  })
})

router.get('/test/:group/:testName/:type?', function (req, res){
  var {group, testName, type="isolated"} = req.params;

  var template = type == "isolated" ? "test-pages/isolated" : 'test-pages/in-template';

  res.render(template, {
    group: group, 
    testName: testName
  });
})

module.exports = router