// NOTE: to test this, right-click on the .html file, open with live-server, go to the console

const num1Element = document.getElementById('num1') as HTMLInputElement;
const num2Element = document.getElementById('num2') as HTMLInputElement;
const buttonElement = document.querySelector('button');

const numResults: number[] = [];
const stringResults: string[] = [];

function add(num1: number | string, num2: number | string) {
  if (typeof num1 === 'number' && typeof num2 === 'number') {
    return num1 + num2;
  } else if (typeof num1 === 'string' && typeof num2 === 'string') {
    return `a string: ${num1} ${num2}`;
  }
  //HACK: mix of number and string:
  return +num1 + +num2;
}

function printResult(resObject: { val: number; timestamp: Date }) {
  console.log(resObject.val, resObject.timestamp);
}

buttonElement?.addEventListener('click', () => {
  const num1 = num1Element.value;
  const num2 = num2Element.value;
  const result = add(+num1, +num2);
  console.log(result);

  const stringResult = add(num1, num2);
  console.log(stringResult);
  printResult({ val: result as number, timestamp: new Date() });

  numResults.push(result as number);
  stringResults.push(stringResult as string);
  console.log(numResults, stringResults);
  
});

// console.log(add(1, 6));
//HACK: our IDE is already complaining and compiling tsc... wouldn't work
// console.log(add('1', '6'));
