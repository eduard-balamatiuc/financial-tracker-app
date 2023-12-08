import { basicInfo } from "./JSON_exemples";

function Basics() {
  const icon = {
    balance: "/VectorBalance.png",
    savings: "/VectorSavings.png",
    income: "/VectorIncome.png",
    spendings: "/VectorSpendings.png",
  };
  const info = basicInfo;

  return (
    <div className="basics">
      {info.map((item, index) => (
        <div className="basic-card" key={index}>
          <img
            className="basic-icon"
            src={icon[item.name as keyof typeof icon]}
            alt=""
          />
          <div>
            <h1>
              {item.name.charAt(0).toUpperCase() +
                item.name.slice(1) +
                ": " +
                item.amount}
            </h1>
            <p
              className={
                item.type ? "positive" : "basic-secondary-text negative"
              }
            >
              {(item.type ? "+" : "-") +
                " " +
                item.variation +
                "% from last month"}
            </p>
          </div>
          <img
            className="basic-trend"
            src={item.type ? "/VectorGood.png" : "/VectorBad.png"}
            alt=""
          />
        </div>
      ))}
    </div>
  );
}

export default Basics;
