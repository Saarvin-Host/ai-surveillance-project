video = "";
status = "";
objects = [];
object_name = "";

function setup(){
    canvas = createCanvas(460,360);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function modelloaded(){
    console.log("model loaded!");
    status = true;
}

function draw(){
    image(video, 0, 0, 480, 380);
    if(status != ""){
      objectdetector.detect(video, gotresults);
      for(i=0; i<objects.length; i++){
          document.getElementById("status").innerHTML = "STATUS : OBJECTS DETECTED";
          fill("#fc8c03");
          percent  = floor(objects[i].confidence * 100);
          text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
          noFill();
          stroke(252, 49, 3);
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
          if(objects[i].label == objects_name){
              document.getElementById("number_of_objects").innerHTML = objects_name+"FOUND";
              var Synth = window.speechSynthesis;
              utterThis = new SpeechSynthesisUtterance(objects_name+"FOUND");
              Synth.speak(utterThis);
          }
          else if(object[i].label != objects_name){
            document.getElementById("number_of_objects").innerHTML = objects_name+"NOT FOUND";
          }
          else{
            document.getElementById("number_of_objects").innerHTML = "";
          }
      }
    }
}

function gotresults(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}

function start(){
    objectdetector = ml5.objectDetector('cocossd', modelloaded);
    document.getElementById("status").innerHTML = "STATUS : DETECTING OBJECTS";
    objects_name = document.getElementById("object_name").value;
}