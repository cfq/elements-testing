var express = require('express')
var router = express.Router()

// Route index page
router.get('/', function (req, res) {
  res.render('index')
})

router.get('/form-elements/', function (req, res) {
  res.render('form-elements/index-form-elements')
})

router.get('/form-elements/form-fields', function (req, res) {
  res.render('form-elements/form-fields')
})

router.get('/form-elements/form-focus-states', function (req, res) {
  res.render('form-elements/form-focus-states')
})

router.get('/form-elements/form-hint-text', function (req, res) {
  res.render('form-elements/form-hint-text')
})


module.exports = router