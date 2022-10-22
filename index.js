window.addEventListener("DOMContentLoaded", () => {
  const display = document.querySelector(".display-player");
  const boxes = document.querySelectorAll(".box");
  const announcer = document.querySelector(".announce");
  const resetBtn = document.querySelector("#reset");
  let X_score = document.querySelector(".X_score");
  let O_score = document.querySelector(".O_score");

  let XScore = 0,
    OScore = 0;


  let board = ["", "", "", "", "", "", "", "", ""];
  let gameActive = true;
  let currentPlayer = "X";

  const PLAYERX_WON = "PLAYER X WON",
    PLAYERO_WON = "PLAYER O WON",
    TIE = "Tie";

  const music__1 = new Audio();
  music__1.src = "./Justin-Bieber-One-Time.mp3";

  const music__2 = new Audio();
  music__2.src = "./Halsey Ft. Juice WRLD.mp3";
  
  /*
        Indexes within the board
        [0] [1] [2]
        [3] [4] [5]
        [6] [7] [8]
    */

  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const handleVal = () => {
    let won = false;
    for (let i = 0; i <= 7; i++) {
      const winning = winConditions[i];
      let a = board[winning[0]];
      let b = board[winning[1]];
      let c = board[winning[2]];

      if (a === "" || b === "" || c === "") {
        continue;
      }

      if (a === b && b === c) {
        won = true;
        break;
      }
    }

    if (won) {
      annouce(currentPlayer === "X" ? PLAYERX_WON : PLAYERO_WON);
      gameActive = false;
      return;
    }

    if (!board.includes("")) annouce(TIE);
  };

  const annouce = (f) => {
    switch (f) {
      case PLAYERO_WON:
        announcer.innerHTML = `Player <span class='playerO'>O</span> Won`;
        break;
      case PLAYERX_WON:
        announcer.innerHTML = `Player <span class='playerX'>X</span> Won`;
        break;
      case TIE:
        announcer.innerText = `Tie`;
        break;
    }
    announcer.classList.remove("hide");
  };

  const isValidAct = (box) => {
    if (box.innerText === "X" || box.innerText === "O") {
      return false;
    }
    return true;
  };

  const boardUp = (ind) => {
    board[ind] = currentPlayer;
  };

  const changePlayer = () => {
    display.classList.remove(`player${currentPlayer}`);
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    display.innerHTML = currentPlayer;
    display.classList.add(`player${currentPlayer}`);
  };

  const userAct = (box, ind) => {
    if (isValidAct(box) && gameActive) {
      box.innerText = currentPlayer;
      box.classList.add(`player${currentPlayer}`);
      boardUp(ind);
      handleVal();
      changePlayer();
    }
  };

  const reset = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    announcer.classList.add("hide");

    // music__1.pause()
    // music__2.pause()

    XScore = ''
    OScore = ''
    if (currentPlayer === "O") {
      changePlayer();
    }

    boxes.forEach((box) => {
      box.innerText = "";
      box.classList.remove("playerX");
      box.classList.remove("playerO");
    });
  };

  boxes.forEach((box, ind) => {
    box.addEventListener("click", () => userAct(box, ind));
  });

  resetBtn.addEventListener("click", () => {
    reset();
  });
});
