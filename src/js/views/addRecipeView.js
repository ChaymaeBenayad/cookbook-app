import View from "./view";
import icons from "../../img/icons.svg";

class AddRecipeView extends View {
  _parentEl = document.querySelector(".upload");
  _window = document.querySelector(".add-recipe-window ");
  _overlay = document.querySelector(".overlay ");
  _btnOpen = document.querySelector(".nav__btn--add-recipe");
  _btnClose = document.querySelector(".btn--close-modal ");
  _message = "Your recipe is uploaded successfully!";

  constructor() {
    super();
    this._addHandlerOpenWindow();
    this._addHandlerCloseWincdow();
  }

  toggleWindow() {
    this._window.classList.toggle("hidden");
    this._overlay.classList.toggle("hidden");
  }

  _addHandlerOpenWindow() {
    this._btnOpen.addEventListener("click", this.toggleWindow.bind(this));
  }

  _addHandlerCloseWincdow() {
    this._btnClose.addEventListener("click", this.toggleWindow.bind(this));
    this._overlay.addEventListener("click", this.toggleWindow.bind(this));
  }

  _addHandlerUpload(handler) {
    this._parentEl.addEventListener("submit", function (e) {
      e.preventDefault();
      //get access to form data
      const dataArr = [...new FormData(this)];
      //convert array data to object
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
}

export default new AddRecipeView();
