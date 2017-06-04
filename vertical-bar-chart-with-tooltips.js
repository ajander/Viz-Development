var margin = {top: 20, right: 30, bottom: 30, left: 40},
	width = 960 - margin.right - margin.left,
 	height = 500 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
	.rangeRoundBands([0, width], .1);	// .1 is padding between bars?

var y = d3.scale.linear()
	.range([height, 0]);

// append g means elements added to chart will inherit margins
var chart = d3.select('.chart')
	.attr('width', width + margin.right + margin.left)
	.attr('height', height + margin.top + margin.bottom)
  .append('g')
  	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

d3.csv('./data-CS-degrees.csv', row, function(error, data) {

	data.sort(function(a, b) { return b.value - a.value; });	// sort descending

	x.domain(data.map(function(d) { return d.country; }));
	y.domain([0, d3.max(data, function(d) { return d.value; })]);

	var barWidth = width / data.length;

	var bar = chart.selectAll('g')
		.data(data)
	  .enter().append('g')
	  	.attr('transform', function(d, i) { return 'translate(' + x(d.country) + ',0)'; });

	bar.append('rect')
		.attr('y', function(d) { return y(d.value); })
	 	.attr('height', function(d) { return height - y(d.value); })
	 	.attr('width', x.rangeBand());

	bar.append('text')
	 	.attr('x', x.rangeBand() / 2 + 10)
	 	.attr('y', function(d) { return y(d.value) + 3; })
	 	.attr('dy', '.75em')							// center the text vertically
	 	.text(function(d) { return String(d.value) + '%'; });

})

// row conversion function
function row(d) {
	return {
		country: d.Country,
		value: +Math.round(d.Percent)	// convert 2012 percent to number type
	};
}

// var div = d3.select("body").append("div")
//     .attr("class", "tooltip")
//     .style("opacity", 0);

// function mousemove() {
//   div.style("left", (d3.event.pageX + 10) + "px")
//       .style("top", (d3.event.pageY - 38) + "px");
// }

// function mouseout() {
//   div.style("opacity", 0);
// }

// d3.tsv('./data.tsv', type, function(error, data) {
// 	x.domain([0, d3.max(data, function(d) { return d.value; })]);

// 	chart.attr('height', barHeight * data.length);

// 	var bar = chart.selectAll('g')
// 		.data(data)
// 	  .enter().append('g')
// 	  	.attr('transform', function(d, i) { return 'translate(0,' + i * barHeight + ')'; })  	
// 	 	.on("mouseover", function(d, i) {
// 		  	div.style("opacity", 1)
// 		  		.html("<strong>Data</strong><hr/>" + d.name + ", "  + d.value);
// 		})
// 	    .on("mousemove", mousemove)
// 	    .on("mouseout", mouseout);

// 	bar.append('rect')
// 	 	.attr('width', function(d) { return x(d.value); })
// 	 	.attr('height', barHeight - 1);

// 	bar.append('text')
// 	 	.attr('x', function(d) { return x(d.value) - 3; })		// x position of text
// 	 	.attr('y', barHeight / 2)						// y position of text, relative to g
// 	 	.attr('dy', '.35em')							// center the text vertically
// 	 	.text(function(d) { return d.value; });

	

// })

// function type(d) {
// 	d.value = +d.value;	// coerce to number type
// 	return d;
// }





