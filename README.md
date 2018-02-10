# Algolia Atomic
An NPM package for running atomic updates to an Algolia index

## How it works
This package runs *atomic* updates to an Algolia Index. **What does that mean?**

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

> Note, this package can only be used in NPM scripts to update a single index from a local JSON file. To update multiple indices or pass in a Javascript object, create your own script by following the instructions in [Javascript Files](#javascript-files)


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
ALGOLIA_APP_ID={{ YOUR_APP_ID}} ALGOLIA_ADMIN_KEY={{ YOUR_ADMIN_ID }} ALGOLIA_INDEX_NAME={{ YOUR_INDEX_NAME }} ALGOLIA_INDEX_FILE={{ YOUR_FILE_PATH }} npm run algolia
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
ALGOLIA_APP_ID={{ YOUR_APP_ID}} ALGOLIA_ADMIN_KEY={{ YOUR_ADMIN_ID }} YOUR_SCRIPT.js
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
    if (err) throw error

    console.log(result)
}

atomicalgolia(indexName, indexPath, cb)
```

Then call the script from your terminal as follows:

```
ALGOLIA_APP_ID={{ YOUR_APP_ID}} ALGOLIA_ADMIN_KEY={{ YOUR_ADMIN_ID }} YOUR_SCRIPT.js
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
ALGOLIA_INDEX_PATH={{ YOUR_INDEX_PATH }}
```

`ALGOLIA_APP_ID`: the ID of the Algolia app instance that contains your index.
`ALGOLIA_ADMIN_KEY`: the adminstrative key for the Algolia app instance that contains your index.
`ALGOLIA_INDEX_NAME`: the name of the index you're updating.
`ALGOLIA_INDEX_PATH`: the relative path to your index file from the root of your project.
