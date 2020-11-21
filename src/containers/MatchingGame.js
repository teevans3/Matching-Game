import React, { Component } from "react";
import Card from "../components/Cards/Card";
import GameOptions from "../components/GameOptions/GameOptions";
import Victory from "../components/Victory/Victory";
import classes from "./MatchingGame.module.css";
import { easyImages, mediumImages, hardImages } from "../assets/imagesList";
import ReactCardFlip from "react-card-flip";

let scoreTimer = 0;

class MatchingGame extends Component {
  state = {
    start: false,
    timer: 0,
    difficulty: "easy",
    matches: 8,
    images: this.onShuffleImages(easyImages),
    visibleCard: null,
    secondVisibleCard: null,
    lastCard: null,
    successfulMatches: []
  };

  onDisplayTimer(secs) {
    var hours = Math.floor(secs / 3600);
    var minutes = Math.floor((secs % 3600) / 60);
    var seconds = Math.floor((secs % 3600) % 60);

    var hoursDisplay =
      hours > 0 ? hours + (hours === 1 ? " hour, " : " hours, ") : "";
    var minutesDisplay =
      minutes > 0 ? minutes + (minutes === 1 ? " minute, " : " minutes, ") : "";
    var secondsDisplay =
      seconds > 0 ? seconds + (seconds === 1 ? " second" : " seconds") : "";
    return hoursDisplay + minutesDisplay + secondsDisplay;
  }

  onStartTimer(start) {
    if (start) {
      scoreTimer = setInterval(() => {
        this.setState({ timer: this.state.timer + 1 });
      }, 1000);
    } else {
      clearInterval(scoreTimer);
    }
  }

  onShuffleImages(imagesList) {
    var i = imagesList.length;
    while (--i) {
      var j = Math.floor(Math.random() * (i + 1)); // j = 11
      var tempi = imagesList[i];
      var tempj = imagesList[j];
      imagesList[i] = tempj;
      imagesList[j] = tempi;
    }
    return imagesList;
  }

  saveHighscoreToStorage = (difficulty, score) => {
    if (localStorage.getItem(difficulty) === null) {
      localStorage.setItem(difficulty, score);
    } else {
      if (localStorage.getItem(difficulty) > score) {
        localStorage.setItem(difficulty, score);
      }
    }
  };

  onChangeDifficulty = (difficulty) => {
    // don't let user change difficulty if game has started!
    if (this.state.start) {
      return;
    }
    if (difficulty === "easy") {
      this.setState({
        difficulty: "easy",
        matches: 8,
        images: this.onShuffleImages(easyImages)
      });
    }
    if (difficulty === "medium") {
      this.setState({
        difficulty: "medium",
        matches: 18,
        images: this.onShuffleImages(mediumImages)
      });
    }
    if (difficulty === "hard") {
      this.setState({
        difficulty: "hard",
        matches: 32,
        images: this.onShuffleImages(hardImages)
      });
    }
  };

  onCardClick = (image, cardId) => {
    // Start timer when first card is clicked
    if (!this.state.start) {
      this.setState({ start: true }, () => this.onStartTimer(true));
    }
    // Don't let user click the same card again.
    if (cardId === this.state.visibleCard) {
      return;
    }
    // Don't let user click a 3rd card if game is comparing two cards (1 second timer)
    if (this.state.visibleCard && this.state.secondVisibleCard) {
      return;
    }
    if (this.state.lastCard !== null) {
      this.setState({ secondVisibleCard: cardId }, () => {
        if (image === this.state.lastCard) {
          setTimeout(() => {
            this.setState({
              visibleCard: null,
              secondVisibleCard: null,
              lastCard: null,
              successfulMatches: this.state.successfulMatches.concat(image)
            });
          }, 1000);
        } else {
          setTimeout(() => {
            this.setState({
              visibleCard: null,
              secondVisibleCard: null,
              lastCard: null
            });
          }, 1000);
        }
      });
    } else {
      this.setState({
        visibleCard: cardId,
        lastCard: image
      });
    }
  };

  onRestartGame = () => {
    let imagesList = [];
    if (this.state.difficulty === "easy") {
      imagesList = this.onShuffleImages(easyImages);
    }
    if (this.state.difficulty === "medium") {
      imagesList = this.onShuffleImages(mediumImages);
    }
    if (this.state.difficulty === "hard") {
      imagesList = this.onShuffleImages(hardImages);
    }
    this.setState({
      start: false,
      timer: 0,
      images: imagesList,
      visibleCard: null,
      secondVisibleCard: null,
      lastCard: null,
      successfulMatches: []
    });
  };

  render() {
    let cards = this.state.images.map((image, index) => {
      // if index of this card is equal to visibleCard, display card
      let visibility = false;
      if (
        index === this.state.visibleCard ||
        index === this.state.secondVisibleCard
      ) {
        visibility = true;
      }
      // if image is in successfulMatches, hide card
      let matchedImage = false;
      if (this.state.successfulMatches.includes(image)) {
        matchedImage = true;
      }
      return (
        <Card
          key={index}
          image={image}
          revealCard={this.onCardClick}
          cardId={index}
          visible={visibility}
          matched={matchedImage}
          difficulty={this.state.difficulty}
        />
      );
    });
    // if user has successfully matched all cards, display victory message
    let gameDisplay = (
      <div>
        <GameOptions
          started={this.state.start}
          difficulty={this.state.difficulty}
          difficultyChange={this.onChangeDifficulty}
          timer={this.onDisplayTimer(this.state.timer)}
        />
        <div className={classes.CardsContainer}>{cards}</div>
      </div>
    );
    if (this.state.successfulMatches.length === this.state.matches) {
      this.onStartTimer(false);
      this.saveHighscoreToStorage(this.state.difficulty, this.state.timer);
      gameDisplay = (
        <Victory
          playAgain={this.onRestartGame}
          displayScore={this.onDisplayTimer}
          time={this.state.timer}
          difficulty={this.state.difficulty}
        />
      );
    }

    return <div className={classes.GameWrapper}>{gameDisplay}</div>;
  }
}

export default MatchingGame;
