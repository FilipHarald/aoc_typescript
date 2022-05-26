const getNumbersFromLine = (row: string) => {
  return row.split(' ').reduce((acc, part) => {
    if (part !== '') {
      acc.push(part);
    }
    return acc;
  }, [])
};

const parse = (input: string) => {
  // console.log(input);
  const lines = input.split('\n');
  // console.log(lines);
  const drawingNumbers = lines.shift().split(',');
  const boards = lines.slice(0, lines.length - 1).reduce((acc, line, index) => {
    // console.log(line);
    if (line === '') {
      acc.push([]);
    } else {
      acc[acc.length - 1].push(getNumbersFromLine(line));
    }
    return acc;
  }, []);
  // console.log(boards);
  return {
    drawingNumbers,
    boards
  }
};

export default parse;

