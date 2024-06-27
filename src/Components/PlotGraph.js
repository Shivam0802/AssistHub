import React, { useState, useEffect } from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsExporting from 'highcharts/modules/exporting';
import highchartsExportData from 'highcharts/modules/export-data';
import { db } from '../firebase'; // Adjust the import path based on your project structure

// Initialize required Highcharts modules
highchartsExporting(Highcharts);
highchartsExportData(Highcharts);

const UserPlotGraph = ({theme}) => {
    const [chartOptions, setChartOptions] = useState({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Tickets by Category',
            align: 'left'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<span style="font-size: 1.2em"><b>{point.name}</b></span><br><span style="opacity: 0.6">{point.percentage:.1f} %</span>',
                    connectorColor: 'rgba(128,128,128,0.5)'
                }
            }
        },
        series: [{
            name: 'Share',
            data: []
        }]
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const ticketsSnapshot = await db.collection('tickets').get();
                const ticketData = ticketsSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                // Calculate data for pie chart
                const categories = {};
                ticketData.forEach(ticket => {
                    const category = ticket.category; // Adjust this based on your data structure
                    if (categories[category]) {
                        categories[category]++;
                    } else {
                        categories[category] = 1;
                    }
                });

                const chartData = Object.keys(categories).map(category => ({
                    name: category,
                    y: categories[category]
                }));

                setChartOptions({
                    ...chartOptions,
                    series: [{
                        name: 'Tickets',
                        data: chartData
                    }]
                });

            } catch (error) {
                console.error('Error fetching tickets:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className={`w-fit lg:w-[50%] ${theme === 'light' ? 'bg-[#F5F7F8]' : 'bg-[#2F3645]'}`}>
            <HighchartsReact style={{ background: theme === 'light' ? '#F5F7F8' : '#2F3645' }}
                highcharts={Highcharts}
                options={chartOptions}
            />
        </div>
    );
}

export default UserPlotGraph;


