const movieDOM = document.getElementById("main");
const form = document.getElementById("searchForm");

function showMovies(url) {
  let output = "";
  fetch(url)
    .then((res) => res.json())
    .then((response) => {
      console.log(response);
      if (response.Response == STATIC_TEXTS.SUCCESS) {
        let movies = response.Search;
        movies.forEach((movie, index) => {
          output += returnMovieCardsDOM(movie, index);
        });
      } else {
        output = returnErrorDom(response);
      }
      movieDOM.innerHTML = output;
    })

    .catch((err) => {
      console.log(err);
    });
}

function showMovieDetails(id, index) {
  // check if it is already cached
  const movieDetails = sessionStorage.getItem(
    `${STATIC_TEXTS.SESSION_STORAGE_KEY}_${id}`
  );
  const content = document.getElementById(`content_${index}`);
  const button = document.getElementById(`button_${index}`);

  if (content.style.display === "block") {
    content.style.display = "none";
    button.innerHTML = STATIC_TEXTS.SHOW_DETAILS_BUTTON_TEXT;
  } else {
    content.style.display = "block";
    button.innerHTML = STATIC_TEXTS.HIDE_DETAILS_BUTTON_TEXT;
  }
  const coll = document.getElementsByClassName("toggle-content");
  coll[index].classList.toggle("active");

  if (movieDetails) {
    // parse json
    const movieDetailsJson = JSON.parse(movieDetails);
    content.innerHTML = returnDetailsDOM(movieDetailsJson);
    return;
  }

  // if movie details are not already stored in session storage, fetch from api
  const url = `${API_URL}&i=${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((response) => {
      sessionStorage.setItem(
        `${STATIC_TEXTS.SESSION_STORAGE_KEY}_${id}`,
        JSON.stringify(response)
      );
      content.innerHTML = returnDetailsDOM(response);
    });
}

form.addEventListener("submit", (e) => {
  searchMovie(e);
});

function searchMovie(e) {
  e.preventDefault();

  const elements = document.getElementById("searchForm").elements;
  const obj = {};
  for (let i = 0; i < elements.length; i++) {
    let item = elements.item(i);
    obj[item.id] = item.value;
  }
  const searchTerm = obj.searchText;

  if (searchTerm) {
    showMovies(`${API_URL}"&s="${searchTerm}`);
  }
  form.reset();
}
