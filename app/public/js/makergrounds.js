$(document).ready(function() {
  $('.modal').modal();
  $(".button-collapse").sideNav();
  $('.materialize-textarea').trigger('autoresize');

  setTimeout(function(){
    if ($('#message-panel').length > 0) {
      $('#message-panel').fadeOut('slow');
    }
  }, 2559);

  // Filter for Tools page
  //Listen for a selection to be made.
  //if selection is made
  //then set display: none for everything but that selection
  $('select').material_select();
  $('#tool-search')
    .change(function() {
      if ( $('#tool-search').val() == 'all' ) {
        console.log('here');
        $('.item-row').show();
      } else {
        //Hide all locations
        $('.item-row').hide();
        var showing = [];
        $( "#tool-search option:selected").each(function() {
          showing.push($(this).val());
        });
        $.each(showing, function(key, value) {
          $('.' + value).show();
        });
      }
    });
});

