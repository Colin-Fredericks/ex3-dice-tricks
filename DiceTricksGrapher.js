window.onload = function(){
    console.log('working');
    
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

};