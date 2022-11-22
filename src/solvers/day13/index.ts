import { Day } from "../../types";

const NUMBER = "13";

type ParsedInput = { points: [number, number][]; folds: ["x" | "y", number][] };

function parse(input: string): ParsedInput {
  const lines = input.split("\n");
  return lines.reduce((acc, line) => {

    if (line.startsWith('f')) {
      // TODO
    }

    return acc;
  }, {points: [], folds: []});
}

const solve = (input: string) => {
  const { points, folds } = parse(input);
  return 0;
};

export default {
  NUMBER,
  solve,
} as Day;
