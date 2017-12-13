$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "../csv/report.csv",
        dataType: "text",
        success: function(data) {parseCSV(data);},
        error:function(data) {console.log("error",data);},
     });
});
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
    var newArray = [];
    for (var i = 1; i < oldArray.length -1; i++) {
    newArray.push(oldArray[i][2] + " " + oldArray[i][3]);
    }
    console.log(newArray);
  }
}
