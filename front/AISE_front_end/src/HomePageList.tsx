import "./HomePageListElement";
import HomePageListElement from "./HomePageListElement";
import { list_json } from "./JSON_exemples";

function HomePageList() {
  const spendings = list_json;
  return (
    <div className="home-page-list-container">
      <div className="home-page-list-top-part">
        <p>Date</p>
        <p>Category</p>
        <p>Amount</p>
      </div>
      <div className="home-page-list">
        {spendings.map((item) => (
          <HomePageListElement
            date={item.date}
            category={item.category}
            amount={item.amount}
            currency={item.currency}
            type={item.type}
            key={item.id}
          />
        ))}
      </div>
    </div>
  );
}

export default HomePageList;
