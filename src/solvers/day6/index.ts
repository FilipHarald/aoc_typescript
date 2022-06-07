const NUMBER = '6';

const NUMBER_OF_DAYS = 256;

const parse = (line: string) => {
  const [withoutNewline] = line.split('\n');
  const populationCounter = {
    '0': 0,
    '1': 0,
    '2': 0,
    '3': 0,
    '4': 0,
    '5': 0,
    '6': 0,
    '7': 0,
    '8': 0,
  };
  return withoutNewline.split(',').reduce((acc, nbr) => {
    acc[nbr] = acc[nbr] ? acc[nbr] + 1 : 1;
    return acc;
  }, populationCounter);
};

const summerizePopulation = pop => Object.values(pop).reduce((sum: number, generationCount: number) => sum + generationCount, 0);

const solve = (input: string) => {
  let fishPopulation = parse(input);
  for (let i = 0; i < NUMBER_OF_DAYS; i++) {
    fishPopulation = {
      '0': fishPopulation['1'],
      '1': fishPopulation['2'],
      '2': fishPopulation['3'],
      '3': fishPopulation['4'],
      '4': fishPopulation['5'],
      '5': fishPopulation['6'],
      '6': fishPopulation['7'] + fishPopulation['0'],
      '7': fishPopulation['8'],
      '8': fishPopulation['0'],
    };
  }

  return summerizePopulation(fishPopulation);
};

export default {
  NUMBER,
  solve
}
