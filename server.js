var express = require('express');
var request = require('request');
var fs = require('fs');
var app = express();
var max_min = [];

app.use(express.static(__dirname + '/public'));

fs.readFile("./key.txt",function(e,data)
{
  var key = data.toString();
  // var url = "http://api.census.gov/data/2012/acs5/profile?get=DP03_0062E&for=county:*"+key;

app.get('/', function(req, res)
{
  var array=[];
  var url = "http://api.census.gov/data/2012/acs5/profile?get=DP03_0062E&for=county:*"+key;
  console.log(url);
  request(url, function(error, response, body)
  {
    if(!error && response.statusCode === 200)
    {
      var data = JSON.parse(body);

      data.forEach(function(fips)
      {
        var income =
        {
            id: fips[1]+fips[2],
            m_income: parseInt(fips[0])
        }
        array.push(income);
      });
      var county=data[1][1]+data[1][2];

      fs.writeFile("data.json",JSON.stringify(array),function(e)
      {
        console.log("done!");
      })

      var lowest = Number.POSITIVE_INFINITY;
      var highest = Number.NEGATIVE_INFINITY;
      var tmp;

      for(var i=array.length-1;i>=1;i--)
        {
          tmp = array[i].m_income;
          if(tmp < lowest) lowest=tmp;
          if(tmp > highest) highest =tmp;
        }
        console.log("highest: "+highest,"lowest: "+lowest);
    }
  });
  res.sendFile(__dirname + '/public/map.html');
});

app.get('/:indicator',function(req, res)
{
  if(req.params.indicator!=='favicon.ico')
  {
  var array=[];
  var url = "http://api.census.gov/data/2012/acs5/profile?get="+req.params.indicator+"&for=county:*"+key;
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
          }
          array.push(obj);
        });
        var county=data[1][1]+data[1][2];

        fs.writeFile("./public/"+req.params.indicator+".json",JSON.stringify(array),function(e)
        {
          console.log("done!");
        })

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
            min: lowest,
            max: highest
          }
          max_min.push(obj_num);
          console.log("highest: "+highest,"lowest: "+lowest);
        }
    });
      res.sendFile(__dirname + '/public/us_map_indicators.html');
    };
})

});

app.get('/nums', function(req, res)
{
  res.json(max_min);
})

var server = app.listen(3000,function()
{
  console.log("listening on port 3000")
});
