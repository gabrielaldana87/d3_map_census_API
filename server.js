// var express = require('express');
// var app = express();
// var request = require('request');
// var fs = require('fs');
//
// var url = "http://api.census.gov/data/2012/acs5/profile?get=DP03_0062E&for=county:*";
//
//
// app.get("/", function(req,res)
// {
//   salad=
//   {
//   name: "Basic Salad",
//   ingredients: ["lettuce","tomatoes","chicken","cheese","croutons"]
//   }
//   console.log(salad);
//   res.json(salad);
//
// })
//
// var server = app.listen(3000,function()
// {
//   console.log("listening on port 3000")
// });


var express = require('express');
var request = require('request');
var fs = require('fs');

var app = express();
var array=[];
app.use(express.static(__dirname + '/public'));

fs.readFile("./key.txt",function(e,data)
{
  var key = data.toString();
  var url = "http://api.census.gov/data/2012/acs5/profile?get=DP03_0062E&for=county:*"+key;

app.get('/', function(req, res)
{
  console.log(url);
  var personJSON;
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
            m_income: fips[0]
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
  res.sendFile(__dirname + './public/map.html');
})
});




var server = app.listen(3000,function()
{
  console.log("listening on port 3000")
});
