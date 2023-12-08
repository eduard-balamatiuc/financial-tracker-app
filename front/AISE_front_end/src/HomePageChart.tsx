import { useState } from "react";
import DoughnutChartWithLegend from "./DoughnutChart";
import { spendingsTotals } from "./JSON_exemples";

function HomePageChart() {
  const [timePeriod, setTimePeriod] = useState("m");
  const [chartData, setChartData] = useState(spendingsTotals);

  const handleTimePeriodChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setTimePeriod(event.target.value);
  };

  const doughnutChartProps = {
    style: {
      chart: "home-page-chart",
      legend: "home-page-chart-legend",
      element: "home-page-chart-legend-element",
      key: "home-page-chart-legend-key",
      label: "home-page-chart-legend-label",
      value: "home-page-chart-legend-value",
      doughnut: "home-page-chart-doughnut",
    },
    data: chartData,
  };

  return (
    <div className="home-page-chart-container">
      <div className="home-page-chart-top-part">
        <h1>Spendings</h1>
        <select
          name="time-period"
          id="home-page-select"
          defaultValue={timePeriod}
          onChange={handleTimePeriodChange}
        >
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
      <DoughnutChartWithLegend {...doughnutChartProps} />
    </div>
  );
}

export default HomePageChart;
