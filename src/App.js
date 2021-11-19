import React, { useState } from "react";
//const fetch = require("node-fetch");
import fetch from "node-fetch";

import "./index.css";

const App = () => {
  const [imageUrls, setImageUrls] = useState([
    "https://c1.scryfall.com/file/scryfall-cards/large/front/1/8/184a196e-8604-49d2-a66a-6f7c0eafd5de.jpg?1592517973",
  ]);
  const [cardName, setCardName] = useState();
  const findCard = async () => {
    console.log(`Searching for card: ${cardName}`);
    let newUrls = [];
    const response = await fetch(
      `https://api.magicthegathering.io/v1/cards?name=${cardName}`
    );
    const res = await response.json();
    console.log(res);
    if (res.cards.length === 0) {
      alert(`No cards found with name ${cardName}`);
      return;
    }
    for (let i = 0; i < res.cards.length; i++) {
      if (res.cards[i].imageUrl) newUrls.push(res.cards[i].imageUrl);
    }
    setImageUrls(newUrls);
  };

  return (
    <>
      <div>
        <input
          type="text"
          name=""
          id=""
          className="card-name-input"
          onChange={(event) => {
            setCardName(event.target.value);
          }}
        />
        <button onClick={findCard}>find</button>
      </div>
      {imageUrls.map((url) => {
        return (
          <img
            src={url}
            width="200"
            height="300"
            className="card-image"
            alt=""
            key={url}
          />
        );
      })}
    </>
  );
};

export default App;
