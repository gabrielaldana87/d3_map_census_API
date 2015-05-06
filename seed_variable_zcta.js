var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("mapping.db");
var fs = require('fs');

fs.readFile("./public/zip_var/DP02_0067PE.json",function(e,data)
{
  var parsed = JSON.parse(data);


  parsed.forEach(function(o)
  {
    var obj_num =
    {
    id:    o.id,
    rate:  o.rate
    }

      db.run("INSERT INTO DP02_0067PE (id,rate) VALUES (?,?)",
      parseInt(o.id),
      o.rate,
      function(err)
      {
        if(err){
          throw err;
        }
      }
    );
  })


});
