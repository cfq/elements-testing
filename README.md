# GOV.UK Elements accessibility test

It's based on [GOV.UK Prototype Toolkit](https://github.com/alphagov/govuk_prototype_kit).

## Adding a new test

1. Open `app/routes.js` in your editor and add another route above the last line in this format:

```javascript
router.get('/form-elements/form-hint-text', function (req, res) {
   res.render('form-elements/form-hint-text')
})
```

2. Go to views and create a new template in the following format: `views/form-elements/form-hint-text.html`

3. Copy and paste the following boilerplate code in the template file:

```jinja
{% extends "test-layout.html" %}

{% block testcase %}
{% endblock %}
```

4. Place the example between the `block testcase` and `endblock` lines.
