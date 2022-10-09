import View from "./view";
import previewView from "./previewView";

class ResultsView extends View {
  _parentEl = document.querySelector(".results");
  _errorMessage = "No recipes found for your query, please try again!";
  _message = "";

  _generateMarkup() {
    return this._data
      .map((result) => previewView.render(result, false))
      .join("");
  }
}

export default new ResultsView();
