# Cookbook Web Application

Cookbook is a modern web application dedicated for people who love cooking, want to discover new recipes and want to add their own recipes. It interacts with a third party API to get and post recipes data. It is developed using HTML5, SCSS and JavaScript. It is built using Parcel2.

## Screenshot

![cookbook-screenshot](https://user-images.githubusercontent.com/78702422/195714789-e6c918e2-1d4f-4aff-a6cd-968a2e5073a8.png)

## Features

- Search for a recipe
- Display search results with pagination
- Display recipe with cooking time, servings and ingredients
- Quantity of ingredients changes depending on servings number
- Bookmarking a recipe
- User can upload his own recipes
- User can only see its own recipes
- Store bookmarked recipes data in the browser using local storage API

## Lessons Learned

- Using the MVC (Model View Controller) architecture to organize the code
- Working with ES6 modules (import a module, export a module...)
- Working with a third party API (Application Programming Interface) to get and post recipes data
- Working with asynchronous javascript (setTimeout() function, async...await function)
- Handling errors (try...catch block, throw new Error())
- Building the application using Parcel (bundling ES6 modules)

## API Documentation

From [API Documentation](https://forkify-api.herokuapp.com/v2), you can generate your API key.

## Run Project Locally

Clone the project

```bash
  git clone https://github.com/ChaymaeBenayad/cookbook-app
```

Go to the project directory

```bash
  cd cookbook-app
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

Enter your API key in `src/js/config.js`

```bash
  const API_KEY = "Your API key";
```

## Demo

https://cookbook-recipe-app.netlify.app
