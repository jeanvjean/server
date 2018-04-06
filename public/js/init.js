(function($){
  $(function(){

    $('.button-collapse').sideNav();

  }); // end of document ready
})(jQuery); // end of jQuery name space

$(document).ready(function(){
    $('.parallax').parallax();
});
$(document).ready(function() {
  $('select').material_select();
})
// var elem = document.querySelector('.carousel');
// var instance = M.Carousel.init(elem, options);

// Or with jQuery

$(document).ready(function(){
  $('.carousel').carousel();
  autoplay()
  function autoplay(){
      $('.carousel').carousel('next');
      setTimeout(autoplay,4500);
  };
});
// M.AutoInit();
