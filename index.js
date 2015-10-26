var plastiq = require('plastiq');
var h = plastiq.html;

function Form() {}

Form.prototype.forModel = function(model, properties) {
  return h('form', this.fieldsForModel(model, properties));
};

Form.prototype.fieldsForModel = function(model, properties) {
  var schema = model.schema;
  var fields = [];
  var props = schema.properties;
  if (properties) {
    props = props.filter(function(p) {
      return properties.indexOf(p.name) > -1;
    });
  }
  for (var i = 0; i < props.length; ++i) {
    fields.push(this.fieldForProperty(props[i]));
  }
  return fields;
}

Form.prototype.fieldForProperty = function(property) {
  var id = property.name + "Field";
  var inputTag = 'input';
  var inputProperties = {};
  if (property.type == 'integer') {
    inputProperties.type = 'number';
  }
  if (property.type == 'email') {
    inputProperties.type = 'email';
  }
  if (property.type == 'text') {
    inputTag = 'textarea';
  }
  return h('.property.' + property.name,
    h('label', { "for": id }, property.name),
    h(inputTag + '#' + id, inputProperties)
  );
};

module.exports = new Form();
