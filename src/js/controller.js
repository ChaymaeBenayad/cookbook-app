import * as model from "./model.js";
import { MODAL_CLOSE_SEC } from "./config.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import bookmarkView from "./views/bookmarkView.js";
import addRecipeView from "./views/addRecipeView.js";
import "core-js/stable";

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    //render spinner
    recipeView.renderSpinner();

    //1) Update bookmarks view to mark selected bookmark
    bookmarkView.update(model.state.bookmarks);

    //2) Update results view to mark selected result
    resultsView.update(model.getSearchResultsPage());

    //3) Loading recipes
    await model.loadRecipe(id);

    //4) Rendering recipes
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    //1) get search query
    const query = searchView.getQuery();
    if (!query) return;

    //render spinner
    resultsView.renderSpinner();

    //2) Loading search results
    await model.loadSearch(query);

    //Rendering all results
    // resultsView.render(model.state.search.results);

    //3) Rendering results per page
    resultsView.render(model.getSearchResultsPage());

    //4) Rendering initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlPagination = function (goToPage) {
  //3) Rendering results of clicked page
  resultsView.render(model.getSearchResultsPage(goToPage));

  //4) Rendering new pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //update the recipe servings (in state)
  model.updateServings(newServings);

  //update the recipe view
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  //add or remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  //update the recipe view
  recipeView.update(model.state.recipe);

  //render bookmarks
  bookmarkView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarkView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    //render loading spinner
    addRecipeView.renderSpinner();

    //upload new recipe data
    await model.uploadRecipe(newRecipe);

    //render uploaded recipe
    recipeView.render(model.state.recipe);

    //render success message
    addRecipeView.renderMessage();

    //render bookmark view
    bookmarkView.render(model.state.bookmarks);

    //change ID in Url
    window.history.pushState(null, "", `#${model.state.recipe.id}`);

    //close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    //render error for wrong ingredient format
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookmarkView.addHandlerRenderBookmarks(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView._addHandlerClick(controlPagination);
  addRecipeView._addHandlerUpload(controlAddRecipe);
};
init();
