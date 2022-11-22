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
  pathToThisCave: string[],
  hasVisitiedSmallCaveTwice: boolean
): { isValidCaveConnection: boolean; hasVisitiedSmallCaveTwice: boolean } {
  const isUppercase = /^[A-Z]/.test(caveId);
  if (isUppercase) {
    return {
      isValidCaveConnection: true,
      hasVisitiedSmallCaveTwice,
    };
  }
  if (caveId === 'start') {
    return {
      isValidCaveConnection: false,
      hasVisitiedSmallCaveTwice
    }
  }
  const caveIdHasBeenVisited = pathToThisCave.includes(caveId);
  if (hasVisitiedSmallCaveTwice) {
    return {
      isValidCaveConnection: !caveIdHasBeenVisited,
      hasVisitiedSmallCaveTwice,
    };
  }
  return {
    isValidCaveConnection: true,
    hasVisitiedSmallCaveTwice: caveIdHasBeenVisited,
  };
}

function recursiveFindPossibleEndPaths(
  connectionsMap: CaveConnectionsMap,
  pathToThisCave: string[],
  hasAlreadyVisitedSmallCaveTwice: boolean
): string[][] {
  const currentCaveId = pathToThisCave.at(-1);
  return connectionsMap[currentCaveId].reduce(
    (possibleEndPaths, connectionCaveId) => {
      const { isValidCaveConnection, hasVisitiedSmallCaveTwice } =
        checkIsValidCaveConnection(
          connectionCaveId,
          pathToThisCave,
          hasAlreadyVisitedSmallCaveTwice
        );
      if (isValidCaveConnection) {
        const path = [...pathToThisCave, connectionCaveId];
        if (connectionCaveId === "end") {
          possibleEndPaths.push(path);
        } else {
          possibleEndPaths = [
            ...possibleEndPaths,
            ...recursiveFindPossibleEndPaths(
              connectionsMap,
              path,
              hasVisitiedSmallCaveTwice
            ),
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
  const isPartOne = false;
  const possibleEndPaths = recursiveFindPossibleEndPaths(
    connectionsMap,
    ["start"],
    isPartOne
  );
  return possibleEndPaths.length;
}

export default {
  NUMBER: "12",
  solve,
} as Day;
