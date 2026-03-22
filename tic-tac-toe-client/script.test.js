import { TicTacToeGame } from "./script";

describe("checkWin", () => {
  let game;

  beforeEach(() => {
    game = new TicTacToeGame();
  });

  test("should return true for a horizontal win on the top row", () => {
    game.board = ["X", "X", "X", "", "", "", "", "", ""];
    expect(game.checkWin()).toBe(true);
  });

  test("should return true for a horizontal win on the middle row", () => {
    game.board = ["", "", "", "O", "O", "O", "", "", ""];
    expect(game.checkWin()).toBe(true);
  });

  test("should return true for a horizontal win on the bottom row", () => {
    game.board = ["", "", "", "", "", "", "X", "X", "X"];
    expect(game.checkWin()).toBe(true);
  });

  test("should return true for a vertical win on the first column", () => {
    game.board = ["O", "", "", "O", "", "", "O", "", ""];
    expect(game.checkWin()).toBe(true);
  });

  test("should return true for a vertical win on the second column", () => {
    game.board = ["", "X", "", "", "X", "", "", "X", ""];
    expect(game.checkWin()).toBe(true);
  });

  test("should return true for a vertical win on the third column", () => {
    game.board = ["", "", "O", "", "", "O", "", "", "O"];
    expect(game.checkWin()).toBe(true);
  });

  test("should return true for a diagonal win from top-left to bottom-right", () => {
    game.board = ["X", "", "", "", "X", "", "", "", "X"];
    expect(game.checkWin()).toBe(true);
  });

  test("should return true for a diagonal win from top-right to bottom-left", () => {
    game.board = ["", "", "O", "", "O", "", "O", "", ""];
    expect(game.checkWin()).toBe(true);
  });

  test("should return false if there is no win", () => {
    game.board = ["X", "O", "X", "O", "X", "O", "O", "X", "O"];
    expect(game.checkWin()).toBe(false);
  });

  test("should return false for an empty board", () => {
    game.board = ["", "", "", "", "", "", "", "", ""];
    expect(game.checkWin()).toBe(false);
  });
});

describe("checkDraw", () => {
  let game;

  beforeEach(() => {
    game = new TicTacToeGame();
  });

  test("should return true for a full board with no winner", () => {
    game.board = ["X", "O", "X", "X", "O", "O", "O", "X", "X"];
    expect(game.checkDraw()).toBe(true);
  });

  test("should return false for a board with empty cells", () => {
    game.board = ["X", "O", "X", "X", "O", "", "O", "X", "X"];
    expect(game.checkDraw()).toBe(false);
  });

  test("should return false for an empty board", () => {
    game.board = ["", "", "", "", "", "", "", "", ""];
    expect(game.checkDraw()).toBe(false);
  });

  test("should return false for a board with a winner", () => {
    game.board = ["X", "X", "X", "O", "O", "", "", "", ""];
    expect(game.checkDraw()).toBe(false);
  });

  test("should return false for a partially filled board with no winner", () => {
    game.board = ["X", "O", "X", "X", "O", "O", "", "", ""];
    expect(game.checkDraw()).toBe(false);
  });
});

describe("clearBoardDisplay", () => {
  let game;

  beforeEach(() => {
    document.body.innerHTML = `
      <div class="cell"></div>
      <div class="cell"></div>
      <div class="cell"></div>
      <div class="cell"></div>
      <div class="cell"></div>
      <div class="cell"></div>
      <div class="cell"></div>
      <div class="cell"></div>
      <div class="cell"></div>
    `;
    game = new TicTacToeGame();
  });

  test("should clear all cells on the board", () => {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell, index) => {
      cell.innerHTML = index % 2 === 0 ? "X" : "O";
    });

    game.clearBoardDisplay();

    cells.forEach((cell) => {
      expect(cell.innerHTML).toBe("");
    });
  });

  test("should not throw an error if the board is already empty", () => {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      expect(cell.innerHTML).toBe("");
    });

    expect(() => game.clearBoardDisplay()).not.toThrow();
  });

  test("should clear the board even if some cells are partially filled", () => {
    const cells = document.querySelectorAll(".cell");
    cells[0].innerHTML = "X";
    cells[4].innerHTML = "O";

    game.clearBoardDisplay();

    cells.forEach((cell) => {
      expect(cell.innerHTML).toBe("");
    });
  });
});
