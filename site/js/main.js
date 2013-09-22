function takeScreenshot() {
    $.ajax({
        url:'/screenshot.py',
        error: function(jqXHR, textStatus, errorThrown)
        {
            console.log(textStatus + ", " + errorThrown);
        },
        success: function(data, textStatus, jqXHR)
        {
            console.log("Took a screenshot: " + data);
        }
    });
}

function imgError(img){
    img.src = '/img/webcam-off.png';
}
