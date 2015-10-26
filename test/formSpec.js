var model = require('modelism');
var plastiq = require('plastiq');
var expect = require('chai').expect;
var form = require('..');
var createTestDiv = require('./createTestDiv');
var browser = require('browser-monkey');
var jquery = require('jquery');
require('jquery-sendkeys');
var retry = require('trytryagain');

describe('form.forModel()', function() {

  var div, scope;

  beforeEach(function () {
    div = createTestDiv();
    scope = browser.find('.test');
  });

  describe('with a model argument', function() {

    var garfield;

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
      garfield = new Cat({
        name: 'Garfield',
        email: 'garfield@cats.com',
        age: 37,
        notes: 'Lazy, obsessive eater'
      });

      function render(model) {
        return form.forModel(model);
      }

      plastiq.append(div, render, garfield, { requestRender: setTimeout });
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

    it('makes labels with text equal to each property name', function() {
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

    it('sets text input values', function() {
      return scope.find('form .property #emailField').shouldHave({ value: 'garfield@cats.com' });
    });

    it('sets number input values', function() {
      return scope.find('form .property #ageField').shouldHave({ value: '37' });
    });

    it('sets textarea contents', function() {
      return scope.find('form .property textarea#notesField').shouldHave({ value: 'Lazy, obsessive eater' });
    });

    it('updates the model when text input value changes', function() {
      jquery('#nameField').sendkeys('{selectall}{backspace}Obie');
      return retry(function() {
        expect(garfield.name).to.eql('Obie');
      });
    });

    it('updates the model when textarea value changes', function() {
      jquery('#notesField').sendkeys('{selectall}{backspace}Legend');
      return retry(function() {
        expect(garfield.notes).to.eql('Legend');
      });
    });

    it('updates the model when number input value changes', function() {
      jquery('#ageField').sendkeys('{selectall}{backspace}123');
      return retry(function() {
        expect(garfield.age).to.eql('123');
      });
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
