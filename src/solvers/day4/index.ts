import parse from './parser';

const NUMBER = '4';
const MARK_PREFIX = 'x';

const getHighestNumber = (nbr1: number, nbr2: number) => nbr1 > nbr2 ? nbr1 : nbr2;

const play = (drawingNumbers: string[], boards: string[][][]) => {
  let playingBoards = boards;
  const {winnerIndices, finalNumber} = drawingNumbers.reduce((acc, drawnNumber) => {
    if (acc.winnerIndices.length > 0) return acc;
    playingBoards = playingBoards.map((board, boardIndex) => {
      let mostMarksColOrRow = 0;
      const marksInRowCounters = [0,0,0,0,0];
      const marksInColCounters = [0,0,0,0,0];
      const newBoard = board.map((row: string[], rowIndex) => {
        const newRow = row.map((nbr, colIndex) => {
          const shouldBeMarked = drawnNumber === nbr;
          const alreadyMarked = nbr[0] === MARK_PREFIX;
          if (shouldBeMarked || alreadyMarked) {
            marksInRowCounters[rowIndex]++;
            marksInColCounters[colIndex]++;
          }
          return shouldBeMarked ? MARK_PREFIX + nbr : nbr;
        });
        return newRow;
      });
      mostMarksColOrRow = marksInColCounters.reduce(getHighestNumber, mostMarksColOrRow); mostMarksColOrRow = marksInRowCounters.reduce(getHighestNumber, mostMarksColOrRow);
      if (mostMarksColOrRow === 5) {
        acc.finalNumber = parseInt(drawnNumber);
        acc.winnerIndices.push(boardIndex);
      }
      return newBoard;
    });
    return acc;
  }, {winnerIndices: [], finalNumber: -1});
  return {
    winningBoards: winnerIndices.map(index => playingBoards[index]),
    finalNumber
  };
};

const calculateScore = (boardWithMarks: string[][], finalNumber: number) => {
  const marksSum = boardWithMarks.reduce((score, row: string[]) => {
    row.forEach((nbr) => {
      if (nbr[0] !== MARK_PREFIX) {
        // console.log(nbr);
        score += parseInt(nbr);
      }
    });
    return score;
  }, 0);
  // console.log(marksSum);
  // console.log(finalNumber);
  return marksSum * finalNumber;
};

const solve = (input: string) => {
  const {drawingNumbers, boards} = parse(input);
  const {winningBoards, finalNumber} = play(drawingNumbers, boards);
  // console.log(`winningBoard ${JSON.stringify(winningBoard, null, 2)}`);
  const highestScore = winningBoards.reduce((leaderScore, board) => {
    const score = calculateScore(board, finalNumber);
    return score > leaderScore ? score : leaderScore;
  }, 0);
  return highestScore;
};

export default {
  NUMBER,
  solve
}
