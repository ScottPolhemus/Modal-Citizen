var $ = require('jquery')
require('stellar')
require('mixitup')

module.exports = {
  init: function() {

    // Stellar Parallax
    $(window).stellar({
      positionProperty: 'transform',
      hideDistantElements: false
    })

    // MixItUp Filters
    $('.team').mixItUp({
      selectors: {
        target: '.person',
        filter: '.filter li',
        sort: '.sort li'
      },
      controls: {
        live: true,
        activeClass: false
      },
      animation: {
        easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }})
      .on('click', '.sort li', this.onSort)
      .on('click', '.filter li', this.onFilter)


    // Back to top

    $('.back-to-top').on('click', function(event) {
      event.preventDefault();

      $('html,body').animate({
        scrollTop: 0
      }, 2000)
    })
  },

  onSort: function(event) {
    var $this = $(this),
      sort = $(this).attr('data-sort')

    // Toggle up/down sorters and add class for current state
    if(sort.indexOf(':asc') != -1) {

      if($this.hasClass('up')) {
        $this.attr('data-sort', sort.replace(':asc', ':desc'))
          .addClass('down').removeClass('up')
      } else {
        $this.addClass('up')
      }

    } else if(sort.indexOf(':desc') != -1) {

      if($this.hasClass('down')) {
        $this.attr('data-sort', sort.replace(':desc', ':asc'))
          .addClass('up').removeClass('down')
      } else {
        $this.addClass('down')
      }

    } else {

      $this.addClass('special')
      
    }

    $this.siblings().removeClass('up down special')
  },

  onFilter: function(event) {
    var $this = $(this)

    $this.addClass('on')
      .siblings().removeClass('on')
  }
}