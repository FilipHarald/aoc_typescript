import {Day} from "../../types";

const NUMBER = '5';

const parse = (line: string): number[][] => {
  const [start, finish] = line.split(' -> ');
  return [
    start.split(',').map(nbr => parseInt(nbr)),
    finish.split(',').map(nbr => parseInt(nbr))
  ];
};

const ensurePositive = (vector, diffX, diffY) => {
  if (diffX > 0 || diffY > 0) {
    return [vector[1], vector[0]];
  }
  return vector;
};

const reformat = (v: number[][]) => {
  const diffX = v[0][0] - v[1][0];
  const diffY = v[0][1] - v[1][1];

  const positiveV = ensurePositive(v, diffX, diffY);
  return {
    runsOnXAxis: !!diffX,
    runsOnYAxis: !!diffY,
    positiveVector: positiveV
  };
};

const getNextVal = val => val ? val + 1 : 1;

const solve = (input: string) => {
  const lines = input.split('\n');
  const pointsWithGas = lines.slice(0, lines.length - 1).reduce((acc, line) => {
    const vector = parse(line);
    const {runsOnXAxis, runsOnYAxis, positiveVector} = reformat(vector);
    if (runsOnYAxis && runsOnXAxis) return acc;
    const loopObj = {
      start: runsOnXAxis ? positiveVector[0][0] : positiveVector[0][1],
      finish: runsOnXAxis ? positiveVector[1][0] : positiveVector[1][1],
    };
    for (let i = loopObj.start; i <= loopObj.finish; i++) {
      const x = runsOnXAxis ? i : positiveVector[0][0];
      const y = runsOnXAxis ? positiveVector[0][1] : i;
      acc[x + '-' + y] = getNextVal(acc[x + '-' + y]);
    }
    return acc;
  }, {});
  const pointsWithTooMuchGas = Object.values(pointsWithGas).reduce((sum: number, pointCounter: number) => {
    return pointCounter > 1 ? sum + 1 : sum;
  }, 0);
  return pointsWithTooMuchGas;
};

export default {
  NUMBER,
  solve
} as Day;
