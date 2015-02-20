var VariablesCollection = Backbone.Collection.extend({
  model: Variable,
  url: 'http://localhost:3000/variables'
});

var variables = new VariablesCollection();
variables.fetch();
console.log(variables);
