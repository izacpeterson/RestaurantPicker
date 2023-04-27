"use client";
import { db } from "@/app/functions/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
export default function Results({ params }) {
  const [gameState, setGameState] = useState(<h2>Waiting For Everyone to finish</h2>);
  const [gameResults, setGameResults] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "games", params.id), (doc) => {
      console.log("Current data: ", doc.data());
      if (doc.data().player2.length == 0) {
        setGameState(<h2>Waiting For Everyone to finish</h2>);
      } else {
        let results = [];

        let player1 = doc.data().player1;
        let player2 = doc.data().player2;

        player1.forEach((item1) => {
          player2.forEach((item2) => {
            if (item1.place_id === item2.place_id && item1.name === item2.name) {
              results.push(item1);
            }
          });
        });

        setGameResults(results);

        results = results.map((item) => {
          return (
            <div key={item.name} className="p-2">
              {item.name}
            </div>
          );
        });

        setGameState(<ul className="flex flex-col items-center">{results}</ul>);
      }
    });
  }, []);

  function pickForMe() {
    //pick a random item from gameResults
    let randomIndex = Math.floor(Math.random() * gameResults.length);
    let randomItem = gameResults[randomIndex];
    console.log(randomItem);
    alert(randomItem.name);
  }

  return (
    <main className="flex flex-col items-center">
      <h2 className="text-xl underline p-2">Results</h2>
      {gameState}
      <p className="pt-10">Still not sure?</p>
      <button
        onClick={() => {
          pickForMe();
        }}
        className="btn btn-primary m-4"
      >
        Pick for me
      </button>
    </main>
  );
}
