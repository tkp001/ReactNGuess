//References//
//https://react.dev/learn//
//https://react.dev/learn/thinking-in-react//
//https://react.dev/reference/react//

import "./App.css";
import { useState } from "react";

function CountButton({ title, onClick }) {
  return (
    <button className="box" onClick={onClick}>
      {title}
    </button>
  );
}

function Input({ guess, setGuess, maxGuess, minGuess, onSubmit }) {
  function handleCount(val) {
    if (guess > maxGuess - 1 && val == 1) {
      alert("Maximum Guess Reached");
    } else if (guess < minGuess + 1 && val == -1) {
      alert("Minimum Guess Reached");
    } else {
      setGuess(guess + val);
    }
  }

  return (
    <main>
      <div className="input">
        <div className="counter">
          <CountButton title="-" onClick={() => handleCount(-1)} />

          <h1 className="guess">{guess}</h1>

          <CountButton title="+" onClick={() => handleCount(1)} />
        </div>

        <button className="submit" onClick={onSubmit}>
          Submit Guess
        </button>
      </div>
      <br></br>
    </main>
  );
}

function Info({ tries, answer, lastGuess, hints }) {
  const hintItems = hints.map((hints) => (
    <li key={hints.id}>{hints.type + " than " + hints.guess}</li>
  ));

  return (
    <div className="info">
      <div className="hints">
        <h3>Hints</h3>
        <ul>{hintItems}</ul>
      </div>

      <div className="otherinfo">
        <h3>Statistics</h3>
        <p>{"tries: " + tries}</p>
        <h3>Debug</h3>
        <p>{"last guess: " + lastGuess}</p>
        <p>{"answer: " + answer}</p>
      </div>
    </div>
  );
}

function Game({ guessLength, setGame }) {
  const [guess, setGuess] = useState(0);
  const [lastGuess, setLastGuess] = useState(0);
  const [tries, setTries] = useState(3);
  const maxGuess = guessLength;
  const minGuess = 0;
  const [answer, setAnswer] = useState(
    Math.floor(Math.random() * maxGuess + 1),
  );
  const [hints, setHints] = useState([]);

  function addHint() {
    /* could use some review as it uses current guess to add an array, not lastGuess as it hasnt updated yet */
    let type;
    if (guess < answer) {
      type = "higher";
    } else {
      type = "lower";
    }

    const newHint = {
      type: type,
      guess: guess,
      id: hints.length + 1,
    };
    const updatedHints = [...hints, newHint];
    setHints(updatedHints);
  }

  function handleSubmit() {
    if (guess == answer) {
      alert("You Guessed The Number!");
      setGame(0);
    } else {
      alert("Wrong Guess");
      if (tries - 1 == 0) {
        alert("You Lose..");
        setGame(0);
      }

      setTries(tries - 1);
    }
    setLastGuess(guess);
    addHint();
  }

  return (
    <div className="game">
      <h1>Guess The Number!</h1>
      <Input
        guess={guess}
        setGuess={setGuess}
        maxGuess={maxGuess}
        minGuess={minGuess}
        onSubmit={handleSubmit}
      />
      <Info tries={tries} answer={answer} lastGuess={lastGuess} hints={hints} />
      <br></br>
    </div>
  );
}

function Homepage({ setGuessLength, setGame }) {
  function setupGame(len) {
    setGuessLength(len);
    setGame(1);
  }

  return (
    <div className="homepage">
      <h1>
        React Guessing Game!
        <img
          className="rimg"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/120px-React-icon.svg.png"
        ></img>
      </h1>

      <button onClick={() => setupGame(10)}>
        Play Default (Guess from 1-10)
      </button>
      <br></br>
      <button onClick={() => setupGame(20)}>
        Play Default (Guess from 1-20)
      </button>
      <br></br>
      <br></br>
    </div>
  );
}

export default function App() {
  const [game, setGame] = useState(0);
  const [guessLength, setGuessLength] = useState(0);

  if (game == 1) {
    return (
      <>
        <Game guessLength={guessLength} setGame={setGame} />
      </>
    );
  } else {
    return <Homepage setGuessLength={setGuessLength} setGame={setGame} />;
  }
}
