import { useState } from "react";
import { savings } from "./JSON_exemples";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
  scales: {
    x: {
      ticks: {
        color: "rgba(255, 255, 255, 1)",
      },
    },
    y: {
      grid: {
        color: "rgba(255, 255, 255, 1)",
      },
      ticks: {
        color: "rgba(255, 255, 255, 1)",
      },
    },
  },
};

function Savings() {
  const savingsData = savings.map((element) => element.amount);
  const [timePeriod, setTimePeriod] = useState("y");

  const handleTimePeriodChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setTimePeriod(event.target.value);
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "Octomber",
    "November",
    "December",
  ];
  const labels = savings.map((element) => months[parseInt(element.month) - 1]);

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Income",
        data: savingsData,
        borderColor: "rgba(7, 158, 13, 1)",
        backgroundColor: "rgba(7, 158, 13, 0.4)",
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="statistics-page-element">
      <div className="statistics-page-top">
        <p>Savings</p>
        <select
          name="time-period"
          id="savings-select"
          defaultValue={timePeriod}
          onChange={handleTimePeriodChange}
        >
          <option value="3m">Last 3 months</option>
          <option value="6m">Last 6 months</option>
          <option value="y">Last year</option>
          <option value="2y">Last 2 years</option>
          <option value="all">All time</option>
        </select>
      </div>
      <div className="statistics-page-line-graph">
        <Line options={options} data={data} />
      </div>
    </div>
  );
}

export default Savings;
