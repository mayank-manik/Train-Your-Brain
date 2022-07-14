let card = document.getElementsByClassName("card");
let score = 0;
var audio = new Audio('assets/audio.mp3');
var cardOptions = [1, 2, 3, 4, 5, 6, 7, 8, 8, 7, 6, 5, 4, 3, 2, 1];
var cardChosen = new Array();


//function to shuffle cards

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

shuffleArray(cardOptions);

// matches if two flipped card are same or not

function matchCard() {
  let element1 = document.getElementById(cardChosen[0][1]).firstElementChild;
  let element2 = document.getElementById(cardChosen[1][1]).firstElementChild;

  if (cardChosen[0][0] === cardChosen[1][0]) {
    element1.setAttribute("src", "assets/done.png");
    element2.setAttribute("src", "assets/done.png");
    element1.parentElement.removeAttribute("onclick");
    element2.parentElement.removeAttribute("onclick");
    score++;
    if (score === 8) {
      element1.parentElement.removeAttribute("onclick");
      element2.parentElement.removeAttribute("onclick");
      element1.setAttribute("src", "assets/done.png");
      element2.setAttribute("src", "assets/done.png");
      setTimeout(() => {
        alert("Hurrah !! You made it...");
        location.reload();
      }, 100);
    }
  }
  else {
    audio.play();
    element1.setAttribute("src", "assets/main.jpg");
    element2.setAttribute("src", "assets/main.jpg");
  }
  cardChosen.length = 0;
}

// flip card and store two latest clicked one

function flipCard(box) {
  let id = box.id;
  cardChosen[cardChosen.length - 1] = [`assets/${cardOptions[id - 1]}.jpg`, id];
  box.firstElementChild.setAttribute("src", `assets/${cardOptions[id - 1]}.jpg`);
}

function flip(box) {
  if (cardChosen.length === 0 || cardChosen[0][1] !== box.id) {
    cardChosen.push([box.firstElementChild.getAttribute("src"), box.id]);
  }
  flipCard(box);
  if (cardChosen.length === 2) {
    setTimeout(() => {
      matchCard();
    }, 200);
  }
}
