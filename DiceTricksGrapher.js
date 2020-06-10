$(document).ready(function () {
  console.log('working');

  var diceMax = 25;
  var dataTable = $('#rawData tbody');
  var extraSuccA = 0;
  var extraSuccB = 0;

  // Create the data tables in each trick.
  for (key in tricks) {
    tricks[key].value = key;
    tricks[key].data = [];
    tricks[key].high = [];
    tricks[key].low = [];
    for (var i = 0; i < diceMax; i++) {
      tricks[key].data[i] = tricks[key]['success_rate'] * (i + 1);
      tricks[key].high[i] =
        tricks[key].data[i] + tricks[key]['stdev'] * Math.sqrt(i + 1);
      tricks[key].low[i] =
        tricks[key].data[i] - tricks[key]['stdev'] * Math.sqrt(i + 1);
    }
  }

  // Make copies of the default tricks.
  var trickA = $.extend(true, {}, tricks['double10']);
  var trickB = $.extend(true, {}, tricks['1subtract']);

  // Set up selector and options for tricks A and B.
  for (var key in tricks) {
    var optionItem =
      '<option value="' + key + '">' + tricks[key].label + '</option>';
    $('#trickAselector').append(optionItem);
    $('#trickBselector').append(optionItem);
  }

  // Set options for the default tricks and plot them.
  var trickAOptions = {
    title: '&nbsp;',
    axesDefaults: {
      pad: 1.05,
      tickInterval: 5,
    },
    axes: {
      xaxis: { min: 0, max: 25, label: 'Dice Pool' },
      yaxis: { min: 0, max: 20, label: 'Successes' },
    },
    series: [
      { showMarker: false, color: '#40bf80', shadow: false, label: 'high' },
      {
        showMarker: true,
        markerOptions: { style: 'filledSquare' },
        color: '#339966',
        shadow: false,
        label: 'avg',
      },
      { showMarker: false, color: '#2d8659', shadow: false, label: 'low' },
    ],
    fillBetween: {
      series1: 0,
      series2: 2,
      color: 'rgba(51, 153, 102, 0.3)',
      fill: true,
    },
    legend: {
      show: true,
      location: 'nw',
    },
  };

  var trickBOptions = {
    title:
      'Successes for <span id="trickALabel">' +
      trickA.label +
      '</span> and <span id="trickBLabel">' +
      trickB.label +
      '</span>',
    axesDefaults: {
      pad: 1.05,
      tickInterval: 5,
    },
    axes: {
      xaxis: { min: 0, max: 25, label: 'Dice Pool' },
      yaxis: { min: 0, max: 20, label: 'Successes' },
    },
    series: [
      { showMarker: false, color: '#ff9900', shadow: false, label: 'high' },
      {
        showMarker: true,
        markerOptions: { style: 'filledSquare' },
        color: '#e68a00',
        shadow: false,
        label: 'avg',
      },
      { showMarker: false, color: '#cc7a00', shadow: false, label: 'low' },
    ],
    fillBetween: {
      series1: 0,
      series2: 2,
      color: 'rgba(255, 153, 0, 0.3)',
      fill: true,
    },
    grid: {
      backgroundColor: 'rgba(0, 0, 0, 0)',
      drawGridlines: false,
    },
    legend: {
      show: true,
      location: 'nw',
    },
  };

  var plotA = $.jqplot(
    'successChart',
    [trickA.high, trickA.data, trickA.low],
    trickAOptions
  );
  var plotB = $.jqplot(
    'successChart',
    [trickB.high, trickB.data, trickB.low],
    trickBOptions
  );

  // Because we can't just change the data, we need to redraw the graph.
  function redrawGraph() {
    trickBOptions.title =
      'Successes for <span id="trickALabel">' +
      trickA.label +
      '</span> and <span id="trickBLabel">' +
      trickB.label +
      '</span>';

    // Get a clean copy of the data.
    trickA = $.extend(true, {}, tricks[trickA.value]);
    trickB = $.extend(true, {}, tricks[trickB.value]);

    // Update both tricks for extra successes if necessary.
    var addForA = $(addSuccA).prop('checked');
    if (addForA) {
      for (var i = 0; i < diceMax; i++) {
        trickA.data[i] += extraSuccA;
        trickA.high[i] += extraSuccA;
        trickA.low[i] += extraSuccA;
      }
    }
    var addForB = $(addSuccB).prop('checked');
    if (addForB) {
      for (var i = 0; i < diceMax; i++) {
        trickB.data[i] += extraSuccB;
        trickB.high[i] += extraSuccB;
        trickB.low[i] += extraSuccB;
      }
    }

    // Sad fact: Destroying and recreating the graphs is twice as fast as the replot command.
    // https://stackoverflow.com/questions/13660883/jqplot-auto-refresh-chart-with-dynamic-ajax-data/19471949#19471949
    plotA.destroy();
    plotB.destroy();
    plotA = $.jqplot(
      'successChart',
      [trickA.high, trickA.data, trickA.low],
      trickAOptions
    );
    plotB = $.jqplot(
      'successChart',
      [trickB.high, trickB.data, trickB.low],
      trickBOptions
    );
  }

  // Just like with the graph, we need to update the table for new data.
  function updateTable() {
    $('table tr[class!="keepbits"]').remove();
    $('#tableTrickA').text(trickA.label);
    $('#tableTrickB').text(trickB.label);
    for (var i = 0; i < diceMax; i++) {
      dataTable.append(
        '<tr><th>' +
          (i + 1) +
          '</th><td>' +
          Math.round(trickA.data[i] * 100) / 100 +
          ' <span class="uncertainty">±' +
          Math.round(trickA.stdev * Math.sqrt(i + 1) * 100) / 100 +
          '</span></td><td>' +
          Math.floor(trickB.data[i] * 100) / 100 +
          ' <span class="uncertainty">±' +
          Math.round(trickB.stdev * Math.sqrt(i + 1) * 100) / 100 +
          '</span></td></tr>'
      );
    }
  }

  // Run an update right away when we open the page.
  updateTable();

  // Set up the pull-down menus for the tricks.
  $('#trickAselector').selectmenu({
    select: function (event, ui) {
      trickA = tricks[this.value];
      redrawGraph();
      updateTable();
    },
    create: function () {
      // Make sure we have the default tricks selected when the page opens.
      $('#trickAselector option[value=' + trickA.value + ']').prop(
        'selected',
        'selected'
      );
      $('#trickAselector').selectmenu('refresh');
    },
  });

  $('#trickBselector').selectmenu({
    select: function (event, ui) {
      trickB = tricks[this.value];
      redrawGraph();
      updateTable();
    },
    create: function () {
      // Make sure we have the default tricks selected when the page opens.
      $('#trickBselector option[value=' + trickB.value + ']').prop(
        'selected',
        'selected'
      );
      $('#trickBselector').selectmenu('refresh');
    },
  });

  // Add the stuff that lets us add successes to a trick.
  function setSuccA(event, ui) {
    extraSuccA = ui.value;
    $('#sliderAVal').text(extraSuccA);
    redrawGraph();
    updateTable();
  }

  function setSuccB(event, ui) {
    extraSuccB = ui.value;
    $('#sliderBVal').text(extraSuccB);
    redrawGraph();
    updateTable();
  }

  $('#sliderA').slider({
    orientation: 'horizontal',
    min: 0,
    max: 5,
    value: 0,
    slide: setSuccA,
    change: setSuccA,
  });

  $('#sliderB').slider({
    orientation: 'horizontal',
    min: 0,
    max: 5,
    value: 0,
    slide: setSuccB,
    change: setSuccB,
  });

  $('#addSuccA').change(function () {
    redrawGraph();
    updateTable();
  });

  $('#addSuccB').change(function () {
    redrawGraph();
    updateTable();
  });
});
