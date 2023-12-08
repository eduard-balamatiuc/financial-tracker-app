import { useState } from "react";
import DoughnutChartWithLegend from "./DoughnutChart";
import { spendingsTotals } from "./JSON_exemples";

function Spendings() {
  const [timePeriod, setTimePeriod] = useState("m");
  const chartData = spendingsTotals;

  const handleTimePeriodChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setTimePeriod(event.target.value);
  };

  const doughnutChartProps = {
    style: {
      chart: "statistics-page-doughnut-chart",
      legend: "statistics-page-doughnut-chart-legend",
      element: "statistics-page-doughnut-chart-legend-element",
      key: "statistics-page-doughnut-chart-legend-key",
      label: "statistics-page-doughnut-chart-legend-label",
      value: "statistics-page-doughnut-chart-legend-value",
      doughnut: "statistics-page-doughnut-chart-doughnut",
    },
    data: chartData,
  };

  return (
    <div className="statistics-page-element">
      <div className="statistics-page-top">
        <p>Spendings</p>
        <select
          name="time-period"
          id="spendings-select"
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

export default Spendings;
