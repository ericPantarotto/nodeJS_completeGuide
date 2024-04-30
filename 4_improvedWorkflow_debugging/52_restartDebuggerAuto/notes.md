# Restarting the Debugger Automatically

we have to go to debug and then **Add a configuration** for nodejs.

This adds the .vscode folder with the ```launch.json``` file and this allows you to configure debugging for this project and how it behaves.

```"restart": true```

You have to make sure that **nodemon** is used and for that, you set the runtime executable not to node which would be the default
```"runtimeExecutable": "nodemon"```

With this if you save all of that and you now start debugging, it fails though and the reason for this is that <ins>it will not use the local nodemon but it looks for it globally.</ins>

Now to add it globally, you have to run ```npm install nodemon -g```, add **sudo** for Linux infront

## [https://code.visualstudio.com/docs/nodejs/nodejs-debugging](https://code.visualstudio.com/docs/nodejs/nodejs-debugging)
### Node console
you have to stop that process separately which you can do from the terminal which is why if you are using that nodemon process, you should use the integrated terminal 
>By default, Node.js debug sessions launch the target in the internal VS Code Debug Console. Since the Debug Console does not support programs that need to read input from the console, you can enable either an external terminal or use the VS Code Integrated Terminal by setting the console attribute in your launch configuration to externalTerminal or integratedTerminal respectively. The default is internalConsole.  
```"console": "integratedTerminal"```  
```cwd``` - launch the program to debug in this directory. 
>>**It is important to define this parameter if you use relative path, and debug with node && nodemon**