# Pokedex

This project is a pokedex, a catalog of pokemons and some information about each one of them. The main purpose of this project is to train and export skills/knowledge about the technologies used. The following requirements were used for the construction of this project:

* Logic;
* Quality;
* Clarity;
* Code organization.
* UI/UX

## Technology used
Technologies used in the project

`Javascript - ES6`: Vanilla javascript was used with the powers of version ES6.

`ViteJS`: The base of this project was built using the [ViteJS](https://vitejs.dev/) framework, with the TypeScript template.

`SASS`: As CCS compiler to optimize writing style files.

`IndexedDB`: As a database, in order to simplify the use of the application.


## Starting project

1. Install package dependencies with `yarn install`;
2. Execute the project with `yarn dev`;
3. Open link in your Browser `http://localhost:3000/`;
4. Build to production `yarn build`;

# Project Structure

The important structural part of this project

```
pokedex/
└── src/
    ├──── main.js
    ├──── environment.js
    ├──── components/
         ├──── home/
                ├──── home.controller.js
                ├──── home.html
                ├──── home.scss
                ├──── card/
                ├──── details/
                └──── header/
         ├──── footer/
         └──── header/
    ├──── database/
    ├──── enums/
    ├──── services/
    └──── util/
```

# UI/UX

For the use and realization of this project, good UI and UX practices were used. All screens were pre-drawn, designating all the tokens necessary for encoding the elements

![](https://github.com/felipeaufe/noughts-and-crosses/blob/main/doc/print-home.png?raw=true)

# IndexedDB

This project has a caching system using IndexedDB. The intention is to reduce the main requests already made by the API, searching first in the database and if it is not found, then it makes the request to the API

## Contributors

**@author:** 'Felipe Augusto *< [https://github.com/felipeaufe](https://github.com/felipeaufe) >*'
