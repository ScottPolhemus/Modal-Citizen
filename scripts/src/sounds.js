var $ = require('jquery')

module.exports = {
  init: function() {

    $('[data-sound-hover]').on('mouseover', function() {
    	var soundID = $(this).attr('data-sound-hover')

    	$('#'+soundID)[0].play()
    })

  }
}