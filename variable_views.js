$(document).ready(function()
{
  var VariablesView = Backbone.View.extend({
    el: '#variablesList',
    initialize: function()
    {
      this.listenTo(this.collection,'sync remove', this.render);
    },
    render: function()
    {
      var el = this.$el;
      el.html('');
      this.collection.each(function(variable)
      {
        el.append(new VariableView({model: variable}).render().el);
      });
      return this;
    }
  });

  var VariableView = Backbone.View.extend({
    tagName: 'li',
    template: _.template($("#variableTemplate").html()),


    // events: {'click'
    //
    //         }
    render: function()
    {
      this.$el.html(this.template({variable: this.model.toJSON()}));
      return this;
    }
  });
  var variablesView = new VariablesView({collection: variables});
});
