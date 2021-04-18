export const solvedBoard = [];
while (solvedBoard.length < 5) {
  solvedBoard.push(Array(5).fill(false));
}

solvedBoard[0].splice(0, 2, true, true);
solvedBoard[1].splice(0, 5, true, true, false, true, true);
solvedBoard[2].splice(2, 3, true, true, true);
solvedBoard[3].splice(1, 3, true, true, true);
solvedBoard[4].splice(1, 4, true, true, false, true);
