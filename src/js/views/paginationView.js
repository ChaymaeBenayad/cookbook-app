import View from "./view";
import icons from "../../img/icons.svg";

class PaginationView extends View {
  _parentEl = document.querySelector(".pagination");

  _addHandlerClick(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const currentPage = this._data.page;

    //page 1, and there are other pages
    if (currentPage === 1 && numPages > 1)
      return this._generateMarkupButtons(
        "next",
        "right",
        currentPage,
        numPages
      );

    //last page
    if (currentPage === numPages && numPages > 1)
      return this._generateMarkupButtons("prev", "left", currentPage, numPages);

    //other page
    if (currentPage < numPages)
      return [
        this._generateMarkupButtons("prev", "left", currentPage, numPages),
        this._generateMarkupButtons("next", "right", currentPage, numPages),
      ];

    //page1, and there are no other pages
    return "";
  }

  _generateMarkupButtons(control, direction, page, numPages) {
    const goToPage = direction === "left" ? page - 1 : page + 1;
    return `
    <button data-goto=${goToPage} class="btn--inline pagination__btn--${control}">
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-${direction}"></use>
        </svg>
        <span>Page ${goToPage} / ${numPages}</span>
    </button>
`;
  }
}

export default new PaginationView();
