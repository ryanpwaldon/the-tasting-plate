---
---

$(function () {

  /* moment.js 
  ========================================================================================================*/

  $('.date').each(function (index, dateElem) {
    var $dateElem = $(dateElem);
    var formatted = moment($dateElem.text(), 'YYYY-MM-DD').fromNow();
    $dateElem.text(formatted);
  });

  /* instagram feed
  ========================================================================================================*/

  var token = '4340303370.f4990fa.894ffa2198414ffaa606a6b5252244ea', // learn how to obtain it below
    userid = 'self', // User ID - get it in source HTML of your Instagram profile or look at the next example :)
    num_photos = 4; // how many photos do you want to get

  $.ajax({
    url: 'https://api.instagram.com/v1/users/' + userid + '/media/recent',
    dataType: 'jsonp',
    type: 'GET',
    data: {access_token: token, count: num_photos},
    success: function(data){
      console.log(data);
      for( x in data.data ){
        $('.insta-feed').append('<a href="' + data.data[x].link + '" target="blank_"><img class="insta" src="' + data.data[x].images.low_resolution.url + '" alt="insta-' + x + '"></a>');
        // data.data[x].images.low_resolution.url - URL of image, 306х306
        // data.data[x].images.thumbnail.url - URL of image 150х150
        // data.data[x].images.standard_resolution.url - URL of image 612х612
        // data.data[x].link - Instagram post URL
      }
    },
    error: function(data){
      console.log(data); // send the error notifications to console
    }
  });

  /* fixing article-index formatting
  ========================================================================================================*/

  var articleIndexLength = $('.article-index ul li').length,
    divsToAdd = 0;
  if (articleIndexLength % 3 > 0) {
    divsToAdd = 3 - (articleIndexLength % 3);
  }

  for (var i = 0; i < divsToAdd; i++) {
    $('.article-index ul').append('<li class="article-item" style="visibility: hidden;"><div class="item-image"></div></li>');
  }

  /* email cipher
  ========================================================================================================*/

  function decode(a) {
  // ROT13 : a Caesar cipher 
  // letter -> letter' such that code(letter') = (code(letter) + 13) modulo 26
  return a.replace(/[a-zA-Z]/g, function(c) {
    return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
    });
  }
  $('.email').append("<span>" + decode("lnagvatgznb@tznvy.pbz") + "</span>");

  /* dynamic copyright year
  ========================================================================================================*/

  $('.copyright-year').append(moment().get('year'));

  /* hearts
  ========================================================================================================*/

    if (rating % 1 === 0.5) {
      $('.rating').append('<img class="heart" src="{{ site.baseurl }}/assets/img/misc/heart-half.svg" alt="heart-half">');
      rating = rating - 0.5;
      for (i = 0; i < rating; i ++) {
        $('.rating').append('<img class="heart" src="{{ site.baseurl }}/assets/img/misc/heart.svg" alt="heart">');
      }
    } else {
      for (i = 0; i < rating; i ++) {
        $('.rating').append('<img class="heart" src="{{ site.baseurl }}/assets/img/misc/heart.svg" alt="heart">');
      }
    }

});
