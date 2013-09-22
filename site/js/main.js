gallery = [];

$(document).ready(function(){
    main();
});

function main(){
    $('#snap').click(function(){
        takeScreenshot();
        return false;
    });
    $('#gallery').click(function(){
        return false;
    });
    buildGallery();
    lastGallery();
}

function takeScreenshot() {
    $.ajax({
        url:'/screenshot.py',
        error: function(jqXHR, textStatus, errorThrown)
        {
            alert(textStatus + ": " + errorThrown);
        },
        success: function(data, textStatus, jqXHR)
        {
            flash();
            gallery.push(data);
            lastGallery();
        }
    });
}

function buildGallery() {
    var url = '/img/snap/';
    $.ajax({
        url: url,
        async: false,
        error: function(jqXHR, textStatus, errorThrown)
        {
            alert(textStatus + ": " + errorThrown);
        },
        success: function(data, textStatus, jqXHR)
        {
            $(data).find('a:contains(.png)').each(function(){
                gallery.push(url + $(this).attr('href'));
            });
        }
    });
}

function lastGallery() {
    var last = gallery.slice(0, 4);
    var res = $('#last-snap');
    $.each(last, function(key, value){
        var img = $('<img>');
        img.attr('src', value);
        img.attr('class', 'thumb');
        img.click(function(e){
            fullScreenPicture(img, e);
        });
        res.append(img);
    });
}

function fullScreenPicture(img, e){
    e.stopPropagation();
    img.css({
        position: 'absolute',
        'z-index': 9999,
    });
    img.animate({
        width: '80%',
        height: '80%',
        margin: '9%',
        top: $(window).scrollTop(),
        left: $(window).scrollLeft(),
    });
    $('body').click(function(e){
        reducePicture(img, e);
    });
    img.click(function(e){
        reducePicture(img, e);
    });
}

function reducePicture(img, e) {
    e.stopPropagation();
    img.css({
        position: 'relative',
        'z-index': 1,
    });
    img.animate({
        width: '160px',
        height: '120px',
        margin: '5px 5px 0 0',
        top: 0, left: 0,
    });
}

function imgError(img){
    img.src = '/img/webcam-off.png';
}

