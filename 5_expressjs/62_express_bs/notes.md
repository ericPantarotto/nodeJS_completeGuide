# Sending Response

Sending responses actually gets easier, thanks to expressjs.

Instead of setting a *header* which we still can do and writing *write(*) which we also still can do, so we can still send responses as before but instead, there is a new utility function we can use, `send()`.

## HTML
we can still send HTML .
And another feature provided by express here. The send method by default here since we send some text is  simply sets an *html content type*.  
you can still set one manually with `seHheader()` of course, so you can always override this expressjs default but you can also rely on the default where the default response header is text html.

sending a file with express.js will be even easier compared to raw node.js

>Basic middleware concept: you add functions that are hooked into this funnel through which the request goes and you either have next to reach the next middleware or you send a response 