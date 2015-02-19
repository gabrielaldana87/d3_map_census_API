var express = require('express');
var request = require('request');
var fs = require('fs');
var bodyParser = require('body-parser');
var sqlite3 = require("sqlite3").verbose();
var cors = require('cors');

var db = new sqlite3.Database("mapping.db");

var app = express();
app.use(cors());

var max_min = [];

app.use(express.static(__dirname + '/public'));

fs.readFile("./key.txt",function(e,data)
{
  var key = data.toString();

app.get('/',function(req,res)
{
  res.sendFile(__dirname + '/public/us_map_indicators.html');
});

app.get('/nums', function(req, res)
{
  res.json(max_min);
});

// app.get('/variables', function(req,res)
// {
//   fs.readFile("./public/variables.json",function(e,data)
//   {
//     // var variables = data.toString();
//     var variables = JSON.parse(data);
//     res.json(variables);
//   });
// });

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
    var array=[];
    var array2 =[];
    var url  = "http://api.census.gov/data/2012/acs5/profile?get="+req.params.indicator+"&for=county:*"+key;
    var url2 = "http://api.census.gov/data/2013/acs5/profile?get="+req.params.indicator+"&for=zip+code+tabulation+area:*"+key;
    var url3 = "http://api.census.gov/data/2013/acs5/profile/variables/"+req.params.indicator+".json"
    console.log(url);

    request(url, function(error, response, body)
      {
      if(!error && response.statusCode === 200)
        {
        var data = JSON.parse(body);
        data.forEach(function(fips)
          {
          var obj =
            {
            id: fips[1]+fips[2],
            rate: parseFloat(fips[0])
            };
          array.push(obj);
          });
          var county=data[1][1]+data[1][2];

          fs.writeFile("./public/"+req.params.indicator+".json",JSON.stringify(array),function(e)
            {
            console.log("done!");
            });

          var lowest = Number.POSITIVE_INFINITY;
          var highest = Number.NEGATIVE_INFINITY;
          var tmp;

          for(var i=array.length-1;i>=1;i--)
            {
            tmp = array[i].rate;
            if(tmp < lowest) lowest=tmp;
            if(tmp > highest) highest =tmp;
            }

          var obj_num =
            {
            variable: req.params.indicator,
            min: lowest,
            max: highest
            }
            max_min.push(obj_num);
            console.log("highest: "+highest,"lowest: "+lowest);
          }
        console.log(max_min);
        res.json(max_min);
      });

    request(url2, function(error, response, body)
    {
      if(!error && response.statusCode === 200)
        {
          var data = JSON.parse(body);

          data.forEach(function(zip)
          {
            var datum =
            {
              id: zip[1],
              rate: parseFloat(zip[0])
            }
            array2.push(datum);
          });

          fs.writeFile("./public/zip_rate.json",JSON.stringify(array2),function(e)
          {
            console.log("Zip Code Rate done!");
          })

          var lowest = Number.POSITIVE_INFINITY;
          var highest = Number.NEGATIVE_INFINITY;
          var tmp;

          for(var i=array.length-1;i>=1;i--)
            {
              tmp = array2[i].rate;
              if(tmp < lowest) lowest=tmp;
              if(tmp > highest) highest =tmp;
            }
            console.log("highest: "+highest,"lowest: "+lowest);
          }
      });

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
