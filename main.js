video = "";
status = "";

function setup(){
    canvas = createCanvas(460,360);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    objectdetector = ml5.objectDetector('cocossd', modelloaded);
    document.getElementById("status").innerHTML = "STATUS : DETECTING OBJECTS";
}

function modelloaded(){
    console.log("model loaded!");
    status = true;
}

function draw(){
    image(video, 0, 0, 480, 380);
}