const host = "https://rarrum.herokuapp.com/api";

/* When the logo us clicked, this functions runs */
function returnToHomePage() {
  location.href = "/";
}

/* Update the header when the document loads and on resize */
/*
$(document).ready(function () {

    chooseHeader();
    $(window).resize(chooseHeader);
})
*/

/* Select the appropiate header file according to the window width */
/*
function chooseHeader() {
    if (window.innerWidth < 576)
        $('.header').load('../html/headerMobile.html');
    else
        $('.header').load('../html/headerPc.html');
}
*/

function makeRatingStars(rating) {
  const bothStarsContainer = $('<div class="star-rating"></div>');
  const backStars = $('<div class="back-stars"></div>');
  const frontStars = $(
    `<div class="front-stars" style="width:${rating}"></div>`
  );
  const star = '<i class="fa fa-star" aria-hidden="true"></i>';

  frontStars.append($(star + star + star + star + star));
  const fiveStars = $(star + star + star + star + star);
  backStars.append(fiveStars);
  backStars.append(frontStars);
  bothStarsContainer.append(backStars);

  return bothStarsContainer;
}

function arrayToString(array) {
  let outStr = "";
  for (let i = 0; i < array.length; i++) {
    outStr += array[i];
    if (array.length - 1 != i) {
      outStr += ", ";
    }
  }

  return outStr;
}

function objectToString(p) {
  /* key is key and value is p[key] */
  let result = "";
  for (const key in p) {
    if (p.hasOwnProperty(key)) {
      result += p[key] + ", ";
    }
  }

  /* Delete the additional comma and space at the end */
  const length = result.length - 2;
  result = result.slice(0, length);
  return result;
}
