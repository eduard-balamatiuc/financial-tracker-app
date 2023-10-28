import "./HomePageListElement"
import HomePageListElement from "./HomePageListElement";
import { list_json } from "./JSON_exemples";

function HomePageList() {
    const spendings = list_json;
    return (
        <div className="home-list-container">
            <div className="home-list-top-part">
                <p className="home-side-column">Date</p>
                <p className="home-center-column">Category</p>
                <p className="home-side-column">Amount</p>
            </div>
            <div className="home-list">
                {spendings.map(item => (
                <HomePageListElement date={item.date} category={item.category} amount={item.amount} currency={item.currency} type={item.type} key={item.id}/>
                ))}
            </div>
        </div>
    )
}

export default HomePageList;