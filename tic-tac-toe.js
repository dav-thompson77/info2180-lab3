document.addEventListener("DOMContentLoaded", function () {
  const squares = document.querySelectorAll("#board div");
  const status = document.getElementById("status");
  const newGameBtn = document.querySelector(".btn");
  const defaultMessage = status.textContent;

  const winningLines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  let gameState = Array(9).fill(null);
  let currentPlayer = "X";
  let gameOver = false;

  // Exercise 1: style squares
  squares.forEach(function (square, index) {
    square.classList.add("square");

    // Exercise 2 + 6: place X/O, block already filled squares
    square.addEventListener("click", function () {
      if (gameOver || gameState[index] !== null) return;

      gameState[index] = currentPlayer;
      square.textContent = currentPlayer;
      square.classList.add(currentPlayer);

      checkWinner();
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    });

    // Exercise 3: hover effect
    square.addEventListener("mouseover", function () {
      square.classList.add("hover");
    });
    square.addEventListener("mouseout", function () {
      square.classList.remove("hover");
    });
  });

  // Exercise 4: check for the winner
  function checkWinner() {
    for (const [a, b, c] of winningLines) {
      if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
        status.textContent = "Congratulations! " + gameState[a] + " is the Winner!";
        status.classList.add("you-won");
        gameOver = true;
        return;
      }
    }
  }

  // Exercise 5: restart the game
  newGameBtn.addEventListener("click", function () {
    gameState = Array(9).fill(null);
    currentPlayer = "X";
    gameOver = false;
    status.textContent = defaultMessage;
    status.classList.remove("you-won");
    squares.forEach(function (square) {
      square.textContent = "";
      square.classList.remove("X", "O");
    });
  });
});

