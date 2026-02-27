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
  if(window.location.href.indexOf("family-auto:no") > -1) {
         document.getElementById("payment-buttons").innerHTML+= "<a class=\"button buttonBrand\" href=\"https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=KALVUZU3DCGFL\" target=\"_blank\">Family - $30</a>"
      }
  if(window.location.href.indexOf("individual-auto:no") > -1) {
         document.getElementById("payment-buttons").innerHTML+= "  <a class=\"button buttonBrand\" href=\"https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=LFVLPWWVARA48\" target=\"_blank\">Individual - $20</a>"
      }
  if(window.location.href.indexOf("lifetime-auto:no") > -1) {
         document.getElementById("payment-buttons").innerHTML+= "<a class=\"button buttonBrand\" href=\"https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=ZFW8S4NBWYKVU\" target=\"_blank\">Lifetime - $500</a>"
      }
  if(window.location.href.indexOf("individual-auto:yes") > -1) {
         document.getElementById("payment-buttons").innerHTML+= "<a class=\"button buttonBrand\" href=\"https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=88FM3YR9PHAVE\" target=\"_blank\">Individual - $20</a>"
      }

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
