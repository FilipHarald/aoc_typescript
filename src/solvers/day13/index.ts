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

const solve = (input: string) => {
  const { dots, folds } = parse(input);
  const firstFold = folds[0];
  const finalDots = dots.reduce((acc, d) => {
    let newDot: Point;
    const dotAxisValue = d[firstFold.alongAxis];
    const isOutsideFold = dotAxisValue > firstFold.value;
    if (isOutsideFold) {
      const distanceFromAxis = dotAxisValue - firstFold.value;
      const newValue = firstFold.value - distanceFromAxis;
      if (firstFold.alongAxis === "x") {
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
  return finalDots.length;
};

export default {
  NUMBER,
  solve,
} as Day;
