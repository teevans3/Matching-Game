import React from "react";
import classes from "./Card.module.css";

const Card = (props) => {
  let cardContainer = null;
  let cardImage = null;
  if (props.difficulty === "easy") {
    cardContainer = classes.easyCardContainer;
    cardImage = classes.easyCardImage;
  }
  if (props.difficulty === "medium") {
    cardContainer = classes.mediumCardContainer;
    cardImage = classes.mediumCardImage;
  }
  if (props.difficulty === "hard") {
    cardContainer = classes.hardCardContainer;
    cardImage = classes.hardCardImage;
  }
  if (props.matched) {
    return (
      <div className={cardContainer}>
        <div className={classes.Card + classes.Matched}></div>
      </div>
    );
  }
  if (props.visible) {
    return (
      <div className={cardContainer}>
        <div className={classes.Card + " " + classes.Visible}>
          <img src={props.image} className={cardImage} />
        </div>
      </div>
    );
  } else {
    return (
      <div className={cardContainer}>
        <div
          className={classes.Card}
          onClick={() => props.revealCard(props.image, props.cardId)}
        ></div>
      </div>
    );
  }
};

export default Card;
