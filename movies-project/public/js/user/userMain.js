let allMoviesNumber = 0;
new WOW().init();
$(document).ready(() => {
  new WOW().init();
  displayAllMovies();
});
/* similar but not this */
/* This function talks with the API and get all movies information then triggers the displayAllMovies function */
function getAllMovies() {
  jQuery.ajax({
    url: host + '/movies',
    dataType: 'json',
    type: 'GET',
    cache: false,
    success(dataJSON) {
      displayAllMovies(dataJSON);
    },
    error() {
      bootbox.alert({
        size: 'small',
        title: 'Oooops',
        message: 'Something went wrong. Refresh the page or visit us later. Thank u',
      });
    },
  });
}


function displayAllMovies() {
  allMoviesNumber = 3;

  for (let i = 0; i < allMoviesNumber; i++) { displayMovie(i); }
}


/* Dynamically generates the html code to display the country information and adds it to index.html */
/* function displayMovie(country, index) */
function displayMovie(index) {
  /* country container ID */
  const id = 'movie_id_' + index;

  /* Movie Data */
  const name = 'The Avengers';
  const posterUrl = '../assets/images/test4.jpg';
  const user_rating = 6;
  const age_rating = 'PG13';
  const category = ['action', 'adventure', 'family'];
  const language = 'en';
  const year = '2017';

  /* Basic components of html code */
  const movieContainerHtml = $('<div class="hidden list-group-item flex-center clearfix movie-container wow"></div>');
  if (index % 2 === 0) {
    movieContainerHtml.addClass('slideInRight');
  } else {
    movieContainerHtml.addClass('slideInLeft');
  }
  movieContainerHtml.attr('id', id);
  movieContainerHtml.attr('data-movie-name', name);
  movieContainerHtml.attr('data-wow-duration', '3s');

  /* Poster Div */
  const posterContainerHtml = $('<div class="poster-container"></div>');
  const poster = $('<img class="poster">');
  poster.attr('src', posterUrl);
  poster.attr('alt', name + '.jpg');
  posterContainerHtml.append(poster);

  /* Info Container */
  const infoContainerHtml = $('<div class="info-container hidden"></div>');
  const infoObj = new info(name, category, age_rating, year, language);

  /* make object with 5 attrbutes */
  for (const i in infoObj) {
    if (infoObj.hasOwnProperty(i)) {
      var key = captalize(i);
      var value = captalize(':  ' + infoObj[i]);
    }

    const infoLine = $('<div class="flex-row"></div>');
    const keySpanHTML = $('<span class="key-font"></span>');
    const valueSpanHTML = $('<span class="value-font"></span>');
    keySpanHTML.text(key);
    valueSpanHTML.text(value);

    infoLine.append(keySpanHTML);
    infoLine.append(valueSpanHTML);
    infoContainerHtml.append(infoLine);
  }

  /* Button + rating */
  const buttonAndRatingHtml = $('<div class="flex-center flex-column"></div>');
  const button = $('<button type="button" onclick="deleteMovieFromFavorites(index)" class="btn btn-danger">Remove</button>');
  button.attr('id', index);

  const stars = makeRatingStars('50%');

  buttonAndRatingHtml.append(button, stars);

  /* Add Everything */

  movieContainerHtml.append(posterContainerHtml, infoContainerHtml, buttonAndRatingHtml);

  $('.list-group').append(movieContainerHtml);
}


function info(name, category, age_rating, year, language) {
  this.name = name;
  this.category = category;
  this.age_rating = age_rating;
  this.year = year;
  this.language = language;
}

function captalize(str) {
  const result = new String(str);
  return result.charAt(0).toUpperCase() + result.slice(1);
}

function deleteMovieFromFavorites(id) {

  /* id = movie id {0 1 2 } */
  /* update API */
  /* on success --> getAllMovies */
  /*

    jQuery.ajax({
        url: 'https://rarrum.herokuapp.com/api/movies',
        dataType: 'json',
        type: 'GET',
        cache: false,
        success: function (dataJSON) {
            displayAllMovies(dataJSON);
        },
        error: function () {
                  bootbox.alert({
        size: 'small',
        title: 'Oooops',
        message: 'Something went wrong. Refresh the page or visit us later. Thank u',
      });
        }
    });
    */
}
