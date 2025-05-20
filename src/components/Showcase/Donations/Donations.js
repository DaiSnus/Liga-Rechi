import React, { useState } from "react"
import "./Donations.css"

const Donations = () => {
  const [donationAmount, setDonationAmount] = useState(500)
  const [customAmount, setCustomAmount] = useState("")
  const [showDonationForm, setShowDonationForm] = useState(false)

  const donationsData = {
    enabled: true,
    title: "Поддержите нас",
    description:
      "Ваши пожертвования помогают нам организовывать бесплатные мероприятия, развивать сообщество и делать ораторское искусство доступным для всех. Мы благодарны за любую поддержку!",
    paymentDetails: {
      accountNumber: "40817810099910004312",
      bankName: "Сбербанк",
      recipientName: 'Фонд развития ораторского искусства "Лига Речи"'
    },
    predefinedAmounts: [100, 500, 1000, 2000]
  }

  if (!donationsData.enabled) {
    return null
  }

  const handleAmountClick = (amount) => {
    setDonationAmount(amount)
    setCustomAmount("")
  }

  const handleCustomAmountChange = (e) => {
    const value = e.target.value
    if (value === "" || /^\d+$/.test(value)) {
      setCustomAmount(value)
      if (value !== "") {
        setDonationAmount(Number.parseInt(value, 10))
      }
    }
  }

  const handleDonateClick = () => {
    setShowDonationForm(true)
  }

  const handleDonationSubmit = (e) => {
    e.preventDefault()
    alert(`Спасибо за ваше пожертвование в размере ${donationAmount} ₽!`)
    setShowDonationForm(false)
  }

  return (
    <section className="donations-section">
      <div className="container">
        <h2 className="section-title">{donationsData.title}</h2>
        <p className="section-subtitle">{donationsData.description}</p>

        <div className="donation-container">
          <div className="donation-amounts">
            {donationsData.predefinedAmounts.map((amount) => (
              <button
                key={amount}
                className={`amount-button ${donationAmount === amount ? "active" : ""}`}
                onClick={() => handleAmountClick(amount)}
              >
                {amount} ₽
              </button>
            ))}

            <div className="custom-amount">
              <input type="text" placeholder="Другая сумма" value={customAmount} onChange={handleCustomAmountChange} />
              <span className="currency">₽</span>
            </div>
          </div>

          <button className="donate-button" onClick={handleDonateClick}>
            Донатить
          </button>

          <div className="payment-details">
            <h3>Реквизиты для перевода:</h3>
            <p>
              <strong>Получатель:</strong> {donationsData.paymentDetails.recipientName}
            </p>
            <p>
              <strong>Номер счета:</strong> {donationsData.paymentDetails.accountNumber}
            </p>
            <p>
              <strong>Банк:</strong> {donationsData.paymentDetails.bankName}
            </p>
          </div>
        </div>
      </div>

      {showDonationForm && (
        <div className="modal-overlay" onClick={() => setShowDonationForm(false)}>
          <div className="donation-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setShowDonationForm(false)}>
              &times;
            </button>

            <h2>Пожертвование</h2>
            <p>
              Сумма: <strong>{donationAmount} ₽</strong>
            </p>

            <form onSubmit={handleDonationSubmit}>
              <div className="form-group">
                <label htmlFor="name">Имя</label>
                <input type="text" id="name" required />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" required />
              </div>

              <div className="form-group">
                <label htmlFor="card">Номер карты</label>
                <input type="text" id="card" placeholder="0000 0000 0000 0000" required />
              </div>

              <div className="card-details">
                <div className="form-group">
                  <label htmlFor="expiry">Срок действия</label>
                  <input type="text" id="expiry" placeholder="ММ/ГГ" required />
                </div>

                <div className="form-group">
                  <label htmlFor="cvv">CVV</label>
                  <input type="text" id="cvv" placeholder="123" required />
                </div>
              </div>

              <button type="submit" className="submit-button">
                Подтвердить
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}

export default Donations
