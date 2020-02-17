The canonical location of this project is now [gulp-community/gulp-footer](https://github.com/gulp-community/gulp-footer).

# gulp-footer 

[![npm version](https://img.shields.io/github/package-json/v/gulp-community/gulp-footer)](https://www.npmjs.com/package/gulp-footer)
[![Actions Status](https://github.com/gulp-community/gulp-footer/workflows/Tests/badge.svg)](https://github.com/gulp-community/gulp-footer/actions)
[![Code Coverage](https://img.shields.io/coveralls/github/gulp-community/gulp-footer)](https://github.com/gulp-community/gulp-footer)
[![Dependency Status](https://img.shields.io/librariesio/release/npm/gulp-footer)](https://libraries.io/npm/gulp-footer)
![Github Issues](https://img.shields.io/github/issues/gulp-community/gulp-footer?style=plastic) 
[![MIT License](https://img.shields.io/github/license/gulp-community/gulp-footer)](./LICENSE)


gulp-footer is a Gulp extension to add a footer to file(s) in the pipeline.  [Gulp is a streaming build system](https://github.com/gulpjs/gulp) utilizing [node.js](http://nodejs.org/).

```javascript
var footer = require('gulp-footer');
```

## API

### footer(text, data)

#### text

Type: `String`  
Default: `''`  

The template text.


#### data

Type: `Object`  
Default: `{}`  

The data object used to populate the text.


## Usage

```javascript
var footer = require('gulp-footer');

gulp.src('./foo/*.js')
  .pipe(footer('Hello'))
  .pipe(gulp.dest('./dist/')

gulp.src('./foo/*.js')
  .pipe(footer('Hello <%= name %>\n', { name : 'World'} ))
  .pipe(gulp.dest('./dist/')

gulp.src('./foo/*.js')
  .pipe(footer('Hello ${name}\n', { name : 'World'} ))
  .pipe(gulp.dest('./dist/')


//
var pkg = require('./package.json');
var banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''].join('\n');

//passing in the text
gulp.src('./foo/*.js')
  .pipe(footer(banner, { pkg : pkg } ))
  .pipe(gulp.dest('./dist/')

//reading from a file for the text
var bannerText = fs.readFileSync('banner.js');

/*********************************************/
//If you want the text from a file...
var fs = require('fs');
var banner = fs.readFileSync('banner.txt');
```
