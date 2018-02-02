# Algolia Atomic
An NPM package for running atomic updates to an Algolia index

## How it works
This package runs *atomic* updates to an Algolia Index from a local JSON file. **What does that mean?**

Simply put, this package reads a local JSON file, and updates the *new* or *updated* records, while removing deleted records. It does this *all at once*, so your index is never out of sync, and you use the smallest amount of operations possible. *(Stay on that free plan as long as you can!)*

## Installation
To install this script, you must have [Node & NPM installed](https://nodejs.org/en/download/). Once installed, run the following command in your terminal:

```
npm install atomic-algolia
```

## Usage
This package can be used in [NPM "scripts"](#npm-scripts) or in [Javascript Files](#javascript-files).

It reads a local JSON file with an array of valid records. For example:

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

> Note, this package can only be used in NPM scripts to update a single index. To update multiple indices, create your own script by following the instructions in [Javascript Files](#javascript-files)


E.g:

```
...
"scripts": {
    "algolia": "atomic-algolia"
}
...
```

Then create a `.env` file in the root of your project with the following content:

```
ALGOLIA_APP_ID={{ YOUR_APP_ID }}
ALGOLIA_ADMIN_KEY={{ YOUR_ADMIN_KEY }}
ALGOLIA_INDEX_NAME={{ YOUR_INDEX_NAME }}
ALGOLIA_INDEX_PATH={{ YOUR_INDEX_PATH }}
```

`ALGOLIA_APP_ID`: the ID of the Algolia app instance that contains your index.
`ALGOLIA_ADMIN_KEY`: the adminstrative key for the Algolia app instance that contains your index.
`ALGOLIA_INDEX_NAME`: the name of the index you're updating
`ALGOLIA_INDEX_PATH`: the relative path to your index file from the root of your project.

Lastly, run your NPM command. E.g:

```
npm run algolia
```

### Scripts
To use this package in your own local script, require it in your file. E.g:

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

Then create a `.env` file in the root of your project with the following content:

```
ALGOLIA_APP_ID={{ YOUR_APP_ID }}
ALGOLIA_ADMIN_KEY={{ YOUR_ADMIN_KEY }}
```

`ALGOLIA_APP_ID`: the ID of the Algolia app instance that contains your index.
`ALGOLIA_ADMIN_KEY`: the adminstrative key for the Algolia app instance that contains your index.