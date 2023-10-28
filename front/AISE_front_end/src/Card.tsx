interface CardProps {
    bankName: string,
    balance: number,
    currency: string,
    number: number,
    type: string,
}

function Card({bankName, balance, currency, number, type}: CardProps) {
    const cardTypeImage = () => {
        switch (type) {
            case "visa": return "src/assets/visa.png"
            case "mastercard": return "src/assets/mastercard.png"
            case "amex": return "src/assets/amex.png"
        }
    }


    return (
        <div className="card">
            <p className="card-bank-name">{bankName}</p>
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