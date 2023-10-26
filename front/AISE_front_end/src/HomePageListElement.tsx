interface MainPageListElementProps {
    date: string,
    category: string,
    amount: number,
    currency: string,
    type: boolean
}

function HomePageListElement({date, category, amount, currency, type}: MainPageListElementProps) {
    const checkAmountType = type ? " positive" : " negative";

    return (
        <div className="home-list-element">
            <p className="home-date">{date}</p>
            <p className="home-category">{category}</p>
            <p className={"home-amount" + checkAmountType}>{amount}</p>
            <p className="home-currency">{currency}</p>
        </div>
    )
}

export default HomePageListElement;