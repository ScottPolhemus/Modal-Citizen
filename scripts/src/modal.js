var $ = require('jquery')

module.exports = {
  init: function() {

    $('body').on('click', '#Activate, .modal', function() {
      $('.modal').toggleClass('out')
    })

  }
}