var duration = 700;
var thumbs = {};

changeUrl = function(title, url) {
    if (typeof (history.pushState) != "undefined") {
        var obj = { Title: title, Url: url };
        history.pushState(obj, obj.Title, obj.Url);
    } else {
        alert("Browser does not support HTML5.");
    }
}

id_hash = function(id) {
    return ("#" + id)
}


getdata = function(el, attrs) {
    var el = $(el);
    var data = {};
    var get = {
        top: function() {
            return el.offset().top
        },
        left: function() {
            return el.offset().left
        },
        imgh: function() {
            return el.data('size').split('x')[0]
        },
        imgw: function() {
            return el.data('size').split('x')[1]
        },
        width: function() {
            return el.width()
        }
    }

    for(var i in attrs) {
        data[attrs[i]] = eval('get.' + attrs[i] + '()');
    }
    return data
}

animationData = function(i, f) {
    var id = getdata(i, ['top', 'left', 'imgh', 'imgw']);
    var fd = getdata(f, ['top', 'left', 'width']);
    return {
        top: fd.top - id.top,
        left: fd.left - id.left,
        width: fd.width,
        height: 'auto',
        img_height: id.imgh/id.imgw*fd.width
    }
}

opacity = function(o) {
    return {
        opacity: o
    }
}

smallToLarge = function(fromEl, toEl, duration) {
    var ad = animationData(fromEl, toEl);
    fromEl = $(fromEl);
    toEl = $(toEl);
    fromEl.animate(ad, duration, function() {
        fromEl.appendTo(toEl).css({
            'top': 'auto',
            'left': 'auto',
            'width': toEl.width(),
            'height': 'auto'
        });
        fromEl.find('img').attr('src', fromEl.data('full'))
            .load(function() {
                fromEl.find('.overlay').animate(opacity(0), duration);
            });
    });
    fromEl.find('p').animate({
        'font-size': 42
    }, duration);
    fromEl.find('.overlay').animate(opacity(1), duration);
};

largeToSmall = function(fromEl, beforeEl, duration) {
    var ad = animationData(fromEl, beforeEl);
    fromEl = $(fromEl);
    beforeEl = $(beforeEl);
    fromEl.animate(ad, duration, function() {
        fromEl.insertBefore(beforeEl).css({
            'top': 'auto',
            'left': 'auto',
            'width': beforeEl.width(),
            'height': 'auto'
        });
        fromEl.find('img').attr('src', thumbs[fromEl.attr('id')]);
        beforeEl.remove();
    });
    fromEl.find('p').animate({
        'font-size': 15
    }, duration)
}

saveThumb = function(el) {
    thumbs[$(el).attr('id')] = $(el).find('img').attr('src');
}

$(document).ready(function() {
    $('.collage-link').each(function(index) {
        saveThumb(this);

        $(this).click(function(e) {
            clickedEl = $(this);
            $('<div>').attr('id', 'null').insertBefore(clickedEl);

            large = $(id_hash($('#selected').children().attr('id')));
            if (window.location.hash === id_hash(clickedEl.attr('id'))) {
                return;
            }

            smallToLarge(clickedEl, '#selected', duration);
            largeToSmall(large, '#null', duration);

            changeUrl(document.title, id_hash(clickedEl.attr('id')));
            e.preventDefault();
        })
    });

    hash = window.location.hash;
    $(hash).appendTo('#selected');
    if (!$(hash).length) {
        el = $('#list').children()[0];
    }
    else {
        el = hash;
    }

    smallToLarge(el, '#selected', 0);

});
