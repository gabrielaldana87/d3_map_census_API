var fs = require('fs');

fs.readFile("./public/DP02_0067PE.json", function(e1,data1)
{
  var bach_educat = JSON.parse(data1);
  var array = [];

  bach_educat.forEach(function(obj)
  {
    var single =
    {
      id: obj.id,
      rate_educat: obj.rate
    }
     array.push(single);
  });

  fs.readFile("./public/DP03_0062E.json", function(e2,data2)
  {
    var med_income = JSON.parse(data2);

    med_income.forEach(function(obj2)
    {
      array.forEach(function(arr)
      {
        if(obj2.id===arr.id)
        {
        arr.incom = obj2.rate;

        };
      });
    });
    fs.writeFile("./public/bivariate.json", JSON.stringify(array),function(e)
    {
      console.log("you are on your way to bivariate analysis!");
    });
  });

});
