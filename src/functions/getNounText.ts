interface IGetNounText{
    number: number;
    one: string;
    two: string;
    five: string;
}

export const getNounText = ({number, one, two, five}:IGetNounText) => {
    number %= 100;
    if (number >= 5 && number <= 20) {
      return five;
    }
    number %= 10;
    if (number === 1) {
      return one;
    }
    if (number >= 2 && number <= 4) {
      return two;
    }
    return five;
};