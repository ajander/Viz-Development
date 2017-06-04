// var width = 420,
//  	barHeight = 20;

var width = 960,
 	height = 500;

// var x = d3.scale.linear()
// 	.range([0, 420]);

var y = d3.scale.linear()
	.range([height, 0]);

var chart = d3.select('.chart')
	.attr('width', width)
	.attr('height', height)

d3.csv('./data-CS-degrees.csv', row, function(error, data) {
	y.domain([0, d3.max(data, function(d) { return d.value; })]);

	var barWidth = width / data.length;

	var bar = chart.selectAll('g')
		.data(data)
	  .enter().append('g')
	  	.attr('transform', function(d, i) { return 'translate(' + i * barWidth + ',0)'; });

	bar.append('rect')
		.attr('y', function(d) { return y(d.value); })
	 	.attr('height', function(d) { return height - y(d.value); })
	 	.attr('width', barWidth - 1);

	bar.append('text')
	 	.attr('x', barWidth / 2 + 10)
	 	// .attr('dx', '.35em')
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





