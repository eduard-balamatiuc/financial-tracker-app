interface HistoryPageListElementProps {
  id: number;
  date: string;
  method: string;
  category: string;
  description: string;
  amount: number;
  currency: string;
  type: boolean;
  onDelete: (id: number) => void;
}

function HistoryPageListElement(props: HistoryPageListElementProps) {
  const handleDelete = () => {
    props.onDelete(props.id);
    console.log("Deleting element with id: " + props.id);
  };

  const checkAmountType = props.type ? " positive" : " negative";

  return (
    <div className="history-page-list-element">
      <p className="history-page-list-date">{props.date}</p>
      <p className="history-page-list-method">{props.method}</p>
      <p className="history-page-list-category">{props.category}</p>
      <p className="history-page-list-description">{props.description}</p>
      <p className={"history-page-list-amount" + checkAmountType}>
        {props.amount}
      </p>
      <p className="history-page-list-currency">{props.currency}</p>
      <button onClick={handleDelete}>
        <img src="/VectorDelete.png" alt="del" />
      </button>
    </div>
  );
}

export default HistoryPageListElement;
