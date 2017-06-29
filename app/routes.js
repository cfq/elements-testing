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


router.get('/error-summary/:position/:summarylevel?/:titlelevel?/:type?/:label?', function (req, res){
  var {position='error-title', summarylevel='2', titlelevel='1', type='', label=''} = req.params;
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
    headingchange: headingchange,
    label: !label.length
  })
})

router.post('/error-summary/:position/:summarylevel?/:titlelevel?/:type?/:label?', function (req, res){
  var {position='error-title', summarylevel='2', titlelevel='1', type='', label=''} = req.params;
  var alert, anchor, titlechange, headingchange, alert2 = false;

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
    case 'f':
      titlechange = true;
      alert = true;
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
    headingchange: headingchange,
    label: !label.length
  })
})


router.get('/form-test/:page?', function (req, res){
  var { page = 'index' } = req.params;
  var template = 'error-summary-ur/' + page;

  res.render(template, {})
})

router.post('/form-test/:page?', function (req, res){
  var is_tested_page = typeof req.body.referenceNumber !== 'undefined'

  if (is_tested_page) {
    var correct_ref_1 = 'ad019843b' // AD 01 98 43 B
    var correct_ref_2 = '566683327897b' // 566683327897B
    var ref = req.body.referenceNumber.replace(/\s/g,'').toLowerCase()
    var error = !(ref == correct_ref_1 || ref == correct_ref_2)

    if (error) {
      var view_params = _.merge({
        error: error
      }, req.body)

      res.render('error-summary-ur/reference-number', view_params)
    } else {
      res.redirect('thanks')
    }

  } else {
    res.redirect('/form-test/reference-number')
  }
})


router.get('/legends-headings/:page?/:type?/', function (req, res){
  var { page = 'index', type = 'a' } = req.params;
  var template = 'legends-headings/' + page;
  var show_legend, show_h1, add_legend, add_h1, move_h1;
  show_legend = show_h1 = add_legend = add_h1 = h1_top = true;

  switch (type) {
    // hide legend
    case 'a':
      show_legend = false;
      break;
    // hide heading
    case 'b':
      show_h1 = false;
      break;
    // remove legend
    case 'c':
      add_legend = false;
      break;
    // remove heading
    case 'd':
      add_h1 = false;
      break;
    // move heading into legend
    case 'e':
      h1_top = false;
      break;
  }

  var view_params = _.merge({
    show_legend: show_legend,
    show_h1: show_h1,
    add_legend: add_legend,
    add_h1: add_h1,
    h1_top: h1_top
  }, req.body)

  res.render(template, view_params)
})


module.exports = router
