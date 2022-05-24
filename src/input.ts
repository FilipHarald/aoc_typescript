import * as fs from 'fs'
import * as path from 'path';

const getDayInputs = (dayNbr: string): string[] => {
  try {
    const dirContents = fs.readdirSync(path.join(__dirname, `../assets/day-${dayNbr}`));
    // console.log(dirContents);
    const inputs = dirContents.map((file) => {
        const fileData = fs.readFileSync(path.join(__dirname, `../assets/day-${dayNbr}/${file}`), 'utf8');
        // console.log(fileData);
        return fileData;
      });
    return inputs;
  } catch (err) {
    console.error(err.stack);
  }
};

export default getDayInputs;
