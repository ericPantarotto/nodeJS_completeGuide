# Understanding Event Driven code execution
createServer(), req.on(), req.end()  
These are some examples where no case uses a pattern where you pass a function to a function and node will execute these past in functions at a later point of time, which is called asynchronously.

In such cases, no charges won't immediately run that function. Instead, what it does when it first encounters this line is it will simply add a new event listener internally.

you can think of this as nodeJS as having some internal registry of events and listeners to these events.

>When the event is triggered, it will then find this function and any other functions you might have registered for that and will now call them. But it will not pause the other code execution and that is so important to understand.

if below code was encapsulted directly in the req.on() event, it would trigger a 'cannot set headers' error, as this block would only be registered the first time and not run
```js
req.on('end', () => {
    const parsedBody = Buffer.concat(body).toString();
    const message = parsedBody.split('=')[1];
    writeFileSync('message.txt', message);
    // WARN: having these line in the on() event would error, they need to be located below to run even the first time
    // res.statusCode = 302;
    // res.setHeader('Location', '/');
    // return res.end();
    });
    res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();
```
We don't want to block our code execution. We always want to be in that wait for new events, loop the event loop and then only execute code once it's due to be executed and never block that event loop for too long of a time.
