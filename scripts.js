window.onload = function () {

  // Definitions
  var canvas = document.getElementById("paint-canvas");
  var context = canvas.getContext("2d");
  var boundings = canvas.getBoundingClientRect();
  context.font = "200px Arial";
  context.strokeText("你好", 200, 200);
  var current = 0;
  var words=["你好","米饭","饺子","水","山","江"];
  var def=["Hello","Rice","Dumpling","Water","Mountain","River"];

  // Specifications
  var mouseX = 0;
  var mouseY = 0;
  context.strokeStyle = 'black'; // initial brush color
  context.lineWidth = 5; // initial brush width
  var isDrawing = false;


  // Mouse Down Event
  canvas.addEventListener('mousedown', function(event) {
    setMouseCoordinates(event);
    isDrawing = true;

    // Start Drawing
    context.beginPath();
    context.moveTo(mouseX, mouseY);
  });

  // Mouse Move Event
  canvas.addEventListener('mousemove', function(event) {
    setMouseCoordinates(event);

    if(isDrawing){
      context.lineTo(mouseX, mouseY);
      context.stroke();
    }
  });

  // Mouse Up Event
  canvas.addEventListener('mouseup', function(event) {
    setMouseCoordinates(event);
    isDrawing = false;
  });

  // Handle Mouse Coordinates
  function setMouseCoordinates(event) {
    mouseX = event.clientX - boundings.left;
    mouseY = event.clientY - boundings.top;
  }

  // Handle Clear Button
  var clearButton = document.getElementById('clear');

  clearButton.addEventListener('click', function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.strokeText(words[current], 200, 200);
  });

  // Handle Save Button
  var saveButton = document.getElementById('save');

  saveButton.addEventListener('click', function() {
    var imageName = prompt('Please enter image name');
    var canvasDataURL = canvas.toDataURL();
    var a = document.createElement('a');
    a.href = canvasDataURL;
    a.download = imageName || 'drawing';
    a.click();
  });
  // Handle Next Button
    var nextButton = document.getElementById('next');
    nextButton.addEventListener('click', function(){
        context.clearRect(0, 0, canvas.width, canvas.height);
        current+=1;
        if (current>words.length-1){current-=words.length;}
        context.strokeText(words[current], 200, 200);
        var w = document.getElementById("word");
        w.innerHTML='Word: '+words[current];
        var d = document.getElementById("def");
        d.innerHTML="Defintion: "+def[current];
    });
};
// Major help from: https://codepen.io/alperentalaslioglu/pen/yPGgvP
