import { useState } from "react";
import DoughnutChartWithLegend from "./DoughnutChart";
import { spendingsTotals } from "./JSON_exemples";

function HomePageChart() {
    const [timePeriod, setTimePeriod] = useState('m')
    const [chartData, setChartData] = useState(spendingsTotals);

    const handleTimePeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTimePeriod(event.target.value);
    }

    const doughnutChartProps = {
        style: {
            chart: 'home-chart',
            legend: 'home-chart-legend',
            element: 'home-chart-legend-element',
            key: 'home-chart-legend-key',
            label: 'home-chart-legend-label',
            value: 'home-chart-legend-value',
            doughnut: 'home-chart-doughnut'
        },
        data: chartData,
    }

    return (
        <div className='home-chart-container'>
            <div className="home-chart-top">
                <p>Spendings</p>
                <select name="time-period" id="home-page-select" defaultValue={timePeriod} onChange={handleTimePeriodChange}>
                    <option value="1w">Last week</option>
                    <option value="2w">Last 2 weeks</option>
                    <option value="m">Last month</option>
                    <option value="3m">Last 3 months</option>
                    <option value="6m">Last 6 months</option>
                    <option value="y">Last year</option>
                    <option value="2y">Last 2 years</option>
                    <option value="all">All time</option>
                </select>
            </div>
            <DoughnutChartWithLegend {...doughnutChartProps}/>
        </div>
    )
}

export default HomePageChart;