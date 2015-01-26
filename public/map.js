
var body = document.getElementById("test");
var div = document.createElement("div");
body.appendChild(div);
div.id="container";
var div2 = document.createElement("div");
div.appendChild(div2);
div2.id="leftdiv";
var div3 = document.createElement("div");
div.appendChild(div3);
div3.id="rightdiv";
var div4 = document.createElement("div");
div3.appendChild(div4);
div4.id="inputbar";
// var form = document.createElement("form")
// div4.appendChild(form);
var input = document.createElement("input");
div4.appendChild(input);
input.type="text";
input.placeholder="enter demographic";
input.id="textbox";
// input.name="demographic";

var input2 = document.createElement("input");
div4.appendChild(input2);
input2.type="submit";
input2.value="Add";
input2.id="button";

input2.addEventListener("click",function()
{
  var safeURL = input.value.replace(" ","+");
  var method_look = safeURL;

  var xhr = new XMLHttpRequest();
  // xhr.open("GET","http://localhost:3000/");
  xhr.open("GET","http://localhost:3000/"+method_look);
  xhr.addEventListener("load",function(e)
  {
    var d = xhr.responseText;
    var parsed = JSON.parse(d);
    console.log(parsed);
  })
  // xhr.open("GET", "http://api.census.gov/data/2012/acs5/profile?get="+method_look+"&for=county:*");
  // xhr.addEventListener("load", function(e)
  // {
  //   var d=xhr.responseText;
  //   var parsed=JSON.parse(d);
  //   console.log(parsed);
  //   console.log(parsed[1]);
  //   var county=parsed[1][1]+parsed[1][2];
  // })
  xhr.send();
})

var counter = 1;
window.addEventListener("keydown",function(evt)
{
  if(evt.keyCode===39)
    {
      var safeURL = input.value.replace(" ","+");
      var method_look = safeURL;
      var key = "&api_key=dc6zaTOxFJmzC";
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "https://api.spotify.com/v1/search?q=artist:"+method_look+"&type=artist");
      xhr.addEventListener("load", function(e)
       {
        var d=xhr.responseText;
        var parsed=JSON.parse(d);
        var h1= document.querySelector("h1");
        h1.innerText=parsed.artists.items[counter].name;
        var img = document.querySelector("img");
        img.src=parsed.artists.items[counter].images[0].url;
        counter++;
      })
      xhr.send();
    }
})
