$(document).ready(function(){
    console.log('working');

    var diceMax = 25;

    var tricksToPlot = [
        'double10',
        'TN6'
    ];
    
    // Set up selector and options for tricks A and B.
    $('#trickAoptions').append('<select id="trickAselector"></select>');
    $('#trickBoptions').append('<select id="trickBselector"></select>');
    for(var key in tricks){
        var optionItem = '<option value="' + key + '">' + tricks[key].label + '</option>';
        $('#trickAselector').append(optionItem);
        $('#trickBselector').append(optionItem);
    }
    
    $('#trickAtab').button().on('click', function(){
        $('#trickAoptions').show();
        $('#trickBoptions').hide();
    });
    
    $('#trickBtab').button().on('click', function(){
        $('#trickAoptions').hide();
        $('#trickBoptions').show();
    });
    
    for(key in tricks){
        tricks[key].data = [];
        tricks[key].high = [];
        tricks[key].low = [];
        for(var i = 0; i < diceMax; i++){
            tricks[key].data[i] = tricks[key]['success_rate']*(i+1);
            tricks[key].high[i] = tricks[key].data[i] + tricks[key]['stdev'] * Math.sqrt(i+1);
            tricks[key].low[i] = tricks[key].data[i] - tricks[key]['stdev'] * Math.sqrt(i+1);
        }
    }

    var trickA = tricks[tricksToPlot[0]];
    var trickB = tricks[tricksToPlot[1]];
    
    var trickAOptions = {
        title: '&nbsp;',
        axesDefaults: {
            pad: 1.05,
            tickInterval: 5
        },
        axes: {
            xaxis: { min: 0, max: 25 },
            yaxis: { min: 0, max: 20 }
        },
        series:[
            {showMarker: false, color: '#40bf80', shadow: false, label:'high'},
            {showMarker: true, markerOptions: {style: 'filledSquare'}, color: '#339966', shadow: false, label:'avg'},
            {showMarker: false, color: '#2d8659', shadow: false, label:'low'}
        ],
        fillBetween: {
            series1: 0,
            series2: 2,
            color: 'rgba(51, 153, 102, 0.3)',
            fill: true
        },
        legend: {
            show: true,
            location: 'nw'
        }

    };
    
    var trickBOptions = {
        title: 'Successes for <span id="trickALabel">' 
            + trickA.label 
            + '</span> and <span id="trickBLabel">' 
            + trickB.label
            + '</span>',
        axesDefaults: {
            pad: 1.05,
            tickInterval: 5
        },
        axes: {
            xaxis: { min: 0, max: 25 },
            yaxis: { min: 0, max: 20 }
        },
        series:[
            {showMarker: false, color: '#ff9900', shadow: false, label:'high'},
            {showMarker: true, markerOptions: {style: 'filledSquare'}, color: '#e68a00', shadow: false, label:'avg'},
            {showMarker: false, color: '#cc7a00', shadow: false, label:'low'}
        ],
        fillBetween: {
            series1: 0,
            series2: 2,
            color: 'rgba(255, 153, 0, 0.3)',
            fill: true
        },
        grid: {
            backgroundColor: 'rgba(0, 0, 0, 0)',
            drawGridlines: false
        },
        legend: {
            show: true,
            location: 'nw'
        }
    };
     
    var plotA = $.jqplot('successChart', [trickA.high, trickA.data, trickA.low], trickAOptions);
    var plotB = $.jqplot('successChart', [trickB.high, trickB.data, trickB.low], trickBOptions);


    $('#trickAselector').selectmenu({
        select: function(event, ui) {
            tricksToPlot[0] = this.value;
            trickA = tricks[tricksToPlot[0]];
            plotA.redraw();
            plotB.redraw();
            console.log(this.value);
            console.log(trickA);
        },
        create: function(){
            $('#trickAselector option[value='+tricksToPlot[0]+']').prop('selected', 'selected');
        }
    });
    
    $('#trickBselector').selectmenu({
        select: function(event, ui) {
            tricksToPlot[1] = this.value;
            trickB = tricks[tricksToPlot[1]];
            plotA.redraw();
            plotB.redraw();
            console.log(this.value);
            console.log(trickB);
        },
        create: function(){
            $('#trickBselector option[value='+tricksToPlot[1]+']').prop('selected', 'selected');
        }
    });
    
});