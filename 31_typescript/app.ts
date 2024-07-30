// NOTE: to test this, right-click on the .html file, open with live-server, go to the console

const num1Element = document.getElementById('num1') as HTMLInputElement;
const num2Element = document.getElementById('num2') as HTMLInputElement;
const buttonElement = document.querySelector('button');

function add(num1: number, num2: number) {
  return num1 + num2;
}

buttonElement?.addEventListener('click', () => {
  const num1 = num1Element.value;
  const num2 = num2Element.value;
  const result = add(+num1, +num2);
  console.log(result);
});

// console.log(add(1, 6));
//HACK: our IDE is already complaining and compiling tsc... wouldn't work
// console.log(add('1', '6'));
