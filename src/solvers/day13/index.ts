import { Day } from "../../types";

const NUMBER = "13";

type Point = { x: number; y: number };
type ParsedInput = {
  dots: Point[];
  folds: { alongAxis: "x" | "y"; value: number }[];
};

function parse(input: string): ParsedInput {
  const lines = input.split("\n");
  return lines.reduce(
    (acc, line) => {
      if (line.startsWith("f")) {
        const [alongAxis, value] = line.split(" ")[2].split("=");
        acc.folds.push({
          alongAxis,
          value: +value,
        });
      } else if (line.match(/^[0-9]/)) {
        const [x, y] = line.split(",");
        acc.dots.push({ x: +x, y: +y });
      }
      return acc;
    },
    { dots: [], folds: [] }
  );
}

function printPartTwo(dots: Point[]) {
  const { highestX, highestY } = dots.reduce(
    (acc, dot) => {
      acc.highestX = acc.highestX > dot.x ? acc.highestX : dot.x;
      acc.highestY = acc.highestY > dot.y ? acc.highestY : dot.y;
      return acc;
    },
    { highestX: 0, highestY: 0 }
  );

  let str = "";
  for (let y = 0; y <= highestY; y++) {
    for (let x = 0; x <= highestX; x++) {
      if (dots.find((p: Point) => p.x === x && p.y === y)) {
        str += "#";
      } else {
        str += ".";
      }
    }
    str += "\n";
  }
  console.log(str);
}

function solve(input: string) {
  const { dots, folds } = parse(input);

  const finalDots = folds.reduce((dotsBeforeFold, f) => {
    const dotsAfterFold = dotsBeforeFold.reduce((acc, d) => {
      let newDot: Point;
      const dotAxisValue = d[f.alongAxis];
      const isOutsideFold = dotAxisValue > f.value;
      if (isOutsideFold) {
        const distanceFromAxis = dotAxisValue - f.value;
        const newValue = f.value - distanceFromAxis;
        if (f.alongAxis === "x") {
          newDot = { x: newValue, y: d.y };
        } else {
          newDot = { x: d.x, y: newValue };
        }
      } else {
        newDot = d;
      }
      if (!acc.find((dot: Point) => dot.x === newDot.x && dot.y === newDot.y)) {
        acc.push(newDot);
      }
      return acc;
    }, []);
    return dotsAfterFold;
  }, dots);

  printPartTwo(finalDots);
  return finalDots.length;
};

export default {
  NUMBER,
  solve,
} as Day;
