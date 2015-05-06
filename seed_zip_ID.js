var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("stop_frisk.db");
var fs = require('fs');


fs.readFile("./stopfrisk_ID_zipcode.json", function(e,data)
{
  var incidents = JSON.parse(data);

  incidents.forEach(function(object)
  {
    db.run("INSERT INTO zips_ID (ID, zipcode) VALUES (?,?)",
    object.ID,
    object.zipcode,
    function(err)
    {
      if(err){
        throw err;
      }
    }
    );
  })

});
