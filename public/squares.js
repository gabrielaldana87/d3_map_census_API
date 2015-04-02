// require d3;


function Rectangle(name,num,not_square,cx,cy,line,branch_length,vert_length,color)
{
  this.name= name,
  this.num= num,
  this.not_square = not_square,
  this.cx= cx,
  this.cy= cy,
  this.createRight= function(){
    var dots_array = [];
    for(i=0;i<num;i++)
    {
      dots_array.push(i);
    };
    svg.selectAll('.'+name+'_right_side')
        .data(dots_array)
        .enter().append('circle')
        .attr('class','right_side')
        .attr('r',2.5)
        .attr("cx", cx + 100*not_square/10)
        .attr("cy", function(i){return cy + 100*i/10})
        .attr('fill',color)
  },
  this.createLeft= function(){
    var dots_array = [];
    for(i=0;i<num;i++)
    {
      dots_array.push(i);
    };
    svg.selectAll('.'+name+'_left_side')
        .data(dots_array)
        .enter().append('circle')
        .attr('class','left_side')
        .attr('r',2.5)
        .attr("cx", cx)
        .attr("cy", function(i){return cy + 100*i/10})
        .attr('fill',color)
  },
  this.createTop= function(){
    var dots_array = [];
    for(i=0;i<not_square;i++)
    {
      dots_array.push(i);
    };
    svg.selectAll('.'+name+'_top_side')
        .data(dots_array)
        .enter().append('circle')
        .attr('class','top_side')
        .attr('r',2.5)
        .attr("cx", function(i){return cx + 100*i/10 })
        .attr("cy", cy)
        .attr('fill',color)
  },
  this.createBottom = function(){
    var dots_array = [];
    for(i=0;i<=not_square;i++)
    {
      dots_array.push(i);
    };
    svg.selectAll('.'+name+'_bottom_side')
        .data(dots_array)
        .enter().append('circle')
        .attr('class','bottom_side')
        .attr('r',2.5)
        .attr("cx", function(i){return cx + 100*i/10})
        .attr("cy", cy + 100*num/10)
        .attr('fill',color)
  },
  this.createText = function(){
   var lines =  line.split('^');
    svg.selectAll('.'+name+'_text')
            .data(lines)
            .enter()
            .append('text')
            .attr('x',function(d,i) {return cx+20})
            .attr('y',function(d,i) {return cy+20*(i+1.2)})
            .text( function (d) { return d; })
            .attr("font-family", "Calibri")
            .attr('text-anchor','center-align')
            .style("font-size", "15px")
            .attr("fill", color)
            .attr('class',name+'_text');
    },
    this.branch_length = branch_length,
    this.createBranchHorizLeft = function(){
    var dots_array = [];
    for(i=0;i<=branch_length;i++)
    {
      dots_array.push(i);
    };
    svg.selectAll('.'+name+'_branch_horizleft')
        .data(dots_array)
        .enter().append('circle')
        .attr('class','branch_horizleft')
        .attr('r',2.5)
        .attr("cx", function(i){return cx - 100*i/10})
        .attr("cy", cy + 100*(num/2)/10)
        .attr('fill',color)
  },
  this.createBranchHorizRight = function(){
  var dots_array = [];
  for(i=0;i<=branch_length;i++)
  {
    dots_array.push(i);
  };
  svg.selectAll('.'+name+'_branch_horizright')
      .data(dots_array)
      .enter().append('circle')
      .attr('class','branch_horizright')
      .attr('r',2.5)
      .attr("cx", function(i){return cx +10*not_square + 100*i/10})
      .attr("cy", cy + 100*(num/2)/10)
      .attr('fill',color)
},
this.createBranchVertRight = function(){
var dots_array = [];
for(i=0;i<=vert_length;i++)
{
  dots_array.push(i);
};
svg.selectAll('.'+name+'_branch_vertright')
    .data(dots_array)
    .enter().append('circle')
    .attr('class','branch_vertright')
    .attr('r',2.5)
    .attr("cx", cx + 10*not_square + 100*branch_length/10)
    .attr("cy", function(i){return cy + 100*(num/2)/10 - 100*i/10})
    .attr('fill',color)
}
};
