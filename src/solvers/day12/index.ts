import { Day } from "../../types";

type CaveConnectionsMap = {
  [caveId: string]: string[];
};

function parse(input: string): CaveConnectionsMap {
  const lines = input.split("\n");
  const connectionsMap = lines.reduce(
    (acc: CaveConnectionsMap, line: string) => {
      const [pointA, pointB] = line.split("-");
      if (!acc[pointA]) {
        acc[pointA] = [];
      }
      if (!acc[pointA].includes(pointB)) {
        acc[pointA].push(pointB);
      }
      if (!acc[pointB]) {
        acc[pointB] = [];
      }
      if (!acc[pointB].includes(pointA)) {
        acc[pointB].push(pointA);
      }
      return acc;
    },
    {}
  );

  return connectionsMap;
}

function checkIsValidCaveConnection(
  caveId: string,
  pathToThisCave: string[]
): boolean {
  const isUppercase = /^[A-Z]*$/.test(caveId);
  if (isUppercase) return true;
  return !pathToThisCave.includes(caveId);
}

function recursiveFindPossibleEndPaths(
  connectionsMap: CaveConnectionsMap,
  pathToThisCave: string[]
): string[][] {
  const currentCaveId = pathToThisCave.at(-1);
  return connectionsMap[currentCaveId].reduce((possibleEndPaths, connectionCaveId) => {
      const isValidCaveConnection = checkIsValidCaveConnection(connectionCaveId, pathToThisCave);
      if (isValidCaveConnection) {
        const path = [...pathToThisCave, connectionCaveId];
        if (connectionCaveId === "end") {
          possibleEndPaths.push(path);
        } else {
          possibleEndPaths = [
            ...possibleEndPaths,
            ...recursiveFindPossibleEndPaths(connectionsMap, path),
          ];
        }
      }
      return possibleEndPaths;
    },
    []
  );
}

function solve(input: string): number {
  const connectionsMap = parse(input);
  const possibleEndPaths = recursiveFindPossibleEndPaths(connectionsMap, [
    "start",
  ]);
  return possibleEndPaths.length;
}

export default {
  NUMBER: "12",
  solve,
} as Day;
