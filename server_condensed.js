var express = require('express');
var request = require('request');
var fs = require('fs');
var bodyParser = require('body-parser');
var sqlite3 = require("sqlite3").verbose();
var cors = require('cors');

var db = new sqlite3.Database("mapping.db");

var app = express();
app.use(cors());

var array = [];
var array2 = [];

app.use(express.static(__dirname + '/public'));

fs.readFile("./key.txt",function(e,data)
{
  var key = data.toString();

app.get('/choropleths',function(req,res)
{
  res.sendFile(__dirname + '/public/us_map_indicators.html');
});

app.get('/choropleths/variables', function(req,res)
{
db.all("SELECT * FROM variables", function(err, rows)
  {
  if(err) {throw err;}
  res.json(rows);
  });
});

app.get('/choropleths/zip', function(req,res)
{
  res.sendFile(__dirname + '/public/nyc_map.html');
});


app.get('/choropleths/CREATE/:indicator',function(req, res)
  {
  if(req.params.indicator!=='favicon.ico')
    {
    var url  = "http://api.census.gov/data/2012/acs5/profile?get="+req.params.indicator+"&for=county:*"+key;
    var url3 = "http://api.census.gov/data/2013/acs5/profile/variables/"+req.params.indicator+".json"
    var url2 = "http://api.census.gov/data/2013/acs5/profile?get="+req.params.indicator+"&for=zip+code+tabulation+area:*"+key;

    fs.readFile("./public/variables.json",function(e,data)
    {
      var read = JSON.parse(data);

      var written = function()
      {
        console.log("this variable is already written");
      };

      var request_var = function(read)
      {
        request(url3, function(error, response, body)
        {
          if(!error && response.statusCode === 200)
            {
              var data = JSON.parse(body);
              console.log(data.name);
              var obj =
              {
                id: data.name,
                concept: data.concept,
                label: data.label
              };
              read.push(obj);

              fs.writeFile("./public/variables.json", JSON.stringify(read),function(e)
              {
                console.log("Variable added!");
              });
            }
        });

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
              fs.writeFile("./public/"+req.params.indicator+".json", JSON.stringify(array),function(e)
              {
                console.log("County variable written!");
              });
            }
          });

        request(url2, function(error, response, body)
        {
          if(!error && response.statusCode === 200)
            {
              var data = JSON.parse(body);

              data.forEach(function(zip)
              {

                if(zip[1].substring(0,1)==='1')
                {
                  var datum =
                  {
                  id: zip[1],
                  rate: parseFloat(zip[0])
                  }
                  array2.push(datum);
                };
              });

              fs.writeFile("./public/zip_var/"+req.params.indicator+".json",JSON.stringify(array2),function(e)
              {
                console.log("Zip Code Rate done!");
              });

            }
          });
      };

for(i=0;i<read.length;i++){

        {if(req.params.indicator===read[i].id)
        { return written()}

        else
        {
          return request_var(read);
        };
        };
      };

    });

    };
});


app.get('/choropleths/:indicator',function(req, res)
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
    };
});


});
var server = app.listen(80,function()
{
  console.log("listening on port 80")
});
