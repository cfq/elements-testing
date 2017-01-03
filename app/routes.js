var express = require('express')
var router = express.Router()

var _ = require('lodash')

var snippets = require('./snippets.json')
var examples = require('./examples.json')

// var snippetMap = _.reduce(_.values(snippets), function (a, b){ return _.merge(a, b) });

// Route index page
router.get('/', function (req, res) {
  res.render('index', {
    snippets: snippets,
    examples: examples
  })
})

// All elements on a single page
router.get('/test/all', function (req, res) {
  res.render('test-pages/all', {
    snippets: snippets,
    examples: examples
  })
})

router.get('/test/:group/:testName/:type?', function (req, res){
  var {group, testName, type='isolated'} = req.params;

  var template = type == 'isolated' ? 'test-pages/isolated' : 'test-pages/in-template';

  res.render(template, {
    group: group, 
    testName: testName
  });
})

router.get('/example/:exampleName/:type?', function (req, res){
  var {exampleName, type='isolated'} = req.params;

  var example = _.filter(examples, {'slug': exampleName})[0]
  var template = type == 'isolated' ? 'test-pages/isolated' : 'test-pages/in-template';

  if( !!example ){
    res.render( template, {
      type: type,
      group: example.group,
      testName: example.from,
      slug: example.slug
    })
  }
})

router.post('/example/:exampleName/:type?', function (req, res){
  var {exampleName, type='isolated'} = req.params;

  var example = _.filter(examples, {'slug': exampleName})[0]
  var template = type == 'isolated' ? 'test-pages/isolated' : 'test-pages/in-template';

  if( !!example ){
    res.render( template, {
      group: example.group,
      testName: example.to,
      slug: example.slug
    })
  }

})

module.exports = router