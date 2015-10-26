var model = require('modelism');
var plastiq = require('plastiq');
var expect = require('chai').expect;
var form = require('..');
var createTestDiv = require('./createTestDiv');
var browser = require('browser-monkey');

describe('form.forModel()', function() {

  var div, scope;

  beforeEach(function () {
    div = createTestDiv();
    scope = browser.find('.test');
  });

  describe('with a model argument', function() {

    beforeEach(function () {

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
      var garfield = new Cat({
        name: 'Garfield',
        email: 'garfield@cats.com',
        notes: 'Lazy, obsessive eater'
      });

      function render(model) {
        return form.forModel(model);
      }

      plastiq.append(div, render, garfield);
    });

    it('makes a form', function() {
      return scope.find('form').shouldExist();
    });

    it('makes a div for each property', function() {
      return scope.find('form .property').shouldHave({ length: 5 });
    });

    it('makes a label for each property', function() {
      return scope.find('form .property label').shouldHave({ length: 5 });
    });

    it('makes labels with the text of each property', function() {
      return scope.find('form .property:last label').shouldHave({ text: 'notes' });
    });

    it('makes labels with for="id" attributes', function() {
      return scope.find('form .property:last label[for=notesField]').shouldExist();
    });

    it('makes inputs with ids based on the property name', function() {
      return scope.find('form .property:last #notesField').shouldExist();
    });

    it('makes number inputs for integer properties', function() {
      return scope.find('form .property input#ageField[type=number]').shouldExist();
    });

    it('makes number inputs for integer properties', function() {
      return scope.find('form .property input#emailField[type=email]').shouldExist();
    });

    it('makes textareas for text properties', function() {
      return scope.find('form .property textarea#notesField').shouldExist();
    });

    it('sets input values', function() {
      return scope.find('form .property #emailField').shouldHave({ value: 'garfield@cats.com' });
    });

    it('sets textarea contents', function() {
      return scope.find('form .property textarea#notesField').shouldHave({ value: 'Lazy, obsessive eater' });
    });
  });

  describe('with a model argument and an array of propery names', function() {

    beforeEach(function () {

      var Man = model({
        name: 'Man',
        properties: {
          name: { presence: true },
          age: { integer: true },
          email: { email: true }
        }
      });
      var dave = new Man({ name: 'Dave', age: 21 });

      function render(model) {
        return form.forModel(model, ['name', 'age']);
      }

      plastiq.append(div, render, dave);
    });

    it('makes a form', function() {
      return scope.find('form').shouldExist();
    });

    it('makes a div for each named property', function() {
      return scope.find('form .property').shouldHave({ length: 2 });
    });

    it('makes a label for each named property', function() {
      return scope.find('form .property label').shouldHave({ length: 2 });
    });

    it('makes labels with the text of each named property', function() {
      return scope.find('form .property:last label').shouldHave({ text: 'age' });
    });

    it('makes labels with for="id" attributes', function() {
      return scope.find('form .property:last label[for=ageField]').shouldExist();
    });

    it('makes inputs with ids based on the named properties names', function() {
      return scope.find('form .property:last input#ageField').shouldExist();
    });

  });

});
