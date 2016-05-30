var duration = 500;
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

getData = function(el) {
    el = $(el);
    var id = el.attr('id');
    var next_id = el.next().attr('id');
    var [iw, ih] = el.data('size').split('x');
    return {
        id: id,
        iw: iw,
        ih: ih,
        id_hash: id_hash(id),
        next_id: next_id,
        next_id_hash: id_hash(next_id),
        width: el.width(),
        top: el.offset().top,
        left: el.offset().left,
        full: el.data('full'),
        thumb: thumbs[id]
    }
}

saveThumb = function(el) {
    thumbs[$(el).attr('id')] = $(el).find('img').attr('src')
}

finalPosition = function(i, f) {
    return {
        top: f.top - i.top,
        left: f.left - i.left,
        width: f.width,
        img_height: i.ih/i.iw*f.width
    }
}

topLeftAuto = {
    top: 'auto',
    left: 'auto'
}

opacity = function(o) {
    return {
        opacity: o
    }
}

largeToSmall = function(el, a, b, c, d, duration) {
    el.animate(c, duration, function() {
        if (b.next_id === undefined) {
            el.appendTo('#list').css(topLeftAuto);
        }
        else {
            el.insertBefore(b.next_id_hash).css(topLeftAuto);
        }
    }).find('.card-image').animate({
        height : c.img_height
    }, duration, function() {
        el.find('img').attr('src', a.thumb);
    }).find('.overlay').animate(opacity(0), duration);
}

smallToLarge = function(el, a, b, c, d, duration) {
    el.animate(d, duration, function() {
        el.appendTo('#selected').css(topLeftAuto);
    }).find('.card-image').animate({
        height: d.img_height
    }, duration, function() {
        el.find('img').attr('src', b.full)
            .load(function() {
                $(b.id_hash).find('.overlay').animate(opacity(0), duration);
            });
    }).find('.overlay').animate(opacity(1), duration);
}

$('.collage-link').each(function(index) {
    saveThumb(this);

    $(this).click(function(e) {
        small = $(this);

        large = $(id_hash($('#selected').children().attr('id')));
        a = getData(large);
        b = getData(small);
        c = finalPosition(a,b); //final position of large
        d = finalPosition(b,a); //final position of small

        if (window.location.hash === '#'+b.id) {
            return;
        }

        largeToSmall(large, a, b, c, d, duration);
        smallToLarge(small, a, b, c, d, duration);

        changeUrl(document.title, b.id_hash);
        e.preventDefault();
    })
})

hash = window.location.hash;
if (!$(hash).length) {
    $($('#list').children()[0]).appendTo('#selected').css(topLeftAuto);
}
else {
    $(hash).appendTo('#selected').css(topLeftAuto);
}
