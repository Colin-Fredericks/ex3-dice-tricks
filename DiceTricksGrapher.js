window.onload = function(){
    console.log('working');

    var diceMax = 25;
    var lineData = {};
    
    for(var i = 0; i < tricksToPlot.length; i++){
        lineData[tricksToPlot[i]] = [];
        for (var j = 0; j < diceMax; j++){
            lineData[tricksToPlot[i]].push({});
            lineData[tricksToPlot[i]][j].x = j+1;
            lineData[tricksToPlot[i]][j].y = tricks[tricksToPlot[i]]['success_rate']*(j+1);
        }
    }
    
    var oneData = lineData[tricksToPlot[0]];


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
            .domain([d3.min(oneData, function(d) {
                return d.x;
            }), d3.max(oneData, function(d) {
            return d.x;
        })]),
        yRange = d3.scale.linear()
            .range([HEIGHT - MARGINS.top, MARGINS.bottom])
            .domain([d3.min(oneData, function(d) {
                return d.y;
            }), d3.max(oneData, function(d) {
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
  

    vis.append('svg:path')
        .attr('d', lineFunc(lineData[tricksToPlot[0]]))
        .attr('stroke', 'blue')
        .attr('stroke-width', 2)
        .attr('fill', 'none');

    vis.append('svg:path')
        .attr('d', lineFunc(lineData[tricksToPlot[1]]))
        .attr('stroke', 'red')
        .attr('stroke-width', 2)
        .attr('fill', 'none');

/*

    var data = {};

    data.labels = [];
    for (var x = 0; x < 25; x++){
        data.labels[x] = x+1;
    }


    data.datasets = [];
    for(var i = 0; i < 2; i++){
        // The number of successes
        data.datasets.push({});
        data.datasets[i*3].data = [];
        data.datasets[i*3].label = tricks[tricksToPlot[i]].label;

        for (var x = 0; x < 25; x++){
            data.datasets[i*3].data[x] = tricks[tricksToPlot[i]]['success_rate']*(x+1);
        }
        
        // The the high end
        data.datasets.push({});
        data.datasets[i*3+1].data = [];
        data.datasets[i*3+1].label = tricks[tricksToPlot[i]].label + ' High';

        for (var x = 0; x < 25; x++){
            data.datasets[i*3+1].data[x] = data.datasets[i*3].data[x] + tricks[tricksToPlot[i]]['stdev']*Math.sqrt(x+1);
        }

        // The the low end
        data.datasets.push({});
        data.datasets[i*3+2].data = [];
        data.datasets[i*3+2].label = tricks[tricksToPlot[i]].label + ' Low';

        for (var x = 0; x < 25; x++){
            data.datasets[i*3+2].data[x] = data.datasets[i*3].data[x] - tricks[tricksToPlot[i]]['stdev']*Math.sqrt(x+1);
        }
        
    }

    for(var y = 0; y < data.datasets.length; y++){
        for(key in dataOptions[y]){
            data.datasets[y*3][key] = dataOptions[y][key];
            data.datasets[y*3+1][key] = dataOptions[y][key];
            data.datasets[y*3+2][key] = dataOptions[y][key];
        }
    }

    var plotCanvas = document.getElementById('successChart');
    
    var exchart = new Chart(plotCanvas, {
        type: 'line',
        data: data,
        options: options
    });
    
*/

};