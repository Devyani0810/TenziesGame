import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [dice, setDice] = useState(generateNewDice());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld);
    const firstValue = dice[0].value;
    const allSame = dice.every(die => die.value === firstValue);
    if (allHeld && allSame) {
      setTenzies(true);
    }
  }, [dice]);


  function generateNewDice() {
    let newDice = [];

    for (let i = 0; i < 10; i++) {
      let singleDie = {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: i
      };

      newDice.push(singleDie);
    }
    return newDice;
  }


  function rollDice() {
    if (tenzies) {
      setTenzies(false);
      setDice(generateNewDice());
    } else {
      setDice(function (oldDice) {
        let newDice = [];
        for (let i = 0; i < oldDice.length; i++) {
          let die = oldDice[i];
          if (die.isHeld) {
            newDice.push(die);
          } else {
            newDice.push({
              value: Math.ceil(Math.random() * 6),
              isHeld: false,
              id: die.id
            });
          }
        }
        return newDice;
      });
    }
  }
  

  function holdDice(id) {
    setDice(function (oldDice) {
      let newDice = [];

      for (let i = 0; i < oldDice.length; i++) {
        let die = oldDice[i];
        if (die.id === id) {
          newDice.push({
            value: die.value,
            isHeld: !die.isHeld,
            id: die.id
          });
        } else {
          newDice.push(die);
        }
      }

      return newDice;
    });
  }
  


  let diceElements = [];
  for (let i = 0; i < dice.length; i++) {
    let die = dice[i];
    let className = "die";
    if (die.isHeld) {
      className += " held";
    }
    diceElements.push(
      <div
        key={die.id}
        className={className}
        onClick={function () {
          holdDice(die.id);
        }}
      >
        {die.value}
      </div>
    );
  }


  return (
    <main>
      {tenzies && <div className="confetti">🎉</div>}
      <h1>Tenzies</h1>
      <p>Roll until all dice are the same. Click each die to freeze it.</p>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-button" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;

