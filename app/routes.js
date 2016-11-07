var express = require('express')
var router = express.Router()

// Route index page
router.get('/', function (req, res) {
  res.render('index', {snippets: require('./snippets.json')})
})

router.get('/test/:group/:testName/:type?', function (req, res){
  var {group, testName, type="isolated"} = req.params;

  var template = type == "isolated" ? "test-pages/isolated" : 'test-pages/in-template';

  res.render(template, {
    group: group, 
    testName: testName
  });
})


// router.get('/form-elements/', function (req, res) {
//   res.render('form-elements/index-form-elements')
// })

// router.get('/form-elements/form-fields', function (req, res) {
//   res.render('form-elements/form-fields')
// })

// router.get('/form-elements/form-focus-states', function (req, res) {
//   res.render('form-elements/form-focus-states')
// })

// router.get('/form-elements/form-hint-text', function (req, res) {
//   res.render('form-elements/form-hint-text')
// })


module.exports = router