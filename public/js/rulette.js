$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "../csv/report.csv",
        dataType: "text",
        success: function(data) {parseCSV(data);},
        error:function(data) {console.log("error",data);},
     });
});

var options = [];
var arc;

function parseCSV(data){

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
      options.push((oldArray[i][2] + " " + oldArray[i][3]).toString());
    }
  }
  arc = Math.PI / (options.length / 2);
  drawRouletteWheel();
}

// var options = ["Marcos Molineri", "Patricia Harkes", "Yesica Orellana", "Agustina Lanari", "Agustina Lopez", "Rosana Inchaurrondo", "Alexia Navarrete", "Cecilia Datko", "Raul Moviglia", "Andrea Cruz", "Melisa Mainero", "Sofia Guerrini", "INDIRA VEGA", "Sofia Aloise", "Catalina Carlos", "Julieta Gobbi", "Thalía Hurtado", "juan alvarez lojo", "Victoria Villalobos Sambucaro", "Julian Mosquera", "Lucas Alonso", "Teresita Bulfon", "María José Calderaro", "Anahi Castellano", "Eric Collard Bovy", "Matias Ferreyra", "Mariana Galeano", "Gonzalo Luna", "Diego Corrao", "Paola Giannattasio", "Marina Leon", "Magali Ortiz Miller", "Agustina Pared", "Paula Pejkovic", "Javier Peña", "Juan Martin Pietraroia", "Daniel Rozadilla", "Julia Saborido", "Sofia Spoltore", "Catalina Velarde", "Andres Vicente", "Juliana Vitale", "Catalina Guerrero", "Ismael Martinez", "Pablo Hernán Amarilla"];

var startAngle = 0;
var spinTimeout = null;

var spinArcStart = 10;
var spinTime = 0;
var spinTimeTotal = 0;

var ctx;

// document.getElementById("spin").addEventListener("click", spin);

function byte2Hex(n) {
  var nybHexString = "0123456789ABCDEF";
  return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
}

function RGB2Color(r,g,b) {
	return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
}

function getColor(item, maxitem) {
  var phase = 0;
  var center = 128;
  var width = 127;
  var frequency = Math.PI*2/maxitem;

  red   = Math.sin(frequency*item+2+phase) * width + center;
  green = Math.sin(frequency*item+0+phase) * width + center;
  blue  = Math.sin(frequency*item+4+phase) * width + center;

  return RGB2Color(red,green,blue);
}

function drawRouletteWheel() {
  var canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    var outsideRadius = 500;
    var textRadius = 250;
    var insideRadius = 50;
    //recalcular arc
    arc = Math.PI / (options.length / 2);

    ctx = canvas.getContext("2d");
    // ctx.translate(100,100);
    ctx.clearRect(0,0,1200,1200);

    ctx.strokeStyle = "transparent";
    ctx.lineWidth = 0;

    ctx.font = 'bold 20px Helvetica, Arial';

    for(var i = 0; i < options.length; i++) {
      var angle = startAngle + i * arc;
      //ctx.fillStyle = colors[i];
      ctx.fillStyle = "rgba(255, 255, 255, 0)"; //getColor(i, options.length);

      ctx.beginPath();
      ctx.arc(600, 600, outsideRadius, angle, angle + arc, false);
      ctx.arc(600, 600, insideRadius, angle + arc, angle, true);
      ctx.stroke();
      ctx.fill();

      ctx.save();
      ctx.shadowOffsetX = -1;
      ctx.shadowOffsetY = -1;
      ctx.shadowBlur    = 0;
      //ctx.shadowColor   = "rgb(220,220,220)";
      ctx.fillStyle = "white";
      ctx.translate(350 + Math.cos(angle + arc / 2) * textRadius,
                    350 + Math.sin(angle + arc / 2) * textRadius);
      ctx.rotate(angle + arc / 2 + Math.PI * 2);
      ctx.rotate(180 * Math.PI / 180);
      var text = options[i];
      ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
      ctx.restore();
    }

    //Arrow
    ctx.save();
    ctx.fillStyle = "white";
    ctx.beginPath();
    //Esto dibuja la flechita magicamente
    ctx.moveTo(outsideRadius - 0 - (outsideRadius + 5), 350 - 4);
    ctx.lineTo(outsideRadius - 0 -(outsideRadius + 5), 350 + 4);
    ctx.lineTo(outsideRadius - 0 -(outsideRadius - 5), 350 + 4);
    ctx.lineTo(outsideRadius - 0 -(outsideRadius - 5), 350 + 9);
    ctx.lineTo(outsideRadius - 0 -(outsideRadius - 13),350 + 0);
    ctx.lineTo(outsideRadius - 0 -(outsideRadius - 5), 350 - 9);
    ctx.lineTo(outsideRadius - 0 -(outsideRadius - 5), 350 - 4);
    ctx.lineTo(outsideRadius - 0 -(outsideRadius + 5), 350 - 4);
    ctx.fill();


  }
}

function spin() {
  spinAngleStart = Math.random() * 10 + 10;
  spinTime = 0;
  spinTimeTotal = Math.random() * 5 + 4 * 1000;
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
  drawRouletteWheel();
  spinTimeout = setTimeout('rotateWheel()', 50);
}

function stopRotateWheel() {
  clearTimeout(spinTimeout);
  var degrees = startAngle * 180 / Math.PI + 180;
  var arcd = arc * 180 / Math.PI;
  var index = Math.floor((360 - degrees % 360) / arcd);
  ctx.save();
  ctx.font = 'bold 30px Helvetica, Arial';
  var text = options[index]
  document.getElementById("winner-name").innerText = text;
  // ctx.fillText(text, 350 - ctx.measureText(text).width / 2, 350 + 10);
  // ctx.fillText(text, 600 , 350);
  console.log(options);
  options.splice(index, 1);
  console.log(options);
  drawRouletteWheel();
  ctx.restore();
}

function easeOut(t, b, c, d) {
  var ts = (t/=d)*t;
  var tc = ts*t;
  return b+c*(tc + -3*ts + 3*t);
}
//drawRouletteWheel();
