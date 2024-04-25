One other feature, we'll use from time to time are template literals: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals

It's a different way of writing strings.

Instead of using double or single quotation marks:

'A String'

or

"Another string"

you can use backticks (`)

`Another way of writing strings`

Now why would we use that way of creating strings?

With that syntax, you can dynamically add data into a string like this:
```js
const name = "Max";
const age = 29;
console.log(`My name is ${name} and I am ${age} years old.`);
This is of course shorter and easier to read than the "old" way of concatenating strings:
```
```js
const name = "Max";
const age = 29;
console.log("My name is " + name + " and I am " + age + " years old.");
```

[MD — Code Blocks ](https://www.codecademy.com/resources/docs/markdown/code-blocks)  
https://www.codecademy.com/resources/docs/markdown/code-blocks