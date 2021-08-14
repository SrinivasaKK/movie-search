const API_URL = 'http://www.omdbapi.com/?apikey=4d11b698&type=movie';
const movieDOM = document.getElementById('main')
const sessionStorageKey = 'movieID'
function showMovies(url){
   let output = '';
    fetch(url).then(res => res.json())
    .then((response)=>{
      console.log(response)
      if(response.Response=='True'){
      let movies = response.Search;
     
      movies.forEach((movie) => {
        output += `
          <div class='main'>
            <div class="card text-center" >
              <img src="${movie.Poster}" alt="poster">
              <div>
              <h4><b>${movie.Title}</b></h4>
              <button  onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</button>
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

function movieSelected(id){
 const movieDetails = sessionStorage.getItem(`${sessionStorageKey}_${id}`);

 if(movieDetails) {
   // append details
   console.log(movieDetails)
   return;
 }

  const url = `${API_URL}&i=${id}`
  fetch(url).then(res => res.json())
    .then((response)=>{
    console.log(response)

    sessionStorage.setItem(`${sessionStorageKey}_${id}`,JSON.stringify(response));

    })
 
}


  function searchMovie() {
    
    const form = document.getElementById("searchForm");
    var elements = document.getElementById("searchForm").elements;
   var obj ={};
    for(var i = 0 ; i < elements.length ; i++){
        var item = elements.item(i);
        obj[item.id] = item.value;
    }
    const searchTerm = obj.searchText;
 
    if (searchTerm) {
        showMovies(`${API_URL}"&s="${searchTerm}`);
        
    }
    form.reset()
  }




window.onscroll = () => {

// Get the header
var header = document.getElementById("header");

// Get the offset position of the navbar
var sticky = header.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position

  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }

}