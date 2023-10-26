import { basicInfo } from "./JSON_exemples";

function Basics() {
    const icon = {
        balance: "src/assets/VectorBalance.png",
        savings: "src/assets/VectorSavings.png",
        income: "src/assets/VectorIncome.png",
        spendings: "src/assets/VectorSpendings.png"
    }
    const info = basicInfo;


    return (
        <div className="basics-div">
            {info.map((item, index) => (
                <div className="basic-info-card" key={index}>
                    <div className="basic-icon-holder">
                        <img src={icon[item.name as keyof typeof icon]} alt=""/>
                    </div>
                    <div className="basic-text-holder">
                        <p className="basic-main-text">{item.name.charAt(0).toUpperCase() + item.name.slice(1) + ": " + item.amount}</p>
                        <p className={(item.type ? "basic-secondary-text positive" : "basic-secondary-text negative")}>{(item.type ? "+" : "-") + " " + item.variation + "% from last month"}</p>
                    </div>
                    <img src={(item.type ? "src/assets/VectorGood.png" : "src/assets/VectorBad.png")} alt="" />
                </div>
            ))}
        </div>
    )
}

export default Basics;