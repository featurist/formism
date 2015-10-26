# formism

*** WORK IN PROGRESS ***

Builds [plastiq](https://github.com/featurist/plastiq) forms for
[modelism](https://github.com/featurist/modelism) schemas.

```JavaScript
var plastiq = require('plastiq');
var model = require('modelism');
var form = require('formism');

var Cat = model({
  name: 'Cat',
  properties: {
    name: { type: 'string', presence: true },
    breed: {},
    email: { type: 'email' },
    age: { type: 'integer' },
    notes: { type: 'text' }
  }
});

var garfield = new Cat({ name: 'Garfield', email: 'garfield@cats.com' });

function render(model) {
  return form.forModel(model);
}

plastiq.append(div, render, garfield);

```

...generates this HTML:

```html
<form>
  <div class="property">
    <label for="nameField">name</label>
    <input type="text" id="nameField" />
  </div>
  <div class="property">
    <label for="breedField">breed</label>
    <input type="text" id="breedField" />
  </div>
  <div class="property">
    <label for="emailField">email</label>
    <input type="email" id="emailField" />
  </div>
  <div class="property">
    <label for="ageField">age</label>
    <input type="number" id="ageField" />
  </div>
  <div class="property">
    <label for="notesField">notes</label>
    <textarea id="notesField" />
  </div>
</form>
```
