// Successes and standard deviations for rolling a single die with particular tricks.
var tricks = {
    'double10': {
        'label': 'Double 10s (default)',
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
        'label': 'Don\'t Double 10s',
        'success_rate': 0.4,
        'stdev': 0.49
    },
    'exploding10': {
        'label': 'Exploding 10s',
        'success_rate': 0.556,
        'stdev': 0.848
    },
    '1subtract': {
        'label': '1s Subtract',
        'success_rate': 0.4,
        'stdev': 0.734
    },
    'reroll6': {
        'label': 'Reroll 6s',
        'success_rate': 0.55,
        'stdev': 0.683
    },
    'reroll6forever': {
        'label': 'Reroll 6s forever',
        'success_rate': 0.556,
        'stdev': 0.686
    },
    'reroll56': {
        'label': 'Reroll 5s and 6s',
        'success_rate': 0.625,
        'stdev': 0.696
    },
    'rerollNS': {
        'label': 'Reroll non-successes once',
        'success_rate': 0.8,
        'stdev': 0.694
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
};
