import Income from "./Income";
import IncomeAndSpendings from "./IncomeAndSpendings";
import Savings from "./Savings";
import Spendings from "./Spendings";

function StatisticsPage() {
  return (
    <>
    <p className="page-name">Statistics</p>
     <div className="statistics-page">
        <Spendings/>
        <Income/>
        <IncomeAndSpendings/>
        <Savings/>
    </div>
    </>
  );
}

export default StatisticsPage;