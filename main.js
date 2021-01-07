Webcam.set({
    width:350,
    height:360,
    image_format:'png',
    png_quality:100
});

var camera=document.getElementById("camera");

Webcam.attach('#camera');

function takeSnapshot(){
    Webcam.snap(function(data_uri){
document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/> ';
    })
}

console.log("ml5 version=", ml5.version);

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/ZcZMO8fqc/model.json',modelLoaded);

function modelLoaded(){
    console.log("model Loaded!");
}

var predct1="";
var predct2="";

function speak(){
   var synth=window.speechSynthesis;
   data1="Hi, Prediction 1 is " +predct1;
   data2=" Prediction 2 is " +predct2;

   var utterThis = new SpeechSynthesisUtterance(data1 + data2);
utterThis.rate= 0.8;
   synth.speak(utterThis)

}

function check(){
    img=document.getElementById("captured_image");
    classifier.classify(img, gotResult);

}

function gotResult(error, results){
if(error){
    console.error("Error is " + error)
}else{
    console.log(results)
    document.getElementById("result_emotion_name").innerHTML=results[0].label;
    document.getElementById("result_emotion_name2").innerHTML=results[1].label;
    predct1=results[0].label;
    predct2=results[1].label;
    speak();

if(results[0].label =="Happy"){
    document.getElementById("update_emoji").innerHTML="&#128522;";
    
}
if(results[0].label =="Angry"){
    document.getElementById("update_emoji").innerHTML="&#128548;";
    
}
if(results[0].label =="Sad"){
    document.getElementById("update_emoji").innerHTML="&#128532;";
    
}

if(results[0].label =="Laughing"){
    document.getElementById("update_emoji").innerHTML="&#128514;";
    
}

if(results[1].label =="Happy"){
    document.getElementById("update_emoji2").innerHTML="&#128512;";
    
}
if(results[1].label =="Angry"){
    document.getElementById("update_emoji2").innerHTML="&#128544;";
    
}
if(results[1].label =="Sad"){
    document.getElementById("update_emoji2").innerHTML="&#128532;";
    
}

if(results[1].label =="Laughing"){
    document.getElementById("update_emoji2").innerHTML="&#128514;";
    
}




}

}
