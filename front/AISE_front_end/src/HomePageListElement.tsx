interface MainPageListElementProps {
  date: string;
  category: string;
  amount: number;
  currency: string;
  type: boolean;
}

function HomePageListElement({
  date,
  category,
  amount,
  currency,
  type,
}: MainPageListElementProps) {
  const checkAmountType = type ? " positive" : " negative";

  return (
    <div className="home-page-list-element">
      <p>{date}</p>
      <p>{category}</p>
      <p className={checkAmountType}>{amount}</p>
      <p>{currency}</p>
    </div>
  );
}

export default HomePageListElement;
