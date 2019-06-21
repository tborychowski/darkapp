# Electron-webpack-gulp
This is a starter template for a simple electron app.

Technologies used:
- [webpack](https://webpack.js.org/) - for bundling modules together
- [gulp](https://gulpjs.com) - for running task
- [svelte](https://svelte.dev) - for nicer javascript componentisation
- [stylus](http://stylus-lang.com) - for nicer css


## Install
```sh
git clone https://github.com/tborychowski/electron-webpack-gulp.git
cd electron-webpack-gulp
rm -rf .git
npm i
npm start
```

## Notes
- The app will reload when renderer assets (css, js or html) changes, and will fully restart when main assets change (main `index.js` file).
- For now there's livereload script loaded in the main `index.html` file to allow the renderer's page reloading (I don't like the idea or running a webpack server). This should be manually removed for production (I automate that later).
- make sure you have gulp installed globally (`npm i -g gulp`)
