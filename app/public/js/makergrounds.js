$(document).ready(function() {
  $('.modal').modal();
  $(".button-collapse").sideNav();
  $('.materialize-textarea').trigger('autoresize');

  setTimeout(function(){
    if ($('#message-panel').length > 0) {
      $('#message-panel').fadeOut('slow');
    }
  }, 2559);
});

