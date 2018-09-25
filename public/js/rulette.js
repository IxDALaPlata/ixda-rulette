
var request = new XMLHttpRequest();
request.open('GET', '../csv/report.csv', true);

request.onload = function() {
  if (request.status >= 200 && request.status < 400) {
    // Success!
    var data = request.responseText;
    parseCSV(data,drawRouletteWheel);
  } else {
    var data = JSON.parse(request.responseText);
    console.log("error",data);
    }
};
request.send();

var roulette_container = document.getElementsByClassName("canvas-and-arrow-container")[0];
var winner_name = document.getElementById("winner-name");
var message_zone = document.getElementsByClassName("message-zone")[0];
var spin_button = document.getElementsByClassName("spin-button")[0];
var roulette_name = document.getElementsByClassName("roulette-name")[0];
var confeti_canvas = document.querySelector(".confeti");


var options = [];
var arc;

function parseCSV(data,callback){

  var config = {
    delimiter:"",
    download:false,
    dynamicTyping:false,
    encoding:"",
    fastMode:false,
    header:false,
    newline:"",
    skipEmptyLines:false,
    worker:false
  }
  var results = Papa.parse(data, config);
  if(!results.errors.length > 0){
    var oldArray = results.data;

    for (var i = 1; i < oldArray.length -1; i++) {
      options.push((oldArray[i][2] + " " + oldArray[i][3]+ "  ")).toString();
    }
  }
  arc = Math.PI / (options.length / 2);
  callback();
}

var startAngle = 0;
var spinTimeout = null;

var spinArcStart = 10;
var spinTime = 0;
var spinTimeTotal = 0;

var ctx;

function drawRouletteWheel() {
  var canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    var outsideRadius = 600;
    var insideRadius = 50;
    //recalcular arc
    arc = Math.PI / (options.length / 2);

    ctx = canvas.getContext("2d");
    // ctx.translate(100,100);
    ctx.clearRect(0,0,1200,1200);
    // ctx.rotate(180 * Math.PI / 180);
    ctx.strokeStyle = "#f5535e";
    ctx.lineWidth = 1;

    ctx.font = '16px Helvetica, Arial';

    for(var i = 0; i < options.length; i++) {
      var angle = startAngle + i * arc;
      ctx.fillStyle = "rgba(255, 255, 255, 0)"; 

      ctx.beginPath();
      ctx.arc(300, 350, outsideRadius, angle, angle + arc, false);
      ctx.arc(300, 350, insideRadius, angle + arc, angle, true);
      ctx.stroke();
      ctx.fill();

      ctx.save();
      ctx.shadowOffsetX = -1;
      ctx.shadowOffsetY = -1;
      ctx.shadowBlur    = 0;
      /*
      Show the different textAlign values
        ctx.textAlign = "start";
        ctx.textAlign = "end";
        ctx.textAlign = "left";
        ctx.textAlign = "center";
        ctx.textAlign = "right";
      */
      ctx.textAlign = "center";
      ctx.fillStyle = "white";
      ctx.translate(300 + Math.cos(angle + arc / 2) * outsideRadius,
                    350 + Math.sin(angle + arc / 2) * outsideRadius);
      ctx.rotate(angle + arc / 2 + Math.PI * 2);
      var text = options[i];
      ctx.fillText(text, -ctx.measureText(text).width / 2, 6);
      ctx.restore();
    }

    //Arrow
    ctx.save();
    ctx.fillStyle = "white";
    ctx.beginPath();
    var variable = 310;
    //Esto dibuja la flechita magicamente
    ctx.moveTo((outsideRadius + 5)+variable, 350 - 4);
    ctx.lineTo((outsideRadius + 5)+variable, 350 + 4);
    ctx.lineTo((outsideRadius - 5)+variable, 350 + 4);
    ctx.lineTo((outsideRadius - 5)+variable, 350 + 9);
    ctx.lineTo((outsideRadius - 13)+variable,350 + 0);
    ctx.lineTo((outsideRadius - 5)+variable, 350 - 9);
    ctx.lineTo((outsideRadius - 5)+variable, 350 - 4);
    ctx.lineTo((outsideRadius + 5)+variable, 350 - 4);
    ctx.fill();


  }
}

function spin() {
  spin_button.setAttribute("disabled","disabled");
  spin_button.innerText= "Girando...";
  message_zone.classList.remove("-show");
  roulette_name.classList.remove("-hide");
  roulette_container.classList.remove("-hide");
  confeti_canvas.classList.remove("-show");
  spinAngleStart = Math.random() * 10 + 10;
  spinTime = 0;
  spinTimeTotal = Math.random() * 5 + 4 * 5000;
  rotateWheel();
}

function rotateWheel() {
  spinTime += 50;
  if(spinTime >= spinTimeTotal) {
    stopRotateWheel();
    return;
  }
  var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
  startAngle += (spinAngle * Math.PI / 180);
  var degrees = startAngle * 180 / Math.PI + 0;
  var arcd = arc * 180 / Math.PI;
  var index = Math.floor((360 - degrees % 360) / arcd);
  var text = options[index]
  roulette_name.innerText = text;
  drawRouletteWheel();
  spinTimeout = setTimeout('rotateWheel()', 50);
}

function stopRotateWheel() {
  clearTimeout(spinTimeout);
  var degrees = startAngle * 180 / Math.PI + 0;
  var arcd = arc * 180 / Math.PI;
  var index = Math.floor((360 - degrees % 360) / arcd);
  ctx.save();
  var text = options[index]
  winner_name.innerText = text;
  message_zone.className += " -show";
  roulette_name.classList.add("-hide");
  roulette_container.classList.add("-hide");
  confeti_canvas.classList.add("-show");
  options.splice(index, 1);
  spin_button.innerText= "Sortear";
  spin_button.removeAttribute("disabled");
  ctx.restore();
}

function easeOut(t, b, c, d) {
  var ts = (t/=d)*t;
  var tc = ts*t;
  return b+c*(tc + -3*ts + 3*t);
}
