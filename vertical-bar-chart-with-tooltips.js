// Resources:
// http://www.oecd.org/gender/data/percentageoftertiaryqualificationsawardedtowomenbyfieldofeducation.htm (for data)
// https://bl.ocks.org/rcrocker13/66a11b84ff86edc61ffb61b3d99cf02a (for sorting)
// https://bost.ocks.org/mike/bar/3/ (for everything else)

var margin = {top: 20, right: 30, bottom: 30, left: 20},
	width = 960 - margin.right - margin.left,
 	height = 500 - margin.top - margin.bottom;

// append g means elements added to chart will inherit margins
var chart = d3.select('.chart')
	.attr('width', width + margin.right + margin.left)
	.attr('height', height + margin.top + margin.bottom)

var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
	y = d3.scaleLinear().range([height, 0]);

var g = chart.append('g')
  	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

d3.csv('./data-CS-degrees.csv', row, function(error, data) {

	data.sort(function(a, b) { return b.Percent - a.Percent; });	// sort descending

	x.domain(data.map(function(d) { return d.Country; }));
	y.domain([0, d3.max(data, function(d) { return d.Percent; })]);

	g.append('g')
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    g.append("g")
      .attr("class", "axis axis--y")
      .attr("transform", "translate(" + (margin.left - 15) + ")")
      .call(d3.axisLeft(y))
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Frequency");

	g.selectAll('.bar')
		.data(data)
	  .enter().append('rect')
	  	.attr('class', 'bar')
	  	.attr('x', function(d) { return x(d.Country); })
	 	.attr('y', function(d) { return y(d.Percent); })
	  	.attr('height', function(d) { return height - y(d.Percent); })
	 	.attr('width', x.bandwidth())

})

// // row conversion function
// function row(d) {
// 	return {
// 		country: d.Country,
// 		value: +Math.round(d.Percent)	// convert 2012 percent to number type
// 	};
// }

// row conversion function
function row(d) {
	d.Percent = +d.Percent; 
	return d;
}