## angular-stars

[Live Demo!](https://hanford.github.io/angular-stars)

[![NPM][star-icon]][star-url]

#### Installation  
Installation is super easy, simply add the dependencies to your build and add ```<stars amount="X"></stars>``` to your your app.

```
# use npm
$ npm install angular-stars
```

Add angular-stars to your dependencies

```
angular
  .module('yourApp', ['angular-stars'])
  .controller('SampleController', function () {})
```

#### API
*amount*  
The first parameter is simply how many stars to render.

*max*

The max is only needed if you want to specify a max amount of stars to render.


#### Usage
```<stars amount="10"></stars>```

#### Output
![](./stars.png)

[star-icon]: https://nodei.co/npm/angular-stars.png?downloads=true
[star-url]: https://npmjs.org/package/angular-stars
