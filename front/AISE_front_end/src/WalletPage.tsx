import { useState } from "react";
import Card from "./Card";
import { walletContent } from "./JSON_exemples";
import CardAdd from "./CardAdd";

function WalletPage() {
  const [cash, setCash] = useState(walletContent[0]);
  const [cards, setCards] = useState(walletContent.slice(1));

  const [add, setAdd] = useState(false);

  const handleButton = () => {
    setAdd(!add);
  };

  const handleAdd = (card: any) => {
    console.log(card);
    setCards([...cards, card]);
    setAdd(false);
  };

  return (
    <div className="wallet-page">
      <h1 className="page-name">Wallet</h1>
      <div className="wallet">
        <div className="card">
          <p>Cash</p>
          <div>
            <p>Balance:</p>
            <p>{cash.balance}</p>
          </div>
        </div>
        {cards.map((info, index) => (
          <Card
            bankName={info.bank}
            balance={info.balance}
            currency={info.currency}
            number={info.number}
            type={info.type}
            key={index}
          />
        ))}
      </div>
      <button className="wallet-add" onClick={handleButton}>
        <img src="src/assets/VectorAdd.png" />
      </button>
      {add && <CardAdd addCard={handleAdd} />}
    </div>
  );
}

export default WalletPage;
