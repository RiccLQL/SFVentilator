import React, { useRef } from "react";

import { makeStyles } from "@material-ui/core/styles";

import { defaults, Line } from "react-chartjs-2";

const useStyles = makeStyles(theme => ({
    root: {

    },
}));

export default function Chart({ title }) {
    const chartRef = useRef(null);
    defaults.global.defaultFontSize = 24;
    const classes = useStyles();

    const options = {
        defaultFontFamily: defaults.global.defaultFontFamily = "Product Sans",
        title: {
            display: true,
            text: title
        },
        responsive: true,
        /* width: 1100,
        height: 500, */
        legend: {
            display: false,
        },
        tooltips: {
            callbacks: {
                label: item => item.yLabel,
            },
        },
    };

    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'My First dataset',
                fill: 'origin',
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [65, 59, -35, 81, -25, 55, 40]
            }
        ]
    };

    return (
        <div className={classes.root}>
            <Line ref={chartRef} {...{ data, options, ...options }} />
        </div>
    )
};