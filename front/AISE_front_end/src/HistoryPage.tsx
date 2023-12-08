import { useState } from "react";
import HistoryPageListElement from "./HistoryPageListElement";
import HistoryPageRecordAdd from "./HistoryPageRecordAdd";
import { list_json } from "./JSON_exemples";

function HistoryPage() {
  const [historyList, setHistoryList] = useState(list_json);
  const [timePeriod, setTimePeriod] = useState("m");

  const handleTimePeriodChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setTimePeriod(event.target.value);
  };

  const handleDelete = (id: number) => {
    const updatedList = historyList.filter((element) => element.id !== id);
    setHistoryList(updatedList);
  };

  const handleAdd = (record: {
    id: number;
    date: string;
    method: string;
    category: string;
    description: string;
    amount: number;
    currency: string;
    type: boolean;
  }) => {
    const updatedList = historyList.concat(record);
    setHistoryList(updatedList);
  };

  return (
    <div className="history-page">
      <div className="history-page-top">
        <h1 className="page-name">History</h1>
        <select
          name="time-perion"
          id="history-page-select"
          value={timePeriod}
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
      <div className="history-page-list-container">
        <div className="history-page-list-top-part">
          <p className="history-page-list-date">Date</p>
          <p className="history-page-list-method">Payment method</p>
          <p className="history-page-list-category">Category</p>
          <p className="history-page-list-description">Description</p>
          <p className="history-page-list-amount-top">Amount</p>
        </div>
        <div className="history-page-list">
          {historyList.map((element) => (
            <HistoryPageListElement
              id={element.id}
              date={element.date}
              method={element.method}
              category={element.category}
              description={element.description}
              amount={element.amount}
              currency={element.currency}
              type={element.type}
              key={element.id}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
      <HistoryPageRecordAdd onAdd={handleAdd} />
    </div>
  );
}

export default HistoryPage;
