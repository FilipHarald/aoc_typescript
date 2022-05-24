import parse from './parser';

const NUMBER = '4';

const solve = (input: string) => {
  const {drawingNumbers, boards} = parse(input);
  const {winnerIndex, drawnNumbers} = drawingNumbers.reduce((acc, nbr) => {
    // TODO: if winner: just return
    const mostMarksInRows = boards.map(board => {
      // TODO: find and mark
      // TODO: return amount of marks in "best" row
    });
    // TODO: if marks === 5 set winnerIndex
    return acc;
  }, {drawnNumbers: []});
};

export default {
  NUMBER,
  solve
}

