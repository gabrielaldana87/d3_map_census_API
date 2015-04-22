var express = require('express');
var request = require('request');
var fs = require('fs');
var sqlite3 = require("sqlite3").verbose();
var inside = require('point-in-polygon');


var db = new sqlite3.Database("stop_frisk.db");


fs.readFile("./public/zips_new_york_v2.json",function(e,data)
{
var read = JSON.parse(data);
var array = [];
  db.all("SELECT ID, Latitude, Longitude from data", function(err,rows)
  {
    if(err) {throw err;}
    rows.forEach(function(o)
    {
      for(i=0;i<read.features.length;i++)
     {
         if(inside([o.Latitude,o.Longitude], read.features[i].geometry.coordinates[0])===true)
         {
           console.log(o.ID+":"+read.features[i].properties.ZCTA5CE10);
          var datum =
          {
          ID:     o.ID,
          zipcode:  read.features[i].properties.ZCTA5CE10
          };
          array.push(datum);
         }
     };
   });

   fs.writeFile("./stopfrisk_ID_zipcode.json", JSON.stringify(array),function(e)
   {
     console.log("you are on your way to aggregating zipcodes!");
   });


  });

});
