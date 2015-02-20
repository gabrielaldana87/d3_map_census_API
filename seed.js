var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("mapping.db");
var fs = require('fs');

fs.readFile("./public/variables.json",function(e,data)
{
  var variables = JSON.parse(data);
  variables.forEach(function(object)
  {
    if(object.id.substring(0,4)==="DP02")
    {
      var short = "SOCIAL";
    }
    else if(object.id.substring(0,4)==="DP03")
    {
      var short = "ECONOMIC";
    }
    else if(object.id.substring(0,4)==="DP04")
    {
      var short = "HOUSING";
    }
    else if(object.id.substring(0,4)==="DP05")
    {
      var short = "DEMOGRAPHIC";
    }
    else
    {
      var short = "UNCLASSIFIED";
    };
    var array = object.label.split("!!");

    var data_var =
      {
        c_id :       object.id,
        concept:     object.concept,
        short:       short,
        label:       object.label,
        indicator1:  array[0],
        indicator2:  array[1],
        indicator3:  array[2],
        indicator4:  array[3],
        indicator5:  array[4]
      };

    db.run("INSERT INTO variables (c_id,concept,short,label,indicator1,indicator2,indicator3,indicator4,indicator5) VALUES (?,?,?,?,?,?,?,?,?)",
    object.id,
    object.concept,
    short,
    object.label,
    array[0],
    array[1],
    array[2],
    array[3],
    array[4],
    function(err)
    {
      if(err){
        throw err;
      }
    }
  );
  console.log(data_var);
  });
});

db.all("SELECT c_id FROM variables", function(err, rows)
{
  if(err){throw err;}

  rows.forEach(function(obj)
  {

    fs.readFile("./public/"+obj.c_id+".json",function(e,data)
    {
      var read_variable = JSON.parse(data);

      var lowest = Number.POSITIVE_INFINITY;
      var highest = Number.NEGATIVE_INFINITY;

      var tmp;

      // for(var i=read_variable.length-1;i>=1;i--)
      for(var i=1;i<read_variable.length;i++)
        {

          tmp = read_variable[i].rate;

          if(tmp === null) lowest = 0;
          if(tmp < lowest) lowest=tmp;
          if(tmp > highest) highest = tmp;
        };


        var obj_num =
        {
        county_c_id:    obj.c_id,
        county_min:     lowest,
        county_max:     highest
        }

          db.run("INSERT INTO  county_min_max (county_c_id,county_min,county_max) VALUES (?,?,?)",
          obj.c_id,
          lowest,
          highest,

          function(err)
          {
            if(err){
              throw err;
            }
          }
        );
    });
  });
})
