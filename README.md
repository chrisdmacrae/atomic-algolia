# Algolia Atomic
An NPM package for running atomic updates to Algolia indices

[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg)](#contributors) 
[![npm](https://img.shields.io/npm/dt/atomic-algolia.svg)](https://www.npmjs.com/package/atomic-algolia) 


## How it works
This package runs *atomic* updates to Algolia Indices. **What does that mean?**

Simply put, this package reads your local index, and updates the *new* or *updated* records, while removing deleted records.

It does this *all at once*, so your index is never out of sync with your content, and you use the smallest amount of operations possible. 

*(Stay on that free plan as long as you can!)*

## Installation
To install this script, you must have [Node & NPM installed](https://nodejs.org/en/download/). Once installed, run the following command in your terminal:

```
npm install atomic-algolia
```

## Usage
This package can be used in [NPM "scripts"](#npm-scripts) or in [Javascript Files](#javascript-files).

It reads an array of objects or local JSON file with an array of valid records. For example:

```
[
    {
        "objectID": "1",
        "title": "An example record"
    }
]
```

### NPM Scripts
To use this package in your [NPM scripts](https://docs.npmjs.com/misc/scripts), add the command to your script in `package.json`. 

> Note, this package can only be used in NPM scripts to update a single index from a local JSON file. To update multiple indices or pass in a Javascript object, create your own script by following the instructions in [Javascript Files](#scripts)


E.g:

```
...
"scripts": {
    "algolia": "atomic-algolia"
}
...
```

Lastly, run your NPM command. E.g:

```
ALGOLIA_APP_ID={{ YOUR_APP_ID}} ALGOLIA_ADMIN_KEY={{ YOUR_ADMIN_KEY }} ALGOLIA_INDEX_NAME={{ YOUR_INDEX_NAME }} ALGOLIA_INDEX_FILE={{ YOUR_FILE_PATH }} npm run algolia
```

### Scripts
To use this package in your own local script, require it in your file. E.g:

#### Using with a local JSON file

```
var atomicalgolia = require("atomic-algolia")
var indexName = "example_index"
var indexPath = "./index.json"
var cb = function(error, result) {
    if (err) throw error

    console.log(result)
}

atomicalgolia(indexName, indexPath, cb)
```

Then call the script from your terminal as follows:

```
ALGOLIA_APP_ID={{ YOUR_APP_ID}} ALGOLIA_ADMIN_KEY={{ YOUR_ADMIN_KEY }} node YOUR_SCRIPT.js
```

#### Using with an Array of Objects

```
var atomicalgolia = require("atomic-algolia")
var indexName = "example_index"

var indexData = [
    {
        objectID: "1",
        title: "An example record"
    }
]

var cb = function(error, result) {
    if (error) throw error

    console.log(result)
}

atomicalgolia(indexName, indexData, cb)
```

Then call the script from your terminal as follows:

```
ALGOLIA_APP_ID={{ YOUR_APP_ID}} ALGOLIA_ADMIN_KEY={{ YOUR_ADMIN_KEY }} node YOUR_SCRIPT.js
```


## Using a `.env` file
A `.env` file can be added to the root of your project with the required environment variables. This way, you don't have to specify them in `package.json` or when running the command.

Run the following command:

```
touch .env && open .env
```

Then paste in the following contents, and update the placeholder variable marked with braces `{{ }}`

```
ALGOLIA_APP_ID={{ YOUR_APP_ID }}
ALGOLIA_ADMIN_KEY={{ YOUR_ADMIN_KEY }}
ALGOLIA_INDEX_NAME={{ YOUR_INDEX_NAME }}
ALGOLIA_INDEX_FILE={{ YOUR_INDEX_FILE }}
```

`ALGOLIA_APP_ID`: the ID of the Algolia app instance that contains your index.

`ALGOLIA_ADMIN_KEY`: the adminstrative key for the Algolia app instance that contains your index.

`ALGOLIA_INDEX_NAME`: the name of the index you're updating.

`ALGOLIA_INDEX_FILE`: the relative path to your index file from the root of your project.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars2.githubusercontent.com/u/6855186?v=4" width="100px;"/><br /><sub><b>chrisdmacrae</b></sub>](https://github.com/chrisdmacrae)<br />[💬](#question-chrisdmacrae "Answering Questions") [💻](https://github.com/algolia/atomic-algolia/commits?author=chrisdmacrae "Code") [🎨](#design-chrisdmacrae "Design") [📖](https://github.com/algolia/atomic-algolia/commits?author=chrisdmacrae "Documentation") | [<img src="https://avatars2.githubusercontent.com/u/283419?v=4" width="100px;"/><br /><sub><b>Tim Carry</b></sub>](http://www.pixelastic.com/)<br />[💬](#question-pixelastic "Answering Questions") [💻](https://github.com/algolia/atomic-algolia/commits?author=pixelastic "Code") [📖](https://github.com/algolia/atomic-algolia/commits?author=pixelastic "Documentation") |
| :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!
