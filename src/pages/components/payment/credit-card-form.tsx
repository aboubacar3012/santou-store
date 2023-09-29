import React, { useState } from "react";

const CreditCardForm = () => {
  const [cardholder, setCardholder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiredMonth, setExpiredMonth] = useState("");
  const [expiredYear, setExpiredYear] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [card, setCard] = useState("front");

  const formatCardNumber = (input: string) => {
    if (input.length > 18) {
      return;
    }
    setCardNumber(input.replace(/\W/gi, "").replace(/(.{4})/g, "$1 "));
  };

  const isValid = () => {
    if (cardholder.length < 5) {
      return false;
    }
    if (cardNumber === "") {
      return false;
    }
    if (expiredMonth === "" && expiredYear === "") {
      return false;
    }
    if (securityCode.length !== 3) {
      return false;
    }
    return true;
  };

  const onSubmit = () => {
    alert(`You did it ${cardholder}.`);
  };

  return (
    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
      <div className="credit-card w-full sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
        <header className="flex flex-col justify-center items-center">
          <div
            className="relative"
            style={{
              display: card === "front" ? "block" : "none",
              transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
              opacity: card === "front" ? 1 : 0,
              transform: card === "front" ? "scale(1)" : "scale(0.9)",
            }}
          >
            <img
              className="w-full h-auto"
              src="https://www.computop-paygate.com/Templates/imagesaboutYou_desktop/images/svg-cards/card-visa-front.png"
              alt="front credit card"
            />
            <div className="front bg-transparent text-lg w-full text-white px-12 absolute left-0 bottom-12">
              <p className="number mb-5 sm:text-xl">
                {cardNumber !== "" ? cardNumber : "0000 0000 0000 0000"}
              </p>
              <div className="flex flex-row justify-between">
                <p>
                  {cardholder !== ""
                    ? cardholder
                    : "Nom du titulaire de la carte"}
                </p>
                <div>
                  <span>{expiredMonth}</span>
                  {expiredMonth !== "" && <span>/</span>}
                  <span>{expiredYear}</span>
                </div>
              </div>
            </div>
          </div>
          <div
            className="relative"
            style={{
              display: card === "back" ? "block" : "none",
              transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
              opacity: card === "back" ? 1 : 0,
              transform: card === "back" ? "scale(1)" : "scale(0.9)",
            }}
          >
            <img
              className="w-full h-auto"
              src="https://www.computop-paygate.com/Templates/imagesaboutYou_desktop/images/svg-cards/card-visa-back.png"
              alt=""
            />
            <div className="bg-transparent text-white text-xl w-full flex justify-end absolute bottom-20 px-8 sm:bottom-24 right-0 sm:px-12">
              <div className="border border-white w-16 h-9 flex justify-center items-center">
                <p>{securityCode !== "" ? securityCode : "code"}</p>
              </div>
            </div>
          </div>
          <ul className="flex">
            <li className="mx-2">
              <img
                className="w-16"
                src="https://www.computop-paygate.com/Templates/imagesaboutYou_desktop/images/computop.png"
                alt=""
              />
            </li>
            <li className="mx-2">
              <img
                className="w-14"
                src="https://www.computop-paygate.com/Templates/imagesaboutYou_desktop/images/verified-by-visa.png"
                alt=""
              />
            </li>
            <li className="ml-5">
              <img
                className="w-7"
                src="https://www.computop-paygate.com/Templates/imagesaboutYou_desktop/images/mastercard-id-check.png"
                alt=""
              />
            </li>
          </ul>
        </header>
        <main className="mt-2 p-4">
          <div className="">
            <div className="my-3">
              <input
                type="text"
                className="block w-full px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
                placeholder="Nom du titulaire de la carte"
                maxLength={parseInt("22")}
                value={cardholder}
                onChange={(e) => setCardholder(e.target.value)}
              />
            </div>
            <div className="my-3">
              <input
                type="text"
                className="block w-full px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
                placeholder="Numéro de carte"
                value={cardNumber}
                onChange={(e) => {
                  formatCardNumber(e.target.value);
                }}
                onKeyDown={() => formatCardNumber(cardNumber)}
                onKeyUp={() => isValid()}
                maxLength={parseInt("19")}
              />
            </div>
            <div className="my-3 flex flex-col">
              <div className="mb-2">
                <label className="text-gray-700">Date d&apos;expiration</label>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <select
                  name=""
                  id=""
                  className="form-select appearance-none block w-full px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
                  value={expiredMonth}
                  onChange={(e) => setExpiredMonth(e.target.value)}
                >
                  <option value="" disabled>
                    MM
                  </option>
                  <option value="01">01</option>
                  <option value="02">02</option>
                  <option value="03">03</option>
                  <option value="04">04</option>
                  <option value="05">05</option>
                  <option value="06">06</option>
                  <option value="07">07</option>
                  <option value="08">08</option>
                  <option value="09">09</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
                <select
                  name=""
                  id=""
                  className="form-select appearance-none block w-full px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
                  value={expiredYear}
                  onChange={(e) => setExpiredYear(e.target.value)}
                >
                  <option value="" disabled>
                    YYYY
                  </option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                </select>
                <input
                  type="text"
                  className="block w-full col-span-2 px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
                  placeholder="CVC"
                  maxLength={parseInt("3")}
                  value={securityCode}
                  onFocus={() => setCard("back")}
                  onBlur={() => setCard("front")}
                  onChange={(e) => setSecurityCode(e.target.value)}
                />
              </div>
            </div>
          </div>
        </main>
        <footer className=" px-4">
          <button
            className={`submit-button px-4 py-3 rounded-full ${
              !isValid()
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-300 hover:bg-blue-400"
            } text-blue-900 focus:ring focus:outline-none w-full text-xl font-semibold transition-colors`}
            onClick={onSubmit}
            disabled={!isValid()}
          >
            Terminer l&apos;achat
          </button>
        </footer>
      </div>
    </div>
  );
};

export default CreditCardForm;
