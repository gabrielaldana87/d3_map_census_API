var choropleth = document.querySelector("#choropleth_button");


choropleth.addEventListener("click",function()
{
    var h1 = d3.select("h1")
    .text("US Census Choropleths")

    var each_div  = d3.selectAll(".thumbnail");
    console.log(each_div);

    // var xhr2 = new XMLHttpRequest();
    // xhr2.open("GET","/choropleths/variables");
    // xhr2.send();

    d3.selectAll(".thumbnail")
    .style("display","none");

    var body = document.querySelector("body");
    var div = document.createElement("div");
    body.appendChild(div);
    div.id="container";
    var div2 = document.createElement("div");
    div.appendChild(div2);
    div2.id="leftdiv";
    var div3 = document.createElement("div");
    div.appendChild(div3);
    div3.id="rightdiv_choro";

    var nav = document.createElement("ul");
    div3.appendChild(nav);
    nav.setAttribute("class", "rightnav");



    var xhr1 = new XMLHttpRequest();
    xhr1.open("GET","/choropleths/variables");

    xhr1.addEventListener("load",function(e)
      {
      // var array = [];
      var d = xhr1.responseText;
      window.parsed = JSON.parse(d);
      var arr_short = _.uniq(_.map(parsed, function(o){return o.short}));
      arr_short.forEach(function(category)
        {
        var li = document.createElement("li");
        nav.appendChild(li);
        var a = document.createElement("a");
        li.appendChild(a);
        a.setAttribute("class",'first_select_a');
        a.innerText = category;
        li.setAttribute("class","first_select");
        var click_nav = document.createElement("div");
        click_nav.setAttribute("class","click-nav"+" "+category+" "+"not_selected");
        div3.appendChild(click_nav);
        var ul2 = document.createElement("ul");
        ul2.setAttribute("class", "no-js");
        click_nav.appendChild(ul2);
        var list = _.filter(parsed, function(o){return o.short===category;});
        var indicator1 = _.uniq(_.map(list, function(o){return o.indicator1;}));

        indicator1.forEach(function(subcat)
          {
          var li2 = document.createElement("li");
          li2.setAttribute("class","clicker");
          li2.innerText=subcat;

          li.addEventListener("click", function()
            {
            var selector = document.querySelectorAll("."+category);
            if (selector)
              {
                selector[0].className="click-nav"+" "+category+" "+"selected";
                var not_select = document.querySelectorAll(".click-nav");
                for(i=0; i<not_select.length;i++)
                  {
                  if(not_select[i].className!==selector[0].className)
                    {
                    not_select[i].className="click-nav"+" "+not_select[i].classList[1]+" "+"not_selected";
                    };
                  };
              };
          ul2.appendChild(li2);
          var indicator4 = _.uniq(_.map(list, function(o){return o.indicator4;}));
          var indicator4 = _.uniq(_.map(list, function(o){return o.indicator4;}));
          var ul3 = document.createElement("ul");
          ul3.setAttribute("class", "no-js"+" indicator2 "+subcat.substring(0,6)+" "+"not_selected2");
          var drilldown =  _.where(parsed, {short:category, indicator1:subcat});
          var filtered = _.uniq(_.map(drilldown, function(o){return o.indicator2;}));
          li2.appendChild(ul3);

          filtered.forEach(function(detail)
            {
              var li3 = document.createElement("li");
              li3.setAttribute("class","no-js");
              var subdrill = _.where(parsed,{short: category, indicator1: subcat, indicator2: detail});
              li3.innerText=detail;
              var ul = document.createElement("ul");
              li3.appendChild(ul);


              subdrill.forEach(function(sub_detail)
                {
                  var li_4 = document.createElement("li");
                  li_4.setAttribute("class","li_indic4 "+sub_detail.c_id+" not_select_li_4");
                  li2.addEventListener("click", function()
                    {
                      ul3.appendChild(li3);
                      var select_indic_2 = document.querySelector("."+subcat.substring(0,6));
                      if(select_indic_2)
                        {
                          ul3.setAttribute("class","no-js"+" indicator2 "+subcat.substring(0,6)+" "+"selected");
                          var not_select_indic_2 = document.querySelectorAll(".indicator2");
                          for(i=0;i<not_select_indic_2.length;i++)
                            {
                              if(not_select_indic_2[i].className!==ul3.className)
                                {
                                  not_select_indic_2[i].className="no-js"+" indicator2 "+not_select_indic_2[i].classList[2]+" "+"not_selected2"
                                };
                            };
                        };
                      ul.appendChild(li_4);
                      li_4.innerText = sub_detail.indicator3;

                      li_4.onclick = function()
                      {
                              var select_li_4 = document.querySelector("."+sub_detail.c_id);
                              if(select_li_4)
                              {
                                li_4.setAttribute("class","li_indic4 "+sub_detail.c_id+" selected4");
                                var not_select_li_4 = document.querySelectorAll(".li_indic4");
                                createPage(sub_detail);

                                for(i=0;i<not_select_li_4.length;i++)
                                {
                                  if(not_select_li_4[i].className!==li_4.className)
                                  {
                                    not_select_li_4[i].className="li_indic4 "+not_select_li_4[i].classList[1]+" not_select_li_4";
                                  };
                                };
                              };
                      };
                  });
                  li3.setAttribute("class","li_indic3");
                });
            });

            d3.selectAll('text').attr('class','first_dataset');

            d3.selectAll('circle').attr('class','first_dataset');
            d3.selectAll(".first_dataset")
            .style('display','none');

            var second_box = new Rectangle('second',8,32,220,250,navs1,13,10,'steelblue');
            second_box.createRight();
            second_box.createLeft();
            second_box.createTop();
            second_box.createBottom();
            second_box.createBranchHorizLeft();
            second_box.createText();

            var second_branch = new Rectangle('secondbranch',21,8,10,80,navs1,0,0,'steelblue');
            second_branch.createRight();
            second_branch.createTop();

            });
          });

        });

      });

    xhr1.send();

    var width=960;
    var height =650;

    var svg = d3.select("#rightdiv_choro").append("svg")
    .attr("width",width)
    .attr("height",height);

  var string1 = 'To begin exploring, please click on any ^ of the variable groupings listed in the ^ blue buttons in the top right corner.';
  var navs1   = 'Once you have selected the category; click on ^ any of the listed indicators on the left-hand ^ side to view a map based on these indicators.';
  var intro1  = 'Welcome to my choropleth webpage!';
  var intro2  = 'This webpage connects with the US Census API so you ^ can explore Census indicators through interactive maps.';
  var choro_def = 'noun ^ A thematic map in which areas are shaded or ^ patterned in proportion to the measurement of ^ the statistical variable being displayed on the map ^such as population density or per-capita income.'
  var choro_text = 'chor·o·pleth ^ /ˈkɔːrəˌplɛθ/';

  var help_box = new Rectangle('first',8,28,270,250,string1,28,28,'steelblue');
  help_box.createRight();
  help_box.createLeft();
  help_box.createTop();
  help_box.createBottom();
  help_box.createText();
  help_box.createBranchHorizRight();
  help_box.createBranchVertRight();

  var intro_page = new Rectangle('intro_page',0,0,170,100,intro2,0,0,'grey');
  intro_page.createText();

  var intro_splash = new Rectangle('intro_splash',0,0,240,80,intro1,0,0,'grey');
  intro_splash.createText();

  var choro_box = new Rectangle('choro_box',10,29,0,430,choro_def,0,0,'grey');
  choro_box.createText();

  var chor_big = new Rectangle('chor_big',0,0,0,390,choro_text,0,0,'black');
  chor_big.createText();

  d3.select('.chor_big_text').style('font-family','serif').style('font-size','18px');

  d3.selectAll('.intro_page_text').style('font-size','20px');
  d3.selectAll('.intro_splash_text').style('font-size','20px');
  d3.selectAll('.choro_box_text').style('font-size','12.5px');


    var createPage = function(param)
      {

        d3.selectAll('circle').attr('class','first_dataset');
        d3.selectAll(".second_text").attr('class','first_dataset');
        d3.selectAll(".first_dataset")
        .style('display','none');

      var xhr = new XMLHttpRequest();
      xhr.open("GET","/choropleths/"+param.c_id);
      xhr.send();
      xhr.addEventListener("load",function(e)
        {
        var d = xhr.responseText;
        var min_max = JSON.parse(d);
        var domain = _.find(min_max, function(o){return o.county_c_id===param.c_id;});
        var rateById = d3.map();

        var quantize = d3.scale.quantize()
        .domain([domain.county_min,domain.county_max])
        .range(d3.range(10).map(function(i){return "q"+i+"-9"}));

        var projection = d3.geo.albersUsa()
        .scale(1280)
        .translate([width / 2, height / 2]);

        function zoomed() {
          var g = d3.selectAll('g');
          g.style("stroke-width", 1.5 / d3.event.scale + "px");
          g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
          d3.selectAll('.place-level').attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
        }

        var zoom = d3.behavior.zoom()
            .translate([0, 0])
            .scale(1)
            .scaleExtent([1, 8])
            .on("zoom", zoomed);

        var path = d3.geo.path()
        .projection(projection);

        var tooltip = d3.select('#rightdiv_choro').append('div')
        .style('position', 'absolute')
        .style('padding', '0 10px')
        .style('background', "rgba(0,153,76,.8)")
        .style('font-size',"11px")
        .style('font-family',"Calibri")
        .style('color','white')
        .style('width','100px')
        .style('text-align','center')
        .attr('class', 'selected_tooltip tooltip_divs')

        var headerdiv = d3.select('#rightdiv_choro').append('div').attr('class','headerdiv');
        var header1 = d3.select('.headerdiv').append('h1').attr('class','title_header');
        var header2 = d3.select('.headerdiv').append('h2').attr('class','title_header').style('font-size','16px');
        var header3 = d3.select('.headerdiv').append('h3').attr('class','title_header').style('font-size','12px');
        var header4 = d3.select('.headerdiv').append('h4').attr('class','title_header');
        var header5 = d3.select('.headerdiv').append('h5').attr('class','title_header');

        var cntyselect_div = d3.select('#rightdiv_choro').append('div').attr('class','county_comp');
        var cntyselect_text = d3.select('.county_comp').append('h2').attr('class','cntyselect_text').
        style('font-size','11px')
        .style('font-weight','normal')
        .style('color','black');

        var keys = d3.select('#leftdiv').append('div').attr('class','keys')

        var higher = d3.select('rightdiv').append('div').attr('class','')

        var colors = ["#004F44","#009B7C","#3CBB90","#B9DEBD","#f4f2cb","#FBAF4D","#FF8E88","#FF473D","#FF180E","#BF0A00"];

        var value = d3.scale.ordinal()
        .domain(colors)
        .rangeBands([domain.county_min,domain.county_max])


        var legend = d3.select('#legend')
                    .append('ul')
                    .attr('class','list-inline');

            svg
                  .call(zoom) // delete this line to disable free zooming
                  .call(zoom.event);

        queue()
        .defer(d3.json,"./states.json")
        .defer(d3.json,param.c_id+".json")
        .await(ready);

        function ready(err,usa,json)
          {
            console.log(usa);
          json.forEach(function(obj)
            {
            rateById.set(obj.id,+obj.rate);
            });

          svg.append("g")
          .selectAll('path')
          .attr("class","counties")
          .data(topojson.feature(usa,usa.objects.counties).features)
          .enter().append('path')
          .attr("class",function(d){return quantize(rateById.get(d.id))})
          .attr("d",path)
          .style("stroke-width", ".5px")


          .on('click', function(d)
            {
            cntyselect_text.html('<strong>'+d.properties.name+" : "+rateById.get(d.id)+'</strong>'+'<br> Counties with rates <strong class="higher" color="red">HIGHER</strong> than '+d.properties.name+' County:')
            .style('padding','5px 5px 5px 5px')
            .attr("class","first_dataset")
            .on('click',function(d)
            {
              if(l_switch===false)
              {
                d3.selectAll('path')
                .attr("class",function(d){ if(rateById.get(d.id) <= compare){return quantize(rateById.get(d.id))}});
                d3.select('strong.higher')[0][0].innerText="LOWER";
                d3.select('strong.higher').style("color","#009B7C")
                l_switch = true;
              }
              else
              {
                d3.selectAll('path')
                .attr("class", function(d){ if (rateById.get(d.id) >= compare){ return quantize(rateById.get(d.id))}});
                d3.select('strong.higher')[0][0].innerText="HIGHER";
                d3.select('strong.higher').style("color","red")

                l_switch = false;
              }
            });
            d3.select('strong.higher').style("color","red");
            var compare = rateById.get(d.id);
            var l_switch = false;
            var paths = d3.select('path')
            var pathclick = d3.selectAll('path');
            pathclick.attr("class",function(d){ if (rateById.get(d.id) >= compare){ return quantize(rateById.get(d.id))}});
            })
          .on('mouseover', function(d)
            {
            tooltip.html(d.properties.name+" : "+rateById.get(d.id))
            .style('left', (d3.event.pageX - 35) + 'px')
            .style('top',  (d3.event.pageY - 30) + 'px')
            tempColor = this.style.fill;
            d3.select(this)
            .style('opacity', .5);
            })
          .on('mouseout', function(d)
            {
            d3.select(this)
            .style('opacity',1)
            .style('fill',tempColor);
            d3.selectAll(".tooltip_divs")
            .attr("class", "selected3 first_dataset");
            })
            .attr("id","tooltip");

            header2.html(param.indicator1);
            header3.html(param.indicator2);
            header4.html(param.indicator3);

            d3.selectAll('.title_header')
            .attr("class", 'first_dataset');

          svg.selectAll(".place-label")
          .data(topojson.feature(usa,usa.objects.places_usa).features)
          .enter().append("text")
          .attr("class","place-level")
          .attr("transform", function(d){ return "translate(" + projection(d.geometry.coordinates) + ")"})
          .attr("x", function(d){ return d.geometry.coordinates[0] > -1? 6: -6;})
          .attr("dy",".35em")
          .style("text-anchor", function(d){ return d.geometry.coordinates[0] > -1? "start": "end";})
          .text(function(d) { return d.properties.name;})
          .attr("class", function(d){ return d.properties.name.replace(/\s/g,"_")+" place-level"})


          var color_key = d3.select(".keys")

          var rect = svg.selectAll('rect')
          .data(colors)
          .enter()
          .append('rect')
          .attr('y',function(d,i){return 400 + i*15 + "px"})
          .attr('x','875px')
          .attr('fill', function(d){return d})
          .attr('width','15px')
          .attr('height','15px')

          svg.selectAll(".text_keys")
          .data(colors)
          .enter().append('text')
          .attr('y',function(d,i){return 407 + (i*15) +'px'})
          .attr('x','890px')
          .text(function(d){ return parseFloat(value(d)).toFixed(1); })
          .attr('class', 'first_dataset')

          d3.selectAll(".New_York")
          .on('click', function(evt)
          {
            var metropolitan_div = d3.select('#rightdiv_choro').append('div').attr('class','metropolitan_div')
            .style("background-color","#F0F4F4")
            .style("position", "absolute")
            .style("right","20px")
            .style("bottom","0px");

            metropolitan_div.append('a')
            .attr('href','/choropleths/zip')
            .html("Click here to view this variable by zipcode")
            .style("font-family","Calibri")
            .style("color","black")
            .style("font-size", "12px")
          });

          };
          d3.select('strong.higher').attr('class','first_dataset');
          d3.selectAll(".first_dataset")
          .style('display','none');

        });

      };
});
