// NOTE: to test this, right-click on the .html file, open with live-server, go to the console

function add(num1: number, num2: number) {
  return num1 + num2;
}

console.log(add(1, 6));
// console.log(add('1', '6')); //HACK: our IDE is already complaining and compiling tsc... wouldn't work
