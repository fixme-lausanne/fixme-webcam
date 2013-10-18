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
        showGallery();
        return false;
    });
    buildGallery();
    lastGallery();
}

function showGallery(){
    var div = $('<div>');
    div.attr('id', 'galleryContainer');
    $.each(gallery, function(k, v){
        var img = $('<img>');
        img.attr('src', v);
        img.attr('class', 'thumb gallery');
        img.click(function(e){
            fullScreenPicture(img, e);
        });
        div.append(img);
    });
    $('body').append(div);
    $('body').click(function(e){
        $('#galleryContainer').remove();
        $('body').unbind(e);
    });
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
            buildGallery();
            lastGallery();
        }
    });
}

function flash() {
    $('body').fadeTo('slow', 0.5).fadeTo('slow', 1.0);
}

function buildGallery() {
    gallery = []
    var url = '/img/snap/';
    $.ajax({
        url: url+'?C=M;O=D',
        async: false,
        error: function(jqXHR, textStatus, errorThrown)
        {
            alert(textStatus + ": " + errorThrown);
        },
        success: function(data, textStatus, jqXHR)
        {
            $(data).find('a:contains(.jpg)').each(function(){
                gallery.push(url + $(this).attr('href'));
            });
        }
    });
}

function lastGallery() {
    var last = gallery.slice(0, 4);
    var res = $('#last-snap');
    res.empty();
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
    img.stop(true, true);
    e.stopPropagation();
    img.unbind(e);
    $.each($('.fullscreen'), function(k, v){
        reducePicture($(v), e);
    });
    img.addClass('fullscreen');
    img.css({
        position: 'absolute',
        'z-index': 9999,
    });
    img.animate({
        'max-width': '6000px',
        height: '80%',
        margin: '9%',
        top: $(window).scrollTop(),
        left: $(window).scrollLeft(),
    });
    $('body').click(function(ev){
        reducePicture(img, ev);
    });
    img.click(function(ev){
        reducePicture(img, ev);
    });
}

function reducePicture(img, e) {
    img.stop(true, true);
    e.stopPropagation();
    img.unbind(e);
    $('body').unbind(e);
    img.removeClass('fullscreen');
    img.css({
        position: 'relative',
        'z-index': 1,
        width: '160px',
        height: '120px',
        margin: '5px 5px 0 0',
        top: 0, left: 0,
    });
    img.click(function(ev){
        fullScreenPicture(img, ev);
    });
}

function imgError(img){
    img.src = '/img/webcam-off.png';
}

