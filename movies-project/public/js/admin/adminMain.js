let allMoviesNumber = 0;

new WOW().init();

$(document).ready(() => {
  new WOW().init();
  getAllMovies();
});

/* This function talks with the API. */
/* Then get all movies information. */
/* Then triggers the displayAllMovies function. */
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

function displayAllMovies(dataJSON) {
  allMoviesNumber = dataJSON.length;

  for (let i = 0; i < allMoviesNumber; i++) {
    displayMovie(dataJSON[i]);
  }
}
$(document).ready(() => {
  $('[data-toggle="tooltip"]').tooltip();
});

/* Dynamically generates the html code to display the movie information. */
/* Then appends it to the DOM. */
/* function displayMovie(country, index) */
function displayMovie(data) {
  let td2;
  const index = data.id;
  /* country container ID */
  const id = `movie_id_${index}`;

  /* Movie Data */
  const { name } = data;
  /* const posterUrl = '../assets/images/test4.jpg'; */
  const { user_rating } = data;
  const { age_rating } = data;
  const { category } = data;
  const { language } = data;
  const { year } = data;

  /* Basic components of html code */
  const trHtml = $('<tr data-wow-duration="3s" class="wow "></tr>');
  if (index % 2 === 0) {
    trHtml.addClass('slideInRight');
  } else {
    trHtml.addClass('slideInLeft');
  }
  trHtml.attr('id', id);
  trHtml.attr('data-movie-name', name);
  trHtml.attr('data-wow-duration', '3s');

  /* Information td */

  /* Info Container */
  const infoObj = new Info(index, name, user_rating, age_rating, category, language, year);

  /* make object with 5 attributes */
  const values = Object.values(infoObj);

  for (let i = 0; i <= values.length; i += 1) {
    td2 = $('<td contenteditable="true"></td>');
    if (i === 1) {
      td2.attr('id', 'flag');
    }
    td2.html(values[i]);
    trHtml.append(td2);
  }

  /* Add the buttons */
  const td = $('<td></td>');
  const buttonDeleteHtml = $('<button type="button" onclick="deleteMovie(this)" class="btn btn-danger"><i class="fa fa-minus"></i></button>');
  const buttonEditHtml = $('<button type="button" onclick="updateMovie(this)" class="btn btn-primary flex-center"><i class="fa fa-edit"></i></button>');
  buttonDeleteHtml.attr('id', index);
  buttonEditHtml.attr('id', index);
  td.append(buttonDeleteHtml, buttonEditHtml);
  trHtml.append(td);
  $('tbody').append(trHtml);
}


function Info(id, name, user_rating, age_rating, category, language, year) {
  this.id = id;
  this.name = name;
  this.user_rating = user_rating;
  this.age_rating = age_rating;
  this.category = category;
  this.language = language;
  this.year = year;
}

/* Deletes a specific movie from view */
function deleteMovie(deleteButton) {
  bootbox.confirm({
    size: 'small',
    message: 'Are you sure ?',
    callback() {
      deleteMovieAjax(deleteButton.id);
      $('tbody').empty();
    },
  });
}

/* Deletes a specific movie from api */
function deleteMovieAjax(id) {
  jQuery.ajax({
    url: host + `/movies/${id}`,
    type: 'DELETE',
    cache: false,
    success() {
      $('tbody').empty();
      getAllMovies();
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

/* Update row on view */
function updateMovie(updateButton) {
  const rowId = `movie_id_${updateButton.id}`;
  const rowHtml = document.getElementById(rowId);
  updateMovieAjax(rowHtml, updateButton.id);
  $('tbody').empty();
}

/* Update row on api */
function updateMovieAjax(element, index) {
  const nameSelector = `#${element.id} > td:nth-child(2)`;
  const userRatingSelector = `#${element.id} > td:nth-child(3)`;
  const ageRatingSelector = `#${element.id} > td:nth-child(4)`;
  const categorySelector = `#${element.id} > td:nth-child(5)`;
  const languageSelector = `#${element.id} > td:nth-child(6)`;
  const yearSelector = `#${element.id} > td:nth-child(7)`;
  const name = $(nameSelector).html();
  const userRating = $(userRatingSelector).html();
  const ageRating = $(ageRatingSelector).html();
  const category = $(categorySelector).html();
  const language = $(languageSelector).html();
  const year = $(yearSelector).html();

  const newMovie = {
    id: index,
    name,
    user_rating: userRating,
    age_rating: ageRating,
    category,
    language,
    year,
  };

  jQuery.ajax({
    url: host + `/movies/${index}`,
    dataType: 'json',
    type: 'PUT',
    cache: false,
    data: newMovie,
    success() {
      getAllMovies();
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

$(document).ready(() => {
  $('#searchInput').on('input', function () {
    const value = $(this).val().toLowerCase();
    const rows = $('tbody > tr');
    for (let i = 0; i < rows.length; i += 1) {
      const movieName = ($(rows[i]).find('#flag')).html().toLowerCase();
      const selector = '#' + (rows[i]).id;

      if (movieName.includes(value)) {
        $(selector).removeClass('hidden');
      } else {
        $(selector).addClass('hidden');
      }
    }
  });
});

function addMovie(event) {
  const name = $('#name').val();
  const age_rating = $('#age_rating').val();
  const user_rating = $('#user_rating').val();
  const year = $('#year').val();
  const category = $('#category').val();
  const language = $('#language').val();
  /* Poster_Dir */
  let poster_dir = $('#poster_dir').val();
  const posterValues = poster_dir.split('\\');
  poster_dir =  posterValues[posterValues.length - 1];


  /* Make JSON file */
  const newMovie = {
    name,
    age_rating,
    user_rating,
    year,
    category,
    language,
    poster_dir,
  };

  console.log(poster_dir);

  /* POST Method */
  jQuery.ajax({
    url: host + '/movies/',
    dataType: 'json',
    type: 'POST',
    cache: false,
    data: newMovie,
    success(msg) {
      bootbox.alert({
        size: 'small',
        message: 'New Movie Added',
      });
      console.log(msg);
      getAllMovies();
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
