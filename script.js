const lettersArray = Array.from("abcdefghijklmnopqrstuvwxyz");
const lettersContainer = document.querySelector(".row .letters");
const lettersGuessElement = document.querySelector(".letters-guess");
const hangmanDraw = document.querySelector(".hangman-draw-wrapper");
let wrongAttempts = 0;

lettersArray.forEach((letter) => {
  const letterSpan = document.createElement("span");
  letterSpan.appendChild(document.createTextNode(letter));
  letterSpan.className = "letter-box";
  lettersContainer.append(letterSpan);
});

const words = {
  programming: [
    "PHP",
    "JavaScript",
    "Golang",
    "Scala",
    "Fortran",
    "R",
    "MySQL",
    "Python",
  ],
  movies: [
    "Prestige",
    "Inception",
    "Parasite",
    "Interstellar",
    "Whiplash",
    "Memento",
    "Coco",
    "Up",
  ],
  names: [
    "Albert Einstein",
    "Hitchcock",
    "Alexander The Great",
    "Cleopatra",
    "Mahatma Ghandi",
    "Nikola Tesla",
  ],
  countries: [
    "Syria",
    "Palestine",
    "Yemen",
    "Egypt",
    "Brazil",
    "Qatar",
    "United States",
    "United Kingdom",
    "United Arab Emirates",
  ],
  animals: [
    "Elephant",
    "Giraffe",
    "Kangaroo",
    "Penguin",
    "Dolphin",
    "Tiger",
    "Lion",
    "Zebra",
  ],
};

const wordsKeys = Object.keys(words);
const randomPropertyName =
  wordsKeys[Math.floor(Math.random() * wordsKeys.length)];
const randomPropertyValue = words[randomPropertyName];
const randomWord =
  randomPropertyValue[
    Math.floor(Math.random() * randomPropertyValue.length)
  ].toLowerCase();

document.querySelector(".category span").textContent = randomPropertyName;

const chosenWordArray = Array.from(randomWord);

console.log(chosenWordArray);

let guessSpansContainer = document.createElement("div");

chosenWordArray.forEach((letter) => {
  const letterSpan = document.createElement("span");
  if (letter === " ") {
    letterSpan.className = "space";
    lettersGuessElement.append(guessSpansContainer);
    lettersGuessElement.append(letterSpan);
    guessSpansContainer = document.createElement("div"); // Create a new div for next word section
  } else {
    guessSpansContainer.append(letterSpan);
  }
});

if (guessSpansContainer.children.length) {
  lettersGuessElement.append(guessSpansContainer);
}

const lettersGuessElements = document.querySelectorAll(".letters-guess span");

document.addEventListener("click", (e) => {
  let doesLetterExist = false;
  if (e.target.classList.contains("letter-box")) {
    e.target.classList.add("clicked");
    chosenWordArray.forEach((letter, index) => {
      if (e.target.textContent.toLowerCase() === letter) {
        doesLetterExist = true;
        document.getElementById("correct").play();
        lettersGuessElements[index].textContent = letter.toUpperCase();
        const guessedWord = [...lettersGuessElements]
          .map((span) => span.textContent)
          .join("")
          .toLowerCase();
        if (guessedWord === randomWord.replace(/\s/g, "")) {
          endGame();
        }
      }
    });
    if (!doesLetterExist) {
      wrongAttempts++;
      document.querySelectorAll(".hidden")[0].classList.remove("hidden");
      document.getElementById("wrong").play();
      if (wrongAttempts === 8) {
        endGame();
      }
    }
  }
});

function endGame() {
  lettersContainer.style.pointerEvents = "none";
  const popupEl = document.createElement("div");
  const reloadButton = document.createElement("button");
  if (wrongAttempts === 8) {
    document.getElementById("game-over-fail").play();
    popupEl.appendChild(
      document.createTextNode(`Game over. The word is "${randomWord}".`)
    );
    reloadButton.appendChild(document.createTextNode("Try Again"));
    popupEl.className = "popup fail";
  } else {
    document.getElementById("game-over-success").play();
    popupEl.appendChild(
      document.createTextNode(
        `You've nailed it with ${wrongAttempts} ${
          wrongAttempts === 1 ? "try" : "tries"
        }.`
      )
    );
    reloadButton.appendChild(document.createTextNode("Play Again"));
    popupEl.className = "popup success";
  }
  popupEl.append(reloadButton);
  document.body.append(popupEl);

  reloadButton.addEventListener("click", () => {
    window.location.reload();
  });
  return;
}
