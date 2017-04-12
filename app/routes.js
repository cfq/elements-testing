var express = require('express')
var router = express.Router()

var _ = require('lodash')

var snippets = require('./snippets.json')
var examples = require('./examples.json')
var answers = require('./answers.json')

// var snippetMap = _.reduce(_.values(snippets), function (a, b){ return _.merge(a, b) });

// Route index page
router.get('/', function (req, res) {
  res.render('index', {
    snippets: snippets,
    examples: examples
  })
})

router.get('/patterns/task-list/:variant?', function (req, res) {
  var { variant = 'index' } = req.params;
  var template = 'patterns/task-list/' + variant;

  res.render(template)
})

router.get('/check-your-answers/:variant?', function (req, res) {
  var { variant = 'index' } = req.params;
  var template = 'check-your-answers/' + variant;

  res.render(template, {
    answers: answers
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
      slug: example.slug,
      submit: example.submit
    })
  }
})

router.post('/example/:exampleName/:type?', function (req, res){
  var {exampleName, type='isolated'} = req.params;

  var example = _.filter(examples, {'slug': exampleName})[0]
  var template = type == 'isolated' ? 'test-pages/isolated' : 'test-pages/in-template';
  var is_multiple_error_page = req.body.fullName && req.body.niNo
  var pass = _.reduce(_.map( req.body, x => !!x ), function (a,b){ return a && b; })
  var error = is_multiple_error_page ? !pass : true
  var is_inset_radio_page = !!req.body.radio_contact_group

  var view_params = _.merge({
      group: example.group,
      testName: example.to,
      slug: example.slug,
      submit: example.submit,
      error: error,
      error2: is_inset_radio_page,
      posted: true
    }, req.body)

  if( !!example ){
    res.render( template, view_params )
  }

})


router.get('/error-summary/:position/:summarylevel?/:titlelevel?/:type?', function (req, res){
  var {position='error-title', summarylevel='2', titlelevel='1', type=''} = req.params;
  var alert, anchor, titlechange, headingchange = false;
  var page = (position=='index') ? 'index' : 'form';
  var template = 'error-summary/' + page;

  switch (type) {
    case 'a':
      alert = true;
      break;
    case 'b':
      anchor = true;
      break;
    case 'c':
      alert = true;
      anchor = true;
      break;
    case 'd':
      titlechange = true;
      break;
    case 'e':
      titlechange = true;
      headingchange = true;
      break;
  }

  res.render(template, {
    error: false,
    summaryfirst: (position == 'error-title'),
    summarylevel: summarylevel,
    titlelevel: titlelevel,
    alert: alert,
    anchor: anchor,
    titlechange: titlechange,
    headingchange: headingchange
  })
})

router.post('/error-summary/:position/:summarylevel?/:titlelevel?/:type?', function (req, res){
  var {position='error-title', summarylevel='2', titlelevel='1', type=''} = req.params;
  var alert, anchor, titlechange, headingchange = false;

  switch (type) {
    case 'a':
      alert = true;
      break;
    case 'b':
      anchor = true;
      break;
    case 'c':
      alert = true;
      anchor = true;
      break;
    case 'd':
      titlechange = true;
      break;
    case 'e':
      titlechange = true;
      headingchange = true;
      break;
  }

  res.render('error-summary/form', {
    error: true,
    summaryfirst: (position == 'error-title'),
    summarylevel: summarylevel,
    titlelevel: titlelevel,
    alert: alert,
    anchor: anchor,
    titlechange: titlechange,
    headingchange: headingchange
  })
})

module.exports = router
