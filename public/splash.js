var bivar = document.querySelector("#bivar_button");

bivar.addEventListener("click",function()
{
    var h1 = d3.select("h1")
    .text("Bivariate Analysis")

    var each_div  = d3.selectAll(".thumbnail");


    var xhr2 = new XMLHttpRequest();
    xhr2.open("GET","/choropleths/variables");
    xhr2.addEventListener("load",function(e)
    {
      var d = xhr2.responseText;
      var parsed = JSON.parse(d);

      var indicators_bivar = ["DP03_0009PE","DP03_0098PE","DP04_0088E"]

      // var filtered = _.where(parsed, function(o){return o.c_id==="DP03_0009PE"});
      // console.log(filtered);

      for(i=0;i<each_div[0].length;i++)
      {
        var filtered = _.filter(parsed, function(o){return o.c_id===indicators_bivar[i]});

        each_div[0][i].childNodes[3].innerText=filtered[0].short+"\n"+filtered[0].indicator1+":\n"+filtered[0].indicator3;
        each_div[0][i].childNodes[1].outerHTML="<img src='./"+indicators_bivar[i]+".png' class='img-responsive' alt='Responsive image'>";

        var img = each_div[0][i].childNodes[1];

        img.setAttribute("id",indicators_bivar[i]);
      };

      var image = d3.selectAll('img');


      image
      .on("click",function()
      {

        d3.selectAll(".thumbnail")
        .style("display","none");

        d3.select('#rightdiv')
        .style("margin-left","2%");

        var xhr = new XMLHttpRequest();

        var metric_this = this;
        // xhr.open("GET","/bivariate/DP03_0062E/DP03_0009PE");
        xhr.open("GET","/bivariate/DP03_0062E/"+this.id);

        xhr.addEventListener("load",function(e)
          {
            var d = xhr.responseText;
            window.parsed = JSON.parse(d);

            var leftdiv = document.createElement("div");
            leftdiv.id="leftdiv";
            container.appendChild(leftdiv);

            var rightdiv = document.createElement("div");
            rightdiv.id="rightdiv";
            container.appendChild(rightdiv);

            var ul = d3.select('#rightdiv').append('ul');

            var margin = {top: 50, right: 100, bottom: 30, left: 68},
                width = 1160 - margin.left - margin.right,

                height = 550 - margin.top - margin.bottom;

            var x = d3.scale.linear()
                .range([0, width]);

            var y = d3.scale.linear()
                .range([height, 0]);

            var color = d3.scale.category10();

            var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom");

            var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left");

            var zoom = d3.behavior.zoom()
            .x(x)
            .y(y)
            .scaleExtent([1, 32])

            var svg = d3.select("#leftdiv").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                .call(zoom);

            var cntyselect_div = d3.select('body').append('div').attr('class','county_comp');
            var region_div = d3.select('body').append('div').attr('class','region_div');
            var cntyselect_text = d3.select('.county_comp').append('h2').attr('class','cntyselect_text')
            .style('font-size','11px')
            .style('font-weight','normal')
            .style('color','black');

            queue()
            .defer(d3.json, "./us_counties_fips.json")
            .defer(d3.json, "./bivariate.json") //Housing Value
            .defer(d3.json, "./states_regions.json")
            .await(ready);

            function ready(error,map,data,region,variables)
            {
              data.forEach(function(d)
              {
                d.rate = +d.rate;
              });

              console.log(data)

              var colors = ['white','#663398','#F6AB36','#26A65B','#2474A9','#F72459'];

              var reg_div = _.uniq(_.map(region,function(o){return o.region}));

              x.domain(d3.extent(data, function(d) { return d.rate_one; })).nice();
              y.domain(d3.extent(data, function(d) { return d.rate_two; })).nice();

              var xhr2 = new XMLHttpRequest();
              xhr2.open("GET","/choropleths/variables");

              xhr2.addEventListener("load",function(e)
                {
                  var d = xhr2.responseText;
                  var parsed = JSON.parse(d);

                  var filtered = _.filter(parsed,function(o){return o.c_id==="DP03_0062E"});
                  var filtered2 = _.filter(parsed,function(o){return o.c_id===metric_this.id});

              svg.append("g")
                  .attr("class", "x axis")
                  .attr("transform", "translate(0," + height + ")")
                  .call(xAxis)
                .append("text")
                  .attr("class", "label")
                  .attr("x", width)
                  .attr("y", -6)
                  .style("text-anchor", "end")
                  .text(filtered[0].indicator1+" : "+filtered[0].indicator2)
                  .attr("font-size","12px")

              svg.append("g")
                  .attr("class", "y axis")
                  .call(yAxis)
                .append("text")
                  .attr("class", "label")
                  .attr("transform", "rotate(-90)")
                  .attr("y", 6)
                  .attr("dy", ".71em")
                  .style("text-anchor", "end")
                  .text(filtered2[0].indicator1+" : "+filtered2[0].indicator2)
                  .style("font-size","12px")

              svg.selectAll(".dot")
                  .data(data)
                .enter().append("circle")
                  .attr("class", "dot")
                  .attr("r", 2.5)
                  .attr("cx", function(d) { return x(d.rate_one); })
                  .attr("cy", function(d) { return y(d.rate_two); })
                  .attr("class", function(d)
                  {
                    for(i=0;i<region.length;i++)
                    {
                      if(d.id.substring(0,2)===region[i].id)
                      {return "dot "+region[i].region+" not_selected "+region[i].state.replace(" ","_")};
                    }
                  })
                  .attr("id",function(d){return "fid"+d.id;})
                  .style("opacity", 0.9)
                  .on('mouseover',function(d)
                  {
                    var filter = _.filter(map.objects.counties.geometries, function(o){return o.id===d.id});

                    var state = _.filter(region,function(o){if(d.id.substring(0,2)===o.id) return o.state});

                    cntyselect_text.html("<strong>"+filter[0].properties.name+"</strong><br></br><strong>"+state[0].state+"</strong><br></br> "+filtered[0].indicator3+" : <strong>"+d.rate_one+"</strong><br></br>"+filtered2[0].indicator3+" : <strong>"+d.rate_two+"</strong>")
                                   .style('padding','5px 5px 5px 5px')
                                   .attr("class","first_dataset");

                    var filtercolor = _.filter(region,function(o){if(d.id.substring(0,2)===o.id) return o.color});

                    var strong = d3.selectAll("strong")
                    .style('color',filtercolor[0].color)
                    .style('font-size','12px')

                                  svg
                                      .append('line')
                                      .attr('class','crosshair')
                                      .attr('x1',0)
                                      .attr('x2',width)
                                      .attr('y1',y(d.rate_two))
                                      .attr('y2',y(d.rate_two))
                                      .attr('stroke-width',2.5)
                                      .attr('stroke','black')
                                      .attr('opacity',.2);
                                  svg
                                      .append('line')
                                      .attr('class','crosshair')
                                      .attr('x1',x(d.rate_one))
                                      .attr('x2',x(d.rate_one))
                                      .attr('y1',0)
                                      .attr('y2',height)
                                      .attr('stroke-width',2.5)
                                      .attr('stroke','black')
                                      .attr('opacity',.2);
                  })
                  .on('mouseout',function(d)
                  {
                    d3.selectAll('.crosshair')
                    .style('display','none')
                  });

              var legend = svg.selectAll(".legend")
                  .data(color.domain())
                .enter().append("g")
                  .attr("class", "legend")
                  .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

              legend.append("rect")
                  .attr("x", width - 18)
                  .attr("width", 18)
                  .attr("height", 18)
                  .style("fill", color);

              legend.append("text")
                  .attr("x", width - 24)
                  .attr("y", 9)
                  .attr("dy", ".35em")
                  .style("text-anchor", "end")
                  .text(function(d) { return d; })
                  .style("font-size","12px");

                      ul.selectAll('.eliu')
                      .data(region)
                      .enter().append("li")
                      .text(function(d){
                        if(d.state==='NAME')
                        {return 'Select State'}
                        else {return d.state.toUpperCase()}})
                      .attr("class", function(d){return 'region_'+d.region+" state_"+ d.state.replace(" ","_")})
                      .on('click',function(d)
                      {
                        var state = false;
                        var state_dots = d3.selectAll("."+d.state.replace(" ","_"));

                        if(state===false)
                        {
                        for(i=0;i<state_dots[0].length;i++)
                        {state_dots[0][i].setAttribute("class",state_dots[0][i].classList[0]+" "+state_dots[0][i].classList[1]+" selected "+state_dots[0][i].classList[3])};

                        state_dots.style("opacity",1)

                        var not_selected = d3.selectAll(".not_selected")
                        .transition()
                        .duration(4000)
                        .style("opacity",0)
                        .style('fill','grey')

                        for(i=0;i<not_selected[0].length;i++)
                        {not_selected[0][i].classList[4]="mouseover"}

                        var mouseover = d3.selectAll('.mouseover')
                        .transition()
                        .duration(3000)
                        .attr('r',0)

                        state = true;
                        };
                      })
                      .on('mouseover',function(d)
                      {
                        var state_dots = d3.selectAll("."+d.state.replace(" ","_"));

                        for(i=0;i<state_dots[0].length;i++)
                        {state_dots[0][i].setAttribute("class",state_dots[0][i].classList[0]+" "+state_dots[0][i].classList[1]+" selected "+state_dots[0][i].classList[3])};

                        state_dots
                        .style("opacity",1)

                        var not_selected = d3.selectAll(".not_selected")




                        for(i=0;i<not_selected[0].length;i++)
                        {not_selected[0][i].setAttribute("class",not_selected[0][i].classList[0]+" "+not_selected[0][i].classList[1]+" "+not_selected[0][i].classList[2]+" "+not_selected[0][i].classList[3]+" mouseover")};

                        not_selected
                        .style("opacity",.2)

                        var mouseover = d3.selectAll('.mouseover')
                        .transition()
                        .duration(3000)
                        .attr('r',3.5)

                      })
                      .on('mouseout',function(d)
                      {
                        var selected = d3.selectAll(".selected");

                        for(i=0;i<selected[0].length;i++)
                        {selected[0][i].setAttribute("class",selected[0][i].classList[0]+" "+selected[0][i].classList[1]+" not_selected "+selected[0][i].classList[3])};

                        var dots = d3.selectAll(".not_selected")

                        for(i=0;i<dots[0].length;i++)
                        {
                          dots[0][i].setAttribute("class",dots[0][i].classList[0]+" "+dots[0][i].classList[1]+" "+dots[0][i].classList[2]+" "+dots[0][i].classList[3]);
                        };

                        dots
                        .style("opacity",1)
                      })

                      .style('border-left',function(d){return '15px solid '+d.color})
                      .style('color',function(d){return d.color})

                      var color_key = d3.select('.keys')

                      var rect = svg.selectAll('rect')
                      .data(colors)
                      .enter()
                      .append('rect')
                      .attr('y','-37px')
                      .attr('x',function(d,i){return 450 + i*80 + 'px'})
                      .attr('fill',function(d){return d})
                      .attr('width','15px')
                      .attr('height','15px')

                      svg.selectAll('.text_keys')
                      .data(reg_div)
                      .enter().append('text')
                      .attr('y','-40px')
                      .attr('x',function(d,i){return 450 + i*80 + 'px'})
                      .text(function(d){return d})
                      .style("font-size","12px")
                      .attr('class',function(d){return d})
                      .on('mouseover',function(d)
                        {
                          var state_dots = d3.selectAll(".dot."+d);

                          for(i=0;i<state_dots[0].length;i++)
                          {state_dots[0][i].setAttribute("class",state_dots[0][i].classList[0]+" "+state_dots[0][i].classList[1]+" selected "+state_dots[0][i].classList[3])};

                          state_dots
                          .style("opacity",1)

                          var not_selected = d3.selectAll(".not_selected");

                          for(i=0;i<not_selected[0].length;i++)
                          {not_selected[0][i].setAttribute("class",not_selected[0][i].classList[0]+" "+not_selected[0][i].classList[1]+" "+not_selected[0][i].classList[2]+" "+not_selected[0][i].classList[3]+" mouseover")};
                          not_selected
                          .transition()
                          .ease('quad')
                          .duration(2000)
                          .style("opacity",.2)
                          .style('fill','grey')
                        })
                        .on('mouseout',function(d)
                        {
                          var selected = d3.selectAll(".selected");

                          for(i=0;i<selected[0].length;i++)
                          {selected[0][i].setAttribute("class",selected[0][i].classList[0]+" "+selected[0][i].classList[1]+" not_selected "+selected[0][i].classList[3])};

                          var dots = d3.selectAll(".not_selected")

                          for(i=0;i<dots[0].length;i++)
                          {
                            dots[0][i].setAttribute("class",dots[0][i].classList[0]+" "+dots[0][i].classList[1]+" "+dots[0][i].classList[2]+" "+dots[0][i].classList[3]);
                          };

                          dots
                          .transition()
                          .duration(2000)
                          .style('fill',d.color)
                          .style("opacity",1)

                          ;
                        });

                });

                xhr2.send();
            };

          });
        xhr.send();
      })



      var body = document.querySelector("body");
      var container = document.createElement("div");
      container.id="container";
      body.appendChild(container);

      var h3 = d3.selectAll('h3')
               .transition()
               .duration(1000)
               .style("font-size","20px")


    });
    xhr2.send();


});
