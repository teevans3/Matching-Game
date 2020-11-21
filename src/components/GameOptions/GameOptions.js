import React from "react";
import classes from "./GameOptions.module.css";

const GameOptions = (props) => {
  if (props.started) {
    return <div className={classes.GameTimer}>{props.timer}</div>;
  } else {
    return (
      <div className={classes.GameDifficulty}>
        <button
          onClick={() => props.difficultyChange("easy")}
          className={
            props.difficulty === "easy" ? classes.ActiveBtn : classes.Btn
          }
        >
          EASY
        </button>
        <button
          onClick={() => props.difficultyChange("medium")}
          className={
            props.difficulty === "medium" ? classes.ActiveBtn : classes.Btn
          }
        >
          MEDIUM
        </button>
        <button
          onClick={() => props.difficultyChange("hard")}
          className={
            props.difficulty === "hard" ? classes.ActiveBtn : classes.Btn
          }
        >
          HARD
        </button>
      </div>
    );
  }
};

export default GameOptions;
