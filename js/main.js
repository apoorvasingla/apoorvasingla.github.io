{
    transition_delay: 1000
}/*!
 * Start Bootstrap - Agnecy Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

$('div.modal').on('show.bs.modal', function() {
	var modal = this;
	var hash = modal.id;
	window.location.hash = hash;
	window.onhashchange = function() {
		if (!location.hash){
			$(modal).modal('hide');
		}
	}
});

$('.skills-box').waypoint({
    handler: function(event, direction) {
        $('.progress .progress-bar').progressbar({});
    },
    offset: '60%'
});

$(document).ready(function($){
    $('.all-skills').owlCarousel({
        slideSpeed: 400,
         itemsCustom: [
             [0, 4],
             [400, 4],
             [500, 5],
             [620, 6],
             [700, 8],
             [992, 5],
             [1200, 6]
         ],
    });

    var sklData = $('.all-skills').data('owlCarousel');

    var sklTgt = $('.nav-btn').find('.go');
    sklTgt.on('click', function(e){
        e.preventDefault();
        if( $(this).hasClass('go-left') ) {
            sklData.prev();
        } else {
            sklData.next();
        }
    });
});

$(document).ready(
  function() { 
    $("html").niceScroll();
  }
);
