import { useState } from "react";
import { spendingCategories, methods } from "./JSON_exemples";

interface HistoryPageRecordAddProps {
  onAdd: (record: any) => void;
}

function HistoryPageRecordAdd({ onAdd }: HistoryPageRecordAddProps) {
  const paymentMethods = methods;
  const categories = spendingCategories;

  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [method, setMethod] = useState("null");
  const [category, setCategory] = useState("null");
  const [description, setDescription] = useState("");
  const [currency, setCurrency] = useState("Lei");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      amount &&
      method &&
      description &&
      category != "null" &&
      method != "null"
    ) {
      const record = {
        id: Math.floor(Math.random() * 1000000), // TODO: delete this after connecting to backend
        date: new Date(date).toLocaleDateString("en-GB"),
        method: method,
        category: category,
        description: description,
        amount: parseInt(amount),
        currency: currency,
        type: categories.find((element) => element.category === category)?.type, // TODO: delete this after connecting to backend
      };
      setDate(new Date().toISOString().split("T")[0]);
      setDescription("");
      setAmount("");
      setCurrency("Lei");
      onAdd(record);
    }
  };

  const handleCurrencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCurrency(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCategory(event.target.value);
  };

  const handleMethodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMethod(event.target.value);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    if (/^\d*$/.test(input)) {
      setAmount(input);
    }
  };

  const styleSelect = (string: string) => {
    if (string === "null") {
      return "inactive-slect";
    } else {
      return "active-slect";
    }
  };
  return (
    <form onSubmit={handleSubmit} className="history-page-record-add">
      <div className="history-page-list-date">
        <input type="date" id="date" onChange={handleDateChange} />
      </div>
      <select
        name="paymentMethod"
        id="method"
        value={method}
        onChange={handleMethodChange}
        className={"history-page-list-method " + styleSelect(method)}
      >
        <option value="null" disabled>
          Method
        </option>
        {paymentMethods.map((method) => (
          <option value={method.method} key={method.id}>
            {method.method}
          </option>
        ))}
      </select>
      <select
        name="spendingCategory"
        id="category"
        value={category}
        onChange={handleCategoryChange}
        className={"history-page-list-category " + styleSelect(category)}
      >
        <option value="null" disabled>
          Category
        </option>
        {categories.map((category) => (
          <option value={category.category} key={category.id}>
            {category.category}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Description"
        id="description"
        value={description}
        onChange={handleDescriptionChange}
        maxLength={25}
        className="history-page-list-description"
      />
      <input
        type="text"
        placeholder="Amount"
        id="amount"
        value={amount}
        onChange={handleAmountChange}
        maxLength={8}
        minLength={1}
        className="history-page-list-amount"
      />
      <select
        name="currency"
        id="currency"
        defaultValue={"Lei"}
        onChange={handleCurrencyChange}
        className="history-page-list-currency"
      >
        <option value="Lei">Lei</option>
        <option value="€">€</option>
        <option value="$">$</option>
      </select>
      <button type="submit">
        <img src="/VectorAdd.png" alt="add" />
      </button>
    </form>
  );
}

export default HistoryPageRecordAdd;
