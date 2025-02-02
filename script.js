const startGameContainer = document.querySelector(".start-game-container");
const gameContainer = document.querySelector(".container");
const lettersContainer = document.querySelector(".row .letters");
const lettersGuessElement = document.querySelector(".letters-guess");
const hangmanDraw = document.querySelector(".hangman-draw-wrapper");
const selectButton = document.getElementById("select-button");
const langOptions = Array.from(document.querySelectorAll("#lang option"));
const categoryTitle = document.querySelector(".category-container .title");
let lettersArray;
let words = {};
let wrongAttempts = 0;
let randomWord;

selectButton.addEventListener("click", () => {
  const selectedLang = langOptions.find((option) => option.selected === true);
  if (selectedLang.value === "arabic") {
    categoryTitle.textContent = "الفئة: ";
    lettersArray = Array.from("أبتثجحخدذرزسشصضطظعغفقكلمنهوياةؤءئى");
    words = {
      فواكه: [
        "تفاح",
        "موز",
        "عنب",
        "برتقال",
        "رمان",
        "مانجو",
        "تفاح أخضر",
        "مشمش",
      ],
      خضار: [
        "خس",
        "خيار",
        "باذنجان",
        "طماطم",
        "جزر",
        "بطاطس",
        "فاصوليا",
        "كوسا",
      ],
      وسائل_النقل: [
        "سيارة",
        "دراجة",
        "طائرة",
        "قطار",
        "حافلة",
        "مركب",
        "دراجة نارية",
      ],
      ألوان: [
        "أحمر",
        "أزرق",
        "أصفر",
        "أخضر",
        "أسود",
        "أبيض",
        "برتقالي",
        "بنفسجي",
      ],
      ملابس: [
        "قميص",
        "بنطال",
        "فستان",
        "جاكيت",
        "معطف",
        "حذاء",
        "قبعة",
        "سروال",
      ],
      حيوانات_بحرية: [
        "سمكة",
        "سلحفاة",
        "دلفين",
        "قرش",
        "حبار",
        "قنديل البحر",
        "نجم البحر",
      ],
      أدوات: [
        "مطرقة",
        "مفك",
        "مقص",
        "مفك البراغي",
        "شاكوش",
        "مفتاح",
        "مطرقة خشبية",
      ],
    };

    document.body.style.direction = "rtl";
  } else if (selectedLang.value === "english") {
    categoryTitle.textContent = "Word Category: ";
    lettersArray = Array.from("abcdefghijklmnopqrstuvwxyz");
    words = {
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
    document.body.style.direction = "ltr";
  }
  gameContainer.style.display = "block";
  startGameContainer.remove();
  startGame();
});

function startGame() {
  lettersArray.forEach((letter) => {
    const letterSpan = document.createElement("span");
    letterSpan.appendChild(document.createTextNode(letter));
    letterSpan.className = "letter-box";
    lettersContainer.append(letterSpan);
  });

  const wordsKeys = Object.keys(words);
  const randomPropertyName =
    wordsKeys[Math.floor(Math.random() * wordsKeys.length)];
  const randomPropertyValue = words[randomPropertyName];
  randomWord =
    randomPropertyValue[
      Math.floor(Math.random() * randomPropertyValue.length)
    ].toLowerCase();

  document.querySelector(".category-container .category").textContent =
    randomPropertyName;

  const chosenWordArray = Array.from(randomWord);

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
}

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
