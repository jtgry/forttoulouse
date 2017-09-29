$(document).ready(function () {
  var menuButton = document.getElementById('navButton');
  menuButton.addEventListener('click', function (e) {
      menuButton.classList.toggle('is-active');
      e.preventDefault();
  });
  $('.nav-button').click(function() {
    $(".mobile-nav").fadeToggle(500);
  });
  $('.search-icon').click(function() {
    $(".search-form").fadeToggle(500);
    $(".search-form-wrapper").toggleClass("search-form-wrapper-on");
    $(".nav").toggleClass("nav-off");
    document.getElementById("search-box").focus();
  });
  $('.close-icon').click(function() {
    $(".search-form").fadeToggle(500);
    $(".search-form-wrapper").toggleClass("search-form-wrapper-on");
    $(".nav").toggleClass("nav-off");
  });
  $(window).on('scroll',function() {
      if ($(this).scrollTop() > 400) {
        $(".nav").removeClass("fade-in-slow");
        $(".nav").removeClass("nav-up");
        $(".nav").addClass("nav-down");
      }
      else {
      $(".nav").addClass("nav-fixed");
      $(".nav").removeClass("nav-down");
      $(".nav").removeClass("nav-up");

		  }
    });
});
//List JS Code
