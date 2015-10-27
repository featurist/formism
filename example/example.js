var model = require('modelism');
var plastiq = require('plastiq');
var h = plastiq.html;
var form = require('..')

var Tour = model({
  name: 'Tour',
  properties: {
    title: { type: 'string', presence: true },
    notes: { type: 'text', presence: true },
    durationInDays: { type: 'integer' }
  }
});

var europeBusTour = new Tour({
  title: 'Europe Bus Tour',
  body: 'A fun trip around europe.',
  durationInDays: 11
});

function render(model) {
  return h('.example',
    form.forModel(model),
    h('pre', JSON.stringify(model.serialize(), false, '  '))
  );
}

plastiq.append(document.body, render, europeBusTour);
