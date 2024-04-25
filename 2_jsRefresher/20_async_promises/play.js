// HACK: without promise
// const fetchData = callback => {
//   setTimeout(() => {
//     callback('Done!');
//   }, 1500);
// };

// setTimeout(() => {
//   console.log('Timer is done!');
//   fetchData(text => console.log(text));
// }, 2000);

// // synchronous code
// console.log('Hello!');
// console.log('Hi!');

// HACK: WITH promise
const fetchData = () => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Done!');
    }, 1500);
  });
  return promise;
};

// asynchronous code (it doesn't finish immediately)
setTimeout(() => {
  console.log('Timer is done!');
  fetchData()
    .then(text => {
      console.log(text);
      // WARN: this is the advantage of promise, if we have to call another function (here the same)
      // we don't have nested callbacks anymore
      return fetchData();
    })
    .then(text2 => {
      console.log(text2);
      return fetchData();
    })
    .then(text3 => console.log(text3));
}, 2000);

// synchronous code
console.log('Hello!');
console.log('Hi!');

/* NOTE: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor

Node.js and JavaScript in general does not block your code execution until that is done.
Indeed, here it will recognize this so called callback function. So a function should execute in the future.
It should call back later once it is done.

So once this timer expired here, it will just recognize that and will then immediately move on to the
next line and will execute all the synchronous code and then execute your async code once this is done.
Which is why we see how low and high first, even though in our code time is done, is printed first,

The callback function is one, the oldest one, and you'll see it quite a bit, especially in Node.js.
There's nothing wrong with it, but you'll face a problem if you have a couple of depending async operations.

Now, if we have a couple of nested async calls, as we have here, we go deeper and deeper from a callback perspective.
And that is why we also have a feature called Promises, which we can use Node.js.
*/
