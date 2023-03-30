// this is how to define parameters
$fx.params([
  {
    id: "number_lines",
    name: "Number of Lines",
    type: "number",
    default: 8,
    options: {
      min: 6,
      max: 20,
      step: 1,
    }
  }
]);

// this is how features can be defined
$fx.features({
  "Number of Lines": $fx.getParam("number_lines"),
})

function setRandomImage(){

  return new Promise(function(resolve) {
  // Array of image URLs
    const images = [
      'plant1.png',
      'plant2.png',
      'plant3.png',
      'plant4.png',
    ];

    // Select a random image URL from the array
    const randomIndex = Math.floor($fx.rand() * images.length);
    const randomImage = images[randomIndex];

    // Set the src attribute of an <img> element to the random image URL
    const img = document.getElementById('image');
    img.src = randomImage;

    // Add an event listener to the image element that runs glitch when the image has finished loading
    img.addEventListener('load', function() {
      glitch(img);
      resolve();
    });
  });
}

function glitch(img) {
  // Get the canvas and image elements
  var canvas = document.getElementById('canvas');

  // Set the canvas dimensions to match the image dimensions
  canvas.width = 1000;
  canvas.height = 1000;

  // Get the canvas context
  var ctx = canvas.getContext('2d');

  // Draw the image on the canvas
  ctx.clearRect(0, 0, 1000, 1000);
  ctx.drawImage(img, 0, 0);

  // Curated numbers
  var curatedNum = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].at(Math.floor($fx.rand() * 12));
  var curatedNum2 = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].at(Math.floor($fx.rand() * 12));
  var curatedNum3 = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].at(Math.floor($fx.rand() * 12));

  // Randomly swap the color channels of the image using the curated number
  var imageData = ctx.getImageData(0, 0, 1000, 1000);
  for (var i = 0; i < imageData.data.length; i += curatedNum) {
    var temp = imageData.data[i];
    imageData.data[i] = imageData.data[i + curatedNum2];
    imageData.data[i + curatedNum3] = temp;
  }
  ctx.putImageData(imageData, 0, 0);

  // Randomly modify pixels in a row or column
  for (var i = 0; i < $fx.getParam("number_lines"); i++) {
    var rand = Math.floor($fx.rand() * 2);
    if (rand === 0) {
      // Modify a row
      var row = Math.floor($fx.rand() * 1000);
      for (var j = 0; j < 1000; j++) {
        var offset = (row * 1000 + j) * 1;
        var r = Math.floor($fx.rand() * 255);
        var g = Math.floor($fx.rand() * 255);
        var b = Math.floor($fx.rand() * 255);
        ctx.fillStyle = "rgb(" + r + ", " + g + ", " + b + ", .04)";
        ctx.fillRect(j, row, 10, 10);
      }
    } else {
      // Modify a column
      var col = Math.floor($fx.rand() * 1000);
      for (var j = 0; j < 1000; j++) {
        var offset = (j * 1000 + col) * 2;
        var r = Math.floor($fx.rand() * 255);
        var g = Math.floor($fx.rand() * 255);
        var b = Math.floor($fx.rand() * 255);
        ctx.fillStyle = "rgb(" + r + ", " + g + ", " + b + ", .04)";
        ctx.fillRect(col, j, 20, 20);
      }
    }
  }
}

window.onload = function() {
  setRandomImage()
};