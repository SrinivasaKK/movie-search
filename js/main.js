const movieDOM = document.getElementById('main');


function showMovies(url){
   let output = '';
    fetch(url).then(res => res.json())
    .then((response)=>{
      console.log(response)
      if(response.Response==STATIC_TEXTS.SUCCESS){
      let movies = response.Search;
      movies.forEach((movie, index) => {
        const moviePoster = `${movie.Poster}` == 'N/A'?'./default.jpg':`${movie.Poster}`
        output += `
          <div class='main'>
            <div class="card text-center" >
              <img src="${moviePoster}" alt="poster">
              <div>
              <h4><b>${movie.Title}</b></h4>
              <button id = "button_${index}" onclick="movieSelected('${movie.imdbID}', '${index}')"  class="toggle-content">${STATIC_TEXTS.showDetailsButtonText}</button>
              <div class="content" id = "content_${index}" > ${STATIC_TEXTS.LOADING}</div>
              </div>
            </div>
          </div>
        `;
      });
    }

    else {
      output = `<div>
            <div class="text-center">
              <h5 class='error'>${response.Error} ${STATIC_TEXTS.ERROR_MESSAGE}</h5>
            </div>
          </div>`
     
    }
   movieDOM.innerHTML = (output)
  })
    
    .catch((err) => {
      console.log(err);
    });
}

function movieSelected(id, index){

  // check if it is already cached 
 const movieDetails = sessionStorage.getItem(`${STATIC_TEXTS.sessionStorageKey}_${id}`);
 const content = document.getElementById(`content_${index}`);
  const button  = document.getElementById(`button_${index}`);
  
   if (content.style.display === "block") {
      content.style.display = "none";
      button.innerHTML = STATIC_TEXTS.showDetailsButtonText
    } else {
      content.style.display = "block";
       button.innerHTML = STATIC_TEXTS.hideDetailsButtonText
    }
   const coll = document.getElementsByClassName("toggle-content");
   coll[index].classList.toggle('active')
 
   if(movieDetails) {
     // parse json
     console.log(movieDetails)
    const movieDetailsJson = JSON.parse(movieDetails)
     content.innerHTML = `
     <ul>
      <li><b>Released Year:</b> ${movieDetailsJson.Released}</li>
       <li><b>Genre:</b> ${movieDetailsJson.Genre}</li>
        <li><b>Director:</b> ${movieDetailsJson.Director}</li>
         <li><b>BoxOffice:</b> ${movieDetailsJson.BoxOffice}</li>
          <li><b>Awards:</b> ${movieDetailsJson.Awards}</li>
      </ul>
     `
     return;
   }

   // if movie details are not already stored in session storage, fetch from api
  const url = `${API_URL}&i=${id}`
  fetch(url).then(res => res.json())
    .then((response)=>{
    sessionStorage.setItem(`${STATIC_TEXTS.sessionStorageKey}_${id}`,JSON.stringify(response));
    content.innerHTML = `<ul>
      <li><b>Released Year:</b> ${response.Released}</li>
       <li><b>Genre:</b> ${response.Genre}</li>
        <li><b>Director:</b> ${response.Director}</li>
         <li><b>BoxOffice:</b> ${response.BoxOffice}</li>
          <li><b>Awards:</b> ${response.Awards}</li>
      </ul>`
    })
 
}


  function searchMovie(e) {
    e.preventDefault();
    const form = document.getElementById("searchForm");
    const elements = document.getElementById("searchForm").elements;
    const obj ={};
    for(let i = 0 ; i < elements.length ; i++){
        let item = elements.item(i);
        obj[item.id] = item.value;
    }
    const searchTerm = obj.searchText;
 
    if (searchTerm) {
        showMovies(`${API_URL}"&s="${searchTerm}`);
        
    }
    form.reset()
  }




window.onscroll = () =>{stickyHeader()};
function stickyHeader() {
const header = document.getElementById("searchdiv");
const sticky = header.offsetTop;
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}