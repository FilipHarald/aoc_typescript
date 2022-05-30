import getDayInputs from './input';
import {
//  day4,
//  day5,
  day6
} from './solvers';

const AOC_DAY = [
//  day4,
//  day5,
  day6
];

const solveDay = day => {
  console.log(`DAY ${day.NUMBER} - reading input...`);
  const inputs = getDayInputs(day.NUMBER);
  console.log(`DAY ${day.NUMBER} - found ${inputs.length} inputs`);
  inputs.forEach((input, index) => {
    console.log(`DAY ${day.NUMBER} INPUT ${index} - solving...`);
    const res = JSON.stringify(day.solve(input), null, 2);
    console.log(`DAY ${day.NUMBER} INPUT ${index} - solved! res:\n${res}`);
  });
};

AOC_DAY.forEach(day => {
  solveDay(day);
});

