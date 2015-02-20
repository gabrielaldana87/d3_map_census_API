var Variable = Backbone.Model.extend({
  defaults: {
    c_id:     "c_id",
    concept:  "concept",
    short:    "short",
    label:    "label",
    indicator1:"indicator1",
    indicator2:"indicator2",
    indicator3:"indicator3",
    indicator4:"indicator4"
  },
  initialize: function()
  {
      console.log("This variable has been created");
    this.on('change', function()
    {
      console.log("This variable has been modified");
    });
    this.on('change:c_id', function()
    {
      console.log("This variable's c_id has been modified");
    });
    this.on('invalid', function(model,error)
    {
      console.log(error);
    });
  },
});
