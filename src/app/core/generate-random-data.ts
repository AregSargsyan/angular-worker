export class MockedElement {
  id: string;
  int: number;
  float: string;
  color: string;
  child: {id: string, color: string};

  constructor(i: number) {
    this.id = (i+1).toString();
    this.int = Math.floor(Math.random() * 100);
    this.float = Math.floor(Math.random() * 100) + '.' +  generateRandom18Digits(18);
    this.color = getRandomColor();
    this.child = {
      id: (i+1).toString(),
      color: getRandomColor(),
    };
  }
}

const getRandomColor = () => {
  const colors = ['Chocolate', 'Aqua', 'yellow']
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};


export const generateMockData = (size: number): MockedElement[] => {
  return Array.from({length: size}).map((_, i) => new MockedElement(i))
};


const generateRandom18Digits = (length: number)=> {
  let numStr = '';
  for (let i = 0; i < length; i++) {
    numStr += Math.floor(Math.random() * 10);
  }
  return numStr;
}
