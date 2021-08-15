window.onscroll = () => {
  stickyHeader();
};
function stickyHeader() {
  const header = document.getElementById("searchdiv");
  const sticky = header.offsetTop;
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

function returnDetailsDOM(movie) {
  return `<ul>
      <li><b>Released Year:</b> ${movie.Released}</li>
       <li><b>Genre:</b> ${movie.Genre}</li>
        <li><b>Director:</b> ${movie.Director}</li>
         <li><b>BoxOffice:</b> ${movie.BoxOffice}</li>
          <li><b>Awards:</b> ${movie.Awards}</li>
      </ul>`;
}

function returnMovieCardsDOM(movie, index) {
  const moviePoster =
    `${movie.Poster}` == "N/A" ? "./default.jpg" : `${movie.Poster}`;
  return `
          <div class='main'>
            <div class="card text-center" >
              <img src="${moviePoster}" alt="poster">
              <div>
              <h4><b>${movie.Title}</b></h4>
              <button id = "button_${index}" onclick="showMovieDetails('${movie.imdbID}', '${index}')"  class="toggle-content">${STATIC_TEXTS.SHOW_DETAILS_BUTTON_TEXT}</button>
              <div class="content" id = "content_${index}" > ${STATIC_TEXTS.LOADING}</div>
              </div>
            </div>
          </div>
        `;
}

function returnErrorDom(response) {
  return `<div>
            <div class="text-center">
              <h5 class='error'>${response.Error} ${STATIC_TEXTS.ERROR_MESSAGE}</h5>
            </div>
          </div>`;
}
