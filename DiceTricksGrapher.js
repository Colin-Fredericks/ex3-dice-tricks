$(document).ready(function(){
    console.log('working');

    var diceMax = 25;

    for(key in tricks){
        tricks[key].data = [];
        tricks[key].high = [];
        tricks[key].low = [];
        for(var i = 0; i < diceMax; i++){
            tricks[key].data[i] = tricks[key]['success_rate']*(i+1);
            tricks[key].high[i] = tricks[key].data[i] + tricks[key]['stdev']*Math.sqrt(i+1);
            tricks[key].low[i] = tricks[key].data[i] - tricks[key]['stdev']*Math.sqrt(i+1);
        }
    }

    var trickA = tricks[tricksToPlot[0]];
    var trickB = tricks[tricksToPlot[1]];
     
    var plot1 = $.jqplot("successChart", [trickA.data, trickA.high, trickA.low], {
        title: 'Successes for ' + trickA.label + ' and ' + trickB.label +'.',
        axesDefaults: {
            pad: 1.05
        },
        //////
        // Use the fillBetween option to control fill between two
        // lines on a plot.
        //////
        fillBetween: {
            // series1: Required, if missing won't fill.
            series1: 0,
            // series2: Required, if  missing won't fill.
            series2: 2,
            // color: Optional, defaults to fillColor of series1.
            color: "rgba(227, 167, 111, 1)",
            // baseSeries:  Optional.  Put fill on a layer below this series
            // index.  Defaults to 0 (first series).  If an index higher than 0 is
            // used, fill will hide series below it.
            baseSeries: 0,
            // fill:  Optional, defaults to true.  False to turn off fill.  
            fill: true
        },
        seriesDefaults: {
            rendererOptions: {
                showMarker: false,
                markerOptions: { style:'diamond' },
                //////
                // Turn on line smoothing.  By default, a constrained cubic spline
                // interpolation algorithm is used which will not overshoot or
                // undershoot any data points.
                //////
                smooth: true
            }
        }
    });

    var plot2 = $.jqplot("successChart", [trickB.data, trickB.high, trickB.low], {
        title: 'Successes for ' + trickA.label + ' and ' + trickB.label +'.',
        axesDefaults: {
            pad: 1.05
        },
        //////
        // Use the fillBetween option to control fill between two
        // lines on a plot.
        //////
        fillBetween: {
            // series1: Required, if missing won't fill.
            series1: 1,
            // series2: Required, if  missing won't fill.
            series2: 2,
            // color: Optional, defaults to fillColor of series1.
            color: "rgba(0, 167, 111, 0.3)",
            // baseSeries:  Optional.  Put fill on a layer below this series
            // index.  Defaults to 0 (first series).  If an index higher than 0 is
            // used, fill will hide series below it.
            baseSeries: 0,
            // fill:  Optional, defaults to true.  False to turn off fill.  
            fill: true
        },
        seriesDefaults: {
            rendererOptions: {
                showMarker: false,
                markerOptions: { style:'diamond' },
                //////
                // Turn on line smoothing.  By default, a constrained cubic spline
                // interpolation algorithm is used which will not overshoot or
                // undershoot any data points.
                //////
                smooth: true
            }
        }
    });
});