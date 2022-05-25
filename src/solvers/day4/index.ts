import parse from './parser';

const NUMBER = '4';
const MARK_PREFIX = 'x';

const solve = (input: string) => {
  let {drawingNumbers, boards} = parse(input);
  const {winnerIndex} = drawingNumbers.reduce((acc, drawnNumber) => {
    if (acc.winnerIndex !== undefined) return acc;
    let mostMarksColOrRow = 0;
    boards = boards.map(board => {
      const newBoard = board.map(row => {
        const marksInColCounters = [0,0,0,0,0];
        let mostMarksInRowCounter = 0;
        const newRow = row.map((nbr, index) => {
          if (drawnNumber === nbr || nbr[0] === MARK_PREFIX) {
            marksInColCounters[index] =+ 1;
            mostMarksInRowCounter =+ 1;
            return MARK_PREFIX + drawnNumber;
          } else {
            return nbr;
          }
        });
        return newRow;
      });
      // TODO: update mostMarksColOrRow
      return newBoard;
    });
    // TODO: if marks === 5 set winnerIndex
    return acc;
  }, {drawnNumbers: []});
};

export default {
  NUMBER,
  solve
}

