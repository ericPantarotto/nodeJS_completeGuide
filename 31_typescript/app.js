"use strict";
// NOTE: to test this, right-click on the .html file, open with live-server, go to the console
const num1Element = document.getElementById('num1');
const num2Element = document.getElementById('num2');
const buttonElement = document.querySelector('button');
function add(num1, num2) {
    if (typeof num1 === 'number' && typeof num2 === 'number') {
        return num1 + num2;
    }
    else if (typeof num1 === 'string' && typeof num2 === 'string') {
        return `a string: ${num1} ${num2}`;
    }
    //HACK: mix of number and string:
    return +num1 + +num2;
}
buttonElement === null || buttonElement === void 0 ? void 0 : buttonElement.addEventListener('click', () => {
    const num1 = num1Element.value;
    const num2 = num2Element.value;
    const result = add(+num1, +num2);
    console.log(result);
    const stringResult = add(num1, num2);
    console.log(stringResult);
});
// console.log(add(1, 6));
//HACK: our IDE is already complaining and compiling tsc... wouldn't work
// console.log(add('1', '6'));
