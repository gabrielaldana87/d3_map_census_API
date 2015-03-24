var express = require('express');
var request = require('request');
var fs = require('fs');

var app = express();
var array = [];

var region = [
              { region: 'WEST', color: 'crimson' ,states: ['06',32,49,'08',56,16,30,53,41,'02',15]},
              { region: 'SOUTHWEST', color: '#F96A0E', states: ['04',35,48,40]},
              { region: 'MIDWEST', color: '#66CC9A', states: [38,46,31,20,29,19,27,17,55,18,26,39]},
              { region: 'SOUTH', color: "#8f44ad", states: [22,'05',28,'01',13,12,45,37,47,21,51,54]},
              { region: 'NORTHEAST', color: 'steelblue',states: [23,33,50,25,'09',44,34,42,24,11,10,36]}
            ];

app.get('/', function(req,res)
{
  var url = "http://api.census.gov/data/2013/acs5/profile?get=NAME&for=state:*";
  request(url, function(error, response, body)
  {
    if(!error && response.statusCode === 200)
        {
          var data = JSON.parse(body);

          data.forEach(function(zip)
          {
            var datum =
            {
            id:     zip[1],
            state:  zip[0]
            };

            for(i=0; i<region.length; i++)
            {
              region[i].states.forEach(function(state)
              {
                if(zip[1]===state.toString())
                {
                  datum.region=region[i].region;
                  datum.color=region[i].color;
                }
              })
            };
            array.push(datum);
          });
          fs.writeFile("./public/states_regions.json", JSON.stringify(array),function(e)
          {
              console.log("State classification written!");
          });
        };
  });
});

var server = app.listen(3000,function()
{
  console.log("listening on port 3000")
});
