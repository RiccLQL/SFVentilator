import React, { useRef } from "react";

import { defaults, Line } from "react-chartjs-2";

import { colorToRGBA } from "./Utilities";

export default function Chart({ colors, data, title }) {
    const chartRef = useRef(null);

    let processedData = {
        labels: data.map(d => d.timestamp),
        datasets: Object.entries(colors).map(([dataIndex, newColor], colorIndex, colorEntries) => (
            {
                type: 'line',
                label: 'Dataset ' + colorIndex,
                fill: 'origin',
                lineTension: 0.1,
                backgroundColor: colorToRGBA(newColor, 0.4),
                borderColor: colorToRGBA(newColor, 1),
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: colorToRGBA(newColor, 1),
                pointBackgroundColor: 'black',
                pointBorderWidth: 5,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: colorToRGBA(newColor, 1),
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: data.map((d, i) =>
                    (i >= dataIndex && (colorIndex >= colorEntries.length - 1 || i <= colorEntries[colorIndex + 1][0]))
                        ? d.datum
                        : null
                ),
            }
        )),
    };

    const options = {
        defaultFontFamily: defaults.global.defaultFontFamily = "Product Sans",
        defaultFontSize: defaults.global.defaultFontSize = 24,
        title: {
            display: true,
            text: title
        },
        responsive: true,
        legend: {
            display: false,
        },
        tooltips: {
            callbacks: {
                label: item => item.yLabel,
            },
        },
    };

    return <Line ref={chartRef} options={options} data={processedData} />;
};