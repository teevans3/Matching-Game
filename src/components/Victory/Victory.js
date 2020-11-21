import React from "react";
import classes from "./Victory.module.css";

const Victory = (props) => {
  const highscore = localStorage.getItem(props.difficulty);
  let victoryMessage = "";

  if (parseInt(highscore) > props.time) {
    victoryMessage = `Congrats! Your score was ${props.displayScore(
      props.time
    )}. You beat your highscore of ${props.displayScore(parseInt(highscore))}.`;
  } else {
    victoryMessage = `Your score was ${props.displayScore(
      props.time
    )}. Your current highscore is ${props.displayScore(parseInt(highscore))}.`;
  }

  return (
    <div>
      <h1>Victory!</h1>
      <p>{victoryMessage}</p>
      <button onClick={props.playAgain} className={classes.PlayAgain}>
        PLAY AGAIN
      </button>
    </div>
  );
};

export default Victory;
