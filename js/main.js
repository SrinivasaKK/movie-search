const API_URL = 'http://www.omdbapi.com/?apikey=4d11b698&type=movie';
const movieDOM = document.getElementById('main')
const sessionStorageKey = 'movieID'
const showDetailsButtonText = 'Show Details'
const hideDetailsButtonText = 'Hide Details'
function showMovies(url){
   let output = '';
    fetch(url).then(res => res.json())
    .then((response)=>{
      console.log(response)
      if(response.Response=='True'){
      let movies = response.Search;
     
      movies.forEach((movie, index) => {
        output += `
          <div class='main'>
            <div class="card text-center" >
              <img src="${movie.Poster}" alt="poster">
              <div>
              <h4><b>${movie.Title}</b></h4>
              <button id = "button_${index}" onclick="movieSelected('${movie.imdbID}', '${index}')"  class="toggle-content">${showDetailsButtonText}</button>
              <div class="content" id = "content_${index}" ></div>
              </div>
            </div>
          </div>
        `;
      });
    }

    else {
      output = `<div>
            <div class="text-center">
              <h5 class='error'>${response.Error} Please search again with specific movie name</h5>
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
 const movieDetails = sessionStorage.getItem(`${sessionStorageKey}_${id}`);
 const content = document.getElementById(`content_${index}`);
  const button  = document.getElementById(`button_${index}`);
  
   if (content.style.display === "block") {
      content.style.display = "none";
      button.innerHTML = showDetailsButtonText
    } else {
      content.style.display = "block";
       button.innerHTML = hideDetailsButtonText
    }
   const coll = document.getElementsByClassName("toggle-content");
   coll[index].classList.toggle('active')
 
   if(movieDetails) {
     content.innerHTML = movieDetails
     return;
   }

   // if movie details are not already stored in session storage, fetch from api
  const url = `${API_URL}&i=${id}`
  fetch(url).then(res => res.json())
    .then((response)=>{
    sessionStorage.setItem(`${sessionStorageKey}_${id}`,JSON.stringify(response));
    content.innerHTML = JSON.stringify(response)
    })
 
}


  function searchMovie() {
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