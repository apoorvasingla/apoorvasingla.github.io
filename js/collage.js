var hash = window.location.hash;

hide = function(element) {
    $(element).hide();
};

$(hash).appendTo('#selected');

ChangeUrl = function(title, url) {
    if (typeof (history.pushState) != "undefined") {
        var obj = { Title: title, Url: url };
        history.pushState(obj, obj.Title, obj.Url);
    } else {
        alert("Browser does not support HTML5.");
    }
}

getPosition = function(el) {
    return {
        top: $(el).offset().top,
        left: $(el).offset().left,
        width: $(el).width()
    }
}

var duration = 500;
var thumbs = {};

$('.collage-link').each(function(index) {
    thumbs[$(this).attr('id')] = $(this).find('img').attr('src');

    $(this).click(function(e) {
        small = this;
        id = $(small).attr('id');

        if (window.location.hash === '#'+id) {
            return;
        }

        e.preventDefault();

        next_id = $(small).next().attr('id');

        large = '#'+$('#selected').children().attr('id');
        a = getPosition(large);
        b = getPosition(small);
        [a.iw, a.ih] = $(large).data("size").split('x');
        [b.iw, b.ih] = $(small).data("size").split('x');

        $(large).animate({
            top: b.top - a.top,
            left: b.left - a.left,
            width: b.width
        }, duration , function() {
            if (next_id === undefined) {
                $(large).appendTo('#list').css({
                    top: 'auto',
                    left: 'auto'
                });
            }
            else {
                $(large).insertBefore('#'+next_id).css({
                    top: 'auto',
                    left: 'auto'
                });
            }
        }).find('.card-image').animate({
            height : a.ih/a.iw*b.width
        }, duration, function() {
            $(large).find('img').attr('src', thumbs[$(large).attr('id')]);
        }).find('.overlay').animate({
            opacity: 0
        }, duration, function() {
        });

        $(small).animate({
          top: a.top - b.top,
          left: a.left - b.left,
          width: a.width
        }, duration, function() {
            $(small).appendTo('#selected').css({
               top: 'auto',
               left: 'auto'
            });
        }).find('.card-image').animate({
            height: b.ih/b.iw*a.width
        }, duration, function() {
            $(small).find('img').attr('src', $(small).data("full"))
                .load(function() {
                    $('#'+id).find('.overlay').animate({
                        opacity: 0
                    }, duration);
                });
        }).find('.overlay').animate({
            opacity: 1
        }, duration, function(){
        });

        ChangeUrl(document.title, '#'+id);

    })
})
