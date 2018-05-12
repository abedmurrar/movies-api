let allMoviesNumber = 0;

const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1500,
});

$(document).ready(() => {
  $('html').bind('wheel DOMMouseScroll', () => {
    const sbHeight = $(window).scrollTop();

    for (let i = 0; i < allMoviesNumber; i++) {
      const selector = `#movie_id_${i}`;
      const elementOffset = $(selector).position().top - window.innerHeight - 100;

      if (elementOffset < sbHeight) {
        $(selector).addClass('animated');
        $(selector).addClass('fadeInLeftBig');
        $(selector).removeClass('hidden');
      } else {
        $(selector).addClass('hidden');
      }
    }
  });

  getAllMovies();
});

/* This function talks with the API.
/* and get all movies information.
/* then triggers the displayAllMovies function */
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
      alert('Something went wrong. Refresh the page or visit us later. Thank u');
    },
  });
}

/* Dynamically generates the html code to display the movie information. */
function displayMovie(movie, index) {
  /* country container ID */
  const id = `movie_id_${index}`;

  /* Movie Data */
  const { name } = movie;
  const poster = movie.poster_dir;
  const rating = parseInt(movie.user_rating * 10, 10);

  /* Basic components of html code */
  const movieContainerHtml = $('<div class="hidden movie-container flex-column flex-center"></div>');
  movieContainerHtml.attr('id', id);
  movieContainerHtml.attr('data-movie-name', name);

  /* Info Container */
  const infoContainerHtml = $('<div class="hidden flex-custom flex-center"></div>');
  /* Poster */
  const posterAll = $('<img class="poster">');
  posterAll.attr('src', '/api/img' + poster);
  posterAll.attr('alt', `${name}.jpg`);

  /* Movie Title */
  const movieTitle = $('<p class="first-font-style" style="margin-top: 17px; padding-right: 5px;"></p>').text(name);

  /* */
  const stars = makeRatingStars(`${rating}%`);

  /* Add Everything */

  movieContainerHtml.append(posterAll, infoContainerHtml);
  infoContainerHtml.append(movieTitle, stars);

  $('.movies-container').append(movieContainerHtml);
}

function displayAllMovies(data) {
  allMoviesNumber = data.length;

  for (let i = 0; i < allMoviesNumber; i++) {
    displayMovie(data[i], i);
  }
}

/* Remove the window loader after the window content has fully loaded */
$(window).on('load', () => {
  console.log('hi1');
  $('body').css('overflow', 'auto');
  $('.loading-overlay > .spinner').fadeOut(3000, function () {
    $(this).parent().fadeOut('slow', function () {
      $(this).remove();
    });
  });
});
