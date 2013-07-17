$.ajax({
    url:'http://62.220.135.212/mjpg/video.mjpg',
    type:'HEAD',
    error: function()
    {
        console.log("Webcam is not available, sorry.");
    },
    success: function()
    {
        console.log("Webcam is available! :)");
    }
});
