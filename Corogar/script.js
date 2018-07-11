chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    if (request == "Action") {
        cologar();
    }
});

function cologar(){
    var $video = document.createElement('video');
    var $canvas = document.createElement('canvas');
    var scale = Math.random()*2+0.5;
    var width = 218 * scale;
    var height = 86 * scale;
    $video.src = chrome.extension.getURL('image/neymar.mp4')
    $video.width = width;
    $video.height = height;
    $video.play();
    $video.loop = true;
    $video.crossOrigin = "anonymous "
    $video.classList.add('corogar')
    $canvas.width = width;
    $canvas.height = height;
    $canvas.classList.add('corogar');
    $canvas.style.position = 'fixed';
    $canvas.style.zIndex = 100;
    $canvas.style.left = `${~~(Math.random()*(window.innerWidth - width))}px`
    $video.style.display = 'none';
    var context = $canvas.getContext('2d');
    function draw(){
        context.drawImage($video,0,0,width,height);
        var image = context.getImageData(0,0,width,height);
        var {data} = image;
        for(var i = 0;i < data.length;i += 4){
            if(data[i] > 230 && data[i+1]>230 && data[i+2]>230){
                data[i+3] = 0;
            }
        }
        context.putImageData(image, 0, 0);
        requestAnimationFrame(draw);
    }
    draw();
    document.body.appendChild($video)
    document.body.appendChild($canvas)
    var counter = window.innerHeight;
    var p = 0;
    var timer = setInterval(()=>{
        p += 10;
        counter-=10;
        $canvas.style.top = `${p}px`;
        if(counter<0){
            clearInterval(timer);
            document.body.removeChild($video);
            document.body.removeChild($canvas);
        }
    },~~(Math.random()*50)+50)
}