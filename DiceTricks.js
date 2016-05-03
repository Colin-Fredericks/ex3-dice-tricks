var tricks = {
    'double10': {
        'label': 'Double 10s',
        'success_rate': 0.5,
        'stdev': 0.67
    },
    'double9': {
        'label': 'Double 9s',
        'success_rate': 0.6,
        'stdev': 0.8
    },
    'double8': {
        'label': 'Double 8s',
        'success_rate': 0.7,
        'stdev': 0.901
    },
    'double7': {
        'label': 'Double 7s',
        'success_rate': 0.8,
        'stdev': 0.98
    },
    'none': {
        'label': 'none',
        'success_rate': 0.4,
        'stdev': 0.49
    },
    'exploding10': {
        'label': 'Exploding 10s',
        'success_rate': 0.556,
        'stdev': 0.847
    },
    '1subtract': {
        'label': '1s Subtract',
        'success_rate': 0.4,
        'stdev': 0.734
    },
    'reroll6': {
        'label': 'Reroll 6s',
        'success_rate': 0.556,
        'stdev': 0.686
    },
    'reroll56': {
        'label': 'Reroll 5s and 6s',
        'success_rate': 0.625,
        'stdev': 0.696
    },
    'TN6': {
        'label': 'TN 6',
        'success_rate': 0.6,
        'stdev': 0.664
    },
    'TN5': {
        'label': 'TN 5',
        'success_rate': 0.7,
        'stdev': 0.639
    },
    'TN4': {
        'label': 'TN 4',
        'success_rate': 0.8,
        'stdev': 0.601
    }
}

var tricksToPlot = [
    'double10',
    'TN6'
];


var dataOptions = [
    {
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
    },
    {
        fill: false,
        lineTension: 0.1,
        backgroundColor: "#ffb84d",
        borderColor: "#ff7f0e",
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: "#ff7f0e",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#ff7f0e",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
    },
]

var options = {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true
            }
        }]
    }
}