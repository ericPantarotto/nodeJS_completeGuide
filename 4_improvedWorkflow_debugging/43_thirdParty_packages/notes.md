# Third Party Packages
Third-party packages are available through the npm repository, that is a cloud package repository where all these packages live and you can conveniently install and manage them via npm,

## NPM link
[https://www.npmjs.com/package/nodemon](https://www.npmjs.com/package/nodemon)

packages which you install can be divided into development packages, so packages which mostly help you during development and production dependencies, so packages that helps you for the app as it's running on a server, for example nodemon would be a development dependency because we only use it during the development process, once we install our app on a real server we don't need it there.

The real server which is running somewhere in the Internet of course shouldn't restart and it also doesn't have to because we'll not change its code dynamically. A dev dependency will be added in your package.json

>-g, it will not install it in this project but globally on your machine so that you can use it anywhere.

```
npm install nodemon --save-dev
npm install nodemon -g
```

where is it installed? Well that is the **node_modules** folder

So you need that node modules folder while still using the packages but if you're not working on the project, you can delete it if you want, if you need the free space and then just remember to rerun npm install once you are working on the project again.

The **package-lock.json** file by the way just stores the exact versions I installed today so that if you share your project with others, they can actually get these exact versions too instead of the latest versions