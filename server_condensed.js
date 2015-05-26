var express = require('express');
var request = require('request');
var fs = require('fs');
var bodyParser = require('body-parser');
var sqlite3 = require("sqlite3").verbose();
var cors = require('cors');

var db = new sqlite3.Database("mapping.db");
var db2 = new sqlite3.Database("stop_frisk.db")

var app = express();
app.use(cors());

var array = [];
var array2 = [];

app.use(express.static(__dirname + '/public'));

fs.readFile("./key.txt",function(e,data)
{
  var key = data.toString();

app.get('/visualizations',function(req,res)
{
  res.sendFile(__dirname + '/public/bivar_splash.html');
});

app.get('/about_me', function(req,res)
{
  res.sendFile(__dirname + '/public/about_me.html');
});

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
        //       };
        //       read.push(obj);
        //
        //       fs.writeFile("./public/variables.json", JSON.stringify(read),function(e)
        //       {
        //         console.log("Variable added!");
        //       });
        //     }
        // });

        // request(url, function(error, response, body)
        //   {
        //   if(!error && response.statusCode === 200)
        //     {
        //     var data = JSON.parse(body);
        //     data.forEach(function(fips)
        //       {
        //       var obj =
        //         {
        //         id: fips[1]+fips[2],
        //         rate: parseFloat(fips[0])
        //         };
        //       array.push(obj);
        //       });
        //       fs.writeFile("./public/"+req.params.indicator+".json", JSON.stringify(array),function(e)
        //       {
        //         console.log("County variable written!");
        //       });
        //     }
        //   });

        request(url2, function(error, response, body)
        {
          if(!error && response.statusCode === 200)
            {
              var data = JSON.parse(body);

              data.forEach(function(zip)
              {

                // if(zip[1].substring(0,1)==='1')
                // {
                  var datum =
                  {
                  id: zip[1],
                  rate: parseFloat(zip[0])
                  }
                  array2.push(datum);
                // };
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

app.get('/bivariate',function(req,res)
{
  res.sendFile(__dirname + '/public/bivar.html');
});

app.get('/stopandfrisk',function(req,res)
{
  res.sendFile(__dirname + '/public/stop_frisk.html');
});

app.get('/stopandfrisk/details',function(req,res)
{
  if(req.params.indicator!=='favicon.ico')
    {
          db2.all("select distinct Longitude, Latitude, race, count(*) as totals from data group by Longitude,Latitude,race order by totals desc",
          function(err, row)
            {
            if(err) {throw err;}
            res.json(row);
            });
    };
});

app.get('/stopandfrisk/details/:concept',function(req,res)
{
  if(req.params.concept!=='favicon.ico')
    {
      console.log(req.params.concept)
          db2.all("SELECT ID FROM data WHERE "+req.params.concept+" ='Y'",
          function(err, row)
            {
            if(err) {throw err;}
            res.json(row);
            });
    };
});

app.get('/bivariate/:indicator1/:indicator2',function(req,res)
{
  if(req.params.indicator!=='favicon.ico')
    {
      fs.readFile("./public/DP03_0062E.json", function(e1,data1) // test file for Median Household Income
      // fs.readFile("./public/"+req.params.indicator1+".json", function(e1,data1) // put this line back when you are done testing
      {
        var bach_educat = JSON.parse(data1);
        var array = [];

        bach_educat.forEach(function(obj)
        {
          var single =
          {
            id: obj.id,
            rate_one: obj.rate
          }
           array.push(single);
        });
        // fs.readFile("./public/DP02_0067PE.json", function(e2,data2) // test file for % Bachelors Degree or Higher
        fs.readFile("./public/"+req.params.indicator2+".json", function(e2,data2) // put this line back when you are done testing
        {
          var med_income = JSON.parse(data2);

          med_income.forEach(function(obj2)
          {
            array.forEach(function(arr)
            {
              if(obj2.id===arr.id)
              {
              arr.rate_two = obj2.rate;
              };
            });
          });
          fs.writeFile("./public/DP03_0062E&"+req.params.indicator2+".json", JSON.stringify(array),function(e)
          {
            console.log("you are on your way to bivariate analysis!");
            res.json(array);
          });
        });

      });

    };
});

app.get('/bivariate/zips/:indicator1/:indicator2',function(req,res)
{
  if(req.params.indicator!=='favicon.ico')
    {
      console.log(req.params.indicator1);
      console.log(req.params.indicator2);

      db.all("SELECT A.ZCTA5, SUM(A.ZPOPPCT) AS SUM_ZPOPPCT, SUM(A.POPPT) AS SUM_POPPCT, B.RATE as inc_rate, C.RATE as edu_rate, COUNT(*) AS ZIP_SHAPES FROM zcta_cnty_rel AS A left JOIN DP03_0062E AS B ON A.ZCTA5=B.id LEFT JOIN DP02_0067PE AS C ON A.ZCTA5=C.ID WHERE A.STATE=(?)  AND A.COUNTY=(?) AND A.POPPT >0 GROUP BY A.ZCTA5,inc_rate, edu_rate ORDER BY SUM_POPPCT DESC",
      parseInt(req.params.indicator1),
      parseInt(req.params.indicator2),
      function(err, row)
        {
        if(err) {throw err;}
        res.json(row);
        });
    };
});
});
var server = app.listen(3000,function()
{
  console.log("listening on port 80")
});
