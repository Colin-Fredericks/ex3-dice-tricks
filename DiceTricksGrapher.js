window.onload = function(){
    console.log('working');

    var diceMax = 25;
    var lineData = {};
    var maxData = [];
    var lineColors = [
        '#4682B4',
        '#6B94B5',
        '#6B94B5',
        '#FF8C00',
        '#FFA333',
        '#FFA333',
    ];


    // Creating the success-per-dice line data,
    // with high and low based on standard deviation
    // Draws on the data in DiceTricks.js
    for(var i = 0; i < tricksToPlot.length; i++){
        lineData[tricksToPlot[i]] = [];
        lineData[tricksToPlot[i] + '_high'] = [];
        lineData[tricksToPlot[i] + '_low'] = [];
        
        // Successes
        for (var j = 0; j < diceMax; j++){
            lineData[tricksToPlot[i]].push({});
            lineData[tricksToPlot[i]][j].x = j+1;
            lineData[tricksToPlot[i]][j].y = tricks[tricksToPlot[i]]['success_rate']*(j+1);
            lineData[tricksToPlot[i]][j].color = lineColors[i*3];
        }
        // High: Successes + standard deviation
        for (var j = 0; j < diceMax; j++){
            lineData[tricksToPlot[i] + '_high'].push({});
            lineData[tricksToPlot[i] + '_high'][j].x = j+1;
            lineData[tricksToPlot[i] + '_high'][j].y = lineData[tricksToPlot[i]][j].y + tricks[tricksToPlot[i]]['stdev']*Math.sqrt(j+1);
            lineData[tricksToPlot[i] + '_high'][j].color = lineColors[i*3+1];
        }
        // Low: Successes - standard deviation
        for (var j = 0; j < diceMax; j++){
            lineData[tricksToPlot[i] + '_low'].push({});
            lineData[tricksToPlot[i] + '_low'][j].x = j+1;
            lineData[tricksToPlot[i] + '_low'][j].y = lineData[tricksToPlot[i]][j].y - tricks[tricksToPlot[i]]['stdev']*Math.sqrt(j+1);
            lineData[tricksToPlot[i] + '_low'][j].color = lineColors[i*3+2];
        }
    }
    
    // maxData helps set the scaling for the plot.
    for (var j = 0; j < diceMax; j++){
        maxData[j] = {'x': j, 'y': 0};
        for(var i = 0; i < tricksToPlot.length; i++){
            if(lineData[tricksToPlot[i]][j].y > maxData[j].y){
                maxData[j].y = lineData[tricksToPlot[i]][j].y;
            }
        }   
    }


    var vis = d3.select('#successChart'),
        WIDTH = 800,
        HEIGHT = 500,
        MARGINS = {
            top: 20,
            right: 20,
            bottom: 20,
            left: 50
        },
        xRange = d3.scale.linear()
            .range([MARGINS.left, WIDTH - MARGINS.right])
            .domain([d3.min(maxData, function(d) {
                return d.x;
            }), d3.max(maxData, function(d) {
            return d.x;
        })]),
        yRange = d3.scale.linear()
            .range([HEIGHT - MARGINS.top, MARGINS.bottom])
            .domain([d3.min(maxData, function(d) {
                return d.y;
            }), d3.max(maxData, function(d) {
            return d.y;
        })]),
        xAxis = d3.svg.axis()
            .scale(xRange)
            .tickSize(5)
            .tickSubdivide(true),
        yAxis = d3.svg.axis()
            .scale(yRange)
            .tickSize(5)
            .orient('left')
            .tickSubdivide(true);

    vis.append('svg:g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')')
        .call(xAxis);

    vis.append('svg:g')
        .attr('class', 'y axis')
        .attr('transform', 'translate(' + (MARGINS.left) + ',0)')
        .call(yAxis);

    var lineFunc = d3.svg.line()
        .x(function(d) {
            return xRange(d.x);
        })
        .y(function(d) {
            return yRange(d.y);
        })
        .interpolate('linear');
  
    
    for(key in lineData){
        vis.append('svg:path')
            .attr('d', lineFunc(lineData[key]))
            .attr('stroke', lineData[key][0].color)
            .attr('stroke-width', 2)
            .attr('fill', 'none');
    }

};