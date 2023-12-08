import Income from "./Income";
import IncomeAndSpendings from "./IncomeAndSpendings";
import Savings from "./Savings";
import Spendings from "./Spendings";

function StatisticsPage() {
  return (
    <div className="statistics-page">
      <h1 className="page-name">Statistics</h1>
      <div className="statistics-page-elements">
        <Spendings />
        <Income />
        <IncomeAndSpendings />
        <Savings />
      </div>
    </div>
  );
}

export default StatisticsPage;
