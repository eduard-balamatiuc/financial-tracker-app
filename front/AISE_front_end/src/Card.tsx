interface CardProps {
  bankName: string;
  balance: number;
  currency: string;
  number: number;
  type: string;
}

function Card({ bankName, balance, currency, number, type }: CardProps) {
  const cardTypeImage = () => {
    switch (type) {
      case "visa":
        return "/visa.png";
      case "mastercard":
        return "/mastercard.png";
      case "amex":
        return "/amex.png";
    }
  };

  return (
    <div className="card">
      <p>{bankName}</p>
      <div>
        <p className="card-balance">Balance:</p>
        <p className="card-balance-amount">{balance + " " + currency}</p>
      </div>
      <div className="card-lower-part">
        <p>{number}</p>
        <img src={cardTypeImage()} />
      </div>
    </div>
  );
}

export default Card;
