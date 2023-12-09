import { useState } from "react";

interface CardAddProps {
  addCard: (card: any) => void;
}

function CardAdd({ addCard }: CardAddProps) {
  const [bankName, setBankName] = useState("");
  const [balance, setBalance] = useState("");
  const [currency, setCurrency] = useState("lei");
  const [number, setNumber] = useState("");
  const [type, setType] = useState("mastercard");

  const handleBankName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    if (input.length <= 20) {
      setBankName(input);
    }
  };

  const handleBalance = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    if (/^\d*$/.test(input) && input.length <= 10) {
      setBalance(input);
    }
  };

  const handleCurrency = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(event.target.value);
  };

  const handleNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    if (/^\d*$/.test(input) && input.length <= 4) {
      setNumber(input);
    }
  };

  const handleType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setType(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (bankName && balance && currency && number && type) {
      const card = {
        bank: bankName,
        balance: parseInt(balance),
        currency: currency,
        number: number,
        type: type,
      };
      addCard(card);
      console.log(card);
      setBankName("");
      setBalance("");
      setCurrency("Lei");
      setNumber("");
      setType("mastercard");
    }
  };

  return (
    <form className="card card-add" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Bank"
        value={bankName}
        onChange={handleBankName}
      />
      <div>
        <input
          type="text"
          placeholder="Balance"
          value={balance}
          onChange={handleBalance}
        />
        <select
          name="currency"
          id="currency"
          defaultValue={"lei"}
          onChange={handleCurrency}
        >
          <option value="lei">Lei</option>
          <option value="€">€</option>
          <option value="$">$</option>
        </select>
        <button type="submit">
          <img src="/VectorCardAdd.png" />
        </button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Last 4 digits"
          value={number}
          onChange={handleNumber}
        />
        <select
          name="card-type"
          id="card-type-select"
          defaultValue={"mastercard"}
          onChange={handleType}
        >
          <option value="mastercard">Mastercard</option>
          <option value="visa">Visa</option>
          <option value="amex">Amex</option>
        </select>
      </div>
    </form>
  );
}

export default CardAdd;
