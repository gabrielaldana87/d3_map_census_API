window.onload = function()

{
var svg = d3.select('body').append('svg')
  .attr('width', '100%')
  .attr('height', '75%')





queue()
.defer(d3.json,"./public/bivariate.json")
.await(projectData)



function projectData(data)
{
  var svg = d3.select('svg');

  var circles = svg.selectAll('circle')
  .data(data)
  .attr('r', "2px")
  .attr('cx', function(d,i){return d.incom/2000 + "%"})
  .attr('cy', function(d,i){return d.rate_educat + "%"})
  .style('fill', "steelblue")
  .style('opacity', '.5')

};
};
