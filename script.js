const tmdbKey = "0732eb42369d55487f89f84b2fb057e9";
const tmdbBaseUrl = "https://api.themoviedb.org/3";
const playBtn = document.getElementById("playBtn");

const getGenres = async () => {
  let genreRequestEndpoint = "/genre/movie/list";
  let requestParams = `?api_key=${tmdbKey}`;
  let urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      let jsonResponse = await response.json();
      //console.log(jsonResponse);
      let genres = jsonResponse.genres;
      //console.log(genres);
      return genres;
    } throw new Error ('Request Failed!')
  } catch (error) {
    console.log(error);
  }
};

const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  let discoverMovieEndpoint = "/discover/movie";
  let requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`;
  let urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      let jsonResponse = await response.json();
      //console.log(jsonResponse);
      let movies = jsonResponse.results;
      //console.log(movies);
      return movies;
    }throw new Error ('Request Failed!')
  } catch (error) {
    console.log(error);
  }
};

const getMovieInfo = async (movie) => {
  let movieId = movie.id;
  let movieEndpoint = `/movie/${movieId}`;
  let requestParams = `?api_key=${tmdbKey}`;
  let urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      let movieInfo = await response.json();
      return movieInfo;
    }throw new Error ('Request Failed!')
  } catch (error) {
    console.log(error);
  }
};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async () => {
  const movieInfo = document.getElementById("movieInfo");
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  }
  let movies = await getMovies();
  let randomMovie = await getRandomMovie(movies);
  let info = await getMovieInfo(randomMovie);
  displayMovie(info);
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;
