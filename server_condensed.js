var express = require('express');
var request = require('request');
var fs = require('fs');
var bodyParser = require('body-parser');
var sqlite3 = require("sqlite3").verbose();
var cors = require('cors');

var db = new sqlite3.Database("mapping.db");

var app = express();
app.use(cors());
//
// var max_min = [];

app.use(express.static(__dirname + '/public'));

fs.readFile("./key.txt",function(e,data)
{
  var key = data.toString();

app.get('/',function(req,res)
{
  res.sendFile(__dirname + '/public/us_map_indicators.html');
});

app.get('/variables', function(req,res)
{
db.all("SELECT * FROM variables", function(err, rows)
  {
  if(err) {throw err;}
  res.json(rows);
  });
});

app.get('/:indicator',function(req, res)
  {
  if(req.params.indicator!=='favicon.ico')
    {
          db.all("SELECT county_c_id, county_min, county_max  FROM county_min_max WHERE county_c_id=(?)",
          req.params.indicator,
          function(err, row)
            {
            if(err) {throw err;}
            res.json(row);
            });
          // }
      // });

    // request(url2, function(error, response, body)
    // {
    //   if(!error && response.statusCode === 200)
    //     {
    //       var data = JSON.parse(body);
    //
    //       data.forEach(function(zip)
    //       {
    //         var datum =
    //         {
    //           id: zip[1],
    //           rate: parseFloat(zip[0])
    //         }
    //         array2.push(datum);
    //       });
    //
    //       fs.writeFile("./public/zip_rate.json",JSON.stringify(array2),function(e)
    //       {
    //         console.log("Zip Code Rate done!");
    //       })
    //
    //       var lowest = Number.POSITIVE_INFINITY;
    //       var highest = Number.NEGATIVE_INFINITY;
    //       var tmp;
    //
    //       for(var i=array.length-1;i>=1;i--)
    //         {
    //           tmp = array2[i].rate;
    //           if(tmp < lowest) lowest=tmp;
    //           if(tmp > highest) highest =tmp;
    //         }
    //         console.log("highest: "+highest,"lowest: "+lowest);
    //       }
    //   });

      // fs.readFile("./public/variables.json",function(e,data)
      // {
      //   var read = JSON.parse(data);
      //
      // request(url3, function(error, response, body)
      // {
      //   if(!error && response.statusCode === 200)
      //     {
      //       var data = JSON.parse(body);
      //       console.log(data.name);
      //       var obj =
      //       {
      //         id: data.name,
      //         concept: data.concept,
      //         label: data.label
      //       }
      //       read.push(obj);
      //
      //       fs.writeFile("./public/variables.json", JSON.stringify(read),function(e)
      //       {
      //         console.log("Variable added!");
      //       })
      //
      //       }
      //   });
      // });

    };
})


});
var server = app.listen(3000,function()
{
  console.log("listening on port 3000")
});
