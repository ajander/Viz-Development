// Resources:
// http://www.oecd.org/gender/data/percentageoftertiaryqualificationsawardedtowomenbyfieldofeducation.htm (for data)
// https://bl.ocks.org/rcrocker13/66a11b84ff86edc61ffb61b3d99cf02a (for sorting)
// https://bost.ocks.org/mike/bar/3/ (for everything else)

var margin = {top: 20, right: 30, bottom: 100, left: 30},
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

	var xAxis = d3.axisBottom(x),
		yAxis = d3.axisLeft(y).ticks(5, '%');

	// add X axis
	g.append('g')
      .attr("class", "axis")
      .attr("transform", "translate(0," + (height + 2) + ")")
      .call(xAxis)
      .selectAll('text')
      	.attr("transform", "rotate(-90)")

    // add Y axis
    g.append("g")
      .attr("class", "axis")
      .call(yAxis);
      // .append("text")
	     //  .attr("transform", "rotate(-90)")
	     //  .attr('x', -160)
	     //  .attr("y", -50)
	     //  .attr("dy", "0.71em")
	     //  .attr("text-anchor", "end")
	     //  .text("Percentage");

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
// 		value: +Math.round(d.Percent/100).toFixed(2)	// convert 2012 percent to number type
// 	};
// }

// row conversion function
function row(d) {
	d.Percent = Math.round(d.Percent)/100; 
	return d;
}