# ts-jsx-loader

Webpack loader for transforming JSX based on special syntax. Meant to be used
with a [TypeScript loader](https://github.com/jbrantly/ts-loader) to allow using JSX with TypeScript.

## Installation

```
npm install ts-jsx-loader
```

## Usage

The loader chain should go from ts-jsx-loader into a TypeScript loader. Your
configuration will look something like this:

```
module.exports = {
    entry: './app.ts',
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.js', '.ts']
    },
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts-loader!ts-jsx-loader' }
        ]
    }
}
```

ts-jsx-loader defines a fake API on React called React.jsx(). You should
reference the included `react-jsx.d.ts` definition file for IDE support. This
API accepts either a string or nothing. You can then create JSX as a string
or within multiline comments.

```
///<reference path="path/to/react-jsx.d.ts"/>

import React = require('react');

var message = 'Hello world'

React.render(React.jsx(/*
    <div>
        <span>{message}</span>
    </div>
*/), document.body)

// or if you're using TypeScript 1.4 or above

React.render(React.jsx(`
    <div>
        <span>{message}</span>
    </div>
`), document.body)
```

The loader will find occurrences of React.jsx() and transform them into
React.createElement() calls prior to being passed to the TypeScript
loader.

## License

The MIT License (MIT)

Copyright (c) 2015 James Brantly

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.