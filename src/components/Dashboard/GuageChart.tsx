import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsSolidGauge from "highcharts/modules/solid-gauge";
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsMore from 'highcharts/highcharts-more';

const options = {
    chart: {
        type: 'solidgauge',
        height: '35%',
    },

    exporting: {
        enabled: false
    },

    credits: {
        enabled: false
    },

    title: {
        text: 'Students by Gender',
        style: {
            fontSize: '18px'
        }
    },

    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },
    tooltip: {
        chart: {
            chartWidth: 300,
            plotHeight: 400
        },
        borderWidth: 0,
        backgroundColor: 'none',
        padding: 15,
        shadow: false,
        style: {
            fontSize: '16px',
        },
        valueSuffix: '%',
        pointFormat: '{series.name}<br><span style="font-size:1em; color: {point.color}; font-weight: bold">{point.y}</span>',
        positioner(labelWidth: number): Highcharts.PositionObject {
            return {
                x: (this.chart.chartWidth - labelWidth) / 2,
                y: (this.chart.plotHeight / 2) + 15
            };
        }
    },
    
    pane: {
        startAngle: 0,
        endAngle: 360,
        background: [{ 
            outerRadius: '112%',
            innerRadius: '88%',
            backgroundColor: '#4DD1E830',
            borderWidth: 0
        }, { 
            outerRadius: '87%',
            innerRadius: '63%',
            backgroundColor: '#F9327930',
            borderWidth: 0
        }]
    },
    yAxis: {
        min: 0,
        max: 100,
        lineWidth: 0,
        tickPositions: []
    },
    plotOptions: {
        solidgauge: {
            dataLabels: {
                enabled: false
            },
            linecap: 'round',
            stickyTracking: false,
            rounded: true
        }
    },
    series: [{
        name: 'Male',
        data: [{
            color: '#4DD1E8',
            radius: '112%',
            innerRadius: '88%',
            y: 45
        }]
    }, {
        name: 'Female',
        data: [{
            color: '#F93279',
            radius: '87%',
            innerRadius: '63%',
            y: 55
        }]
    }]
}
const GuageChart = () => {
    HighchartsExporting(Highcharts);
    HighchartsMore(Highcharts);
    HighchartsSolidGauge(Highcharts);
    return(
        <Flex justify="center">
            <HighchartsReact highcharts={Highcharts} options={options}  />
        </Flex>
    )
}
export default GuageChart;