# late
load you a directory full of templates for great justice

we use [bliss](https://npm.im/bliss) templates, cause they're neat. consider submitting a pull request on github to add support for your favorite other templating engine.

## usage

    var late = require('late')
    var templates = late('./my/template/dir')

    templates['rel/path/to/template.bliss'](/* template params */)

All files, recursively, in the template directory are loaded and compiled into the `templates` object, which is a `Dictionary<path: String, Function>`


## installation

    $ npm install late


## running the tests

From package root:

    $ npm install
    $ npm test


## contributors

- jden <jason@denizac.org>


## license

MIT. (c) 2013 jden <jason@denizac.org>. See LICENSE.md
