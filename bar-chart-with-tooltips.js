var width = 420,
 	barHeight = 20;

var x = d3.scale.linear()
	.range([0, 420]);

var chart = d3.select('.chart')
	.attr('width', width)

var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("display", "none");


// function mousemove() {
//   div
//       // .text(d3.event.pageX + ", " + d3.event.pageY)
//       .style("left", (d3.event.pageX - 34) + "px")
//       .style("top", (d3.event.pageY - 12) + "px");
// }

// function mousemove() {
//   div
//       // .text(d3.event.pageX + ", " + d3.event.pageY)
//       .style("left", "2px")
//       .style("top", "2px");
// }

function mouseout() {
  div.style("display", "none");
}

d3.tsv('./data.tsv', type, function(error, data) {
	x.domain([0, d3.max(data, function(d) { return d.value; })]);

	chart.attr('height', barHeight * data.length);

	var bar = chart.selectAll('g')
		.data(data)
	  .enter().append('g')
	  	.attr('transform', function(d, i) { return 'translate(0,' + i * barHeight + ')'; })  	
	 	.on("mouseover", function(d) {
		  // div.attr('transform', function(d, i) { return 'translate(0,' + i * barHeight + ')'; });
		  div.style("display", "inline")
		  	.html(d.name + "<br/>"  + d.value);
		})
	    // .on("mousemove", mousemove)
	    .on("mouseout", mouseout);

	bar.append('rect')
	 	.attr('width', function(d) { return x(d.value); })
	 	.attr('height', barHeight - 1);

	bar.append('text')
	 	.attr('x', function(d) { return x(d.value) - 3; })		// x position of text
	 	.attr('y', barHeight / 2)						// y position of text, relative to g
	 	.attr('dy', '.35em')							// center the text vertically
	 	.text(function(d) { return d.value; });

	

})

function type(d) {
	d.value = +d.value;	// coerce to number type
	return d;
}



