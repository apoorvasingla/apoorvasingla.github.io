function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

animations = {

    wow: function() {
        // Wow js to load projects
        new WOW({
            offset: 150,
            mobile: false
        }).init();
    },

    sticky: function() {
        // Make section about-project sticky
        if(!isMobile()) {
            $('.about-project').sticky();
        }
    },

    niceScroll: function() {
        // Nicescroll plugin
        $("html").niceScroll();
    }
}


$(document).ready(function(){
    for(var animation in animations) {
        eval("animations." + animation + "()");
    }
});

