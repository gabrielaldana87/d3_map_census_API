var list = _.filter(parsed, function(o){return o.short ==="SOCIAL";});
_.map(list, function(o){return o.indicator1;});
