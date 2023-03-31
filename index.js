// this is how to define parameters
$fx.params([
  {
    id: "squares",
    name: "Squares Style",
    type: "select",
    default: "random",
    options: {
      options: ["colorful","monocolor","random"]
    }
  },
 {
    id: "lines",
    name: "Lines Style",
    type: "select",
    default: "random",
    options: {
      options: ["dark", "light", "random"],
    }
  }
]);

// this is how features can be defined
$fx.features({
  "Squares Style": $fx.getParam("squares"),
})

// ----------------------------------
// this is a Digital Altar creation
// ----------------------------------
const canvas = document.getElementById('marigolds');

// lets preload images
const images = {
  image0: './marigolds0.png',
  image1: './marigolds1.png',
  image2: './marigolds2.png',
  image3: './marigolds3.png',
  image4: './marigolds4.png'
};

const loadedImages = {};

const promises = Object.keys(images).map((key) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      loadedImages[key] = img;
      resolve();
    };
    img.onerror = reject;
    img.src = images[key];
  });
});

// make sure images load then proceed
Promise.all(promises).then(() => {

  // fx(param) for squares
  var squares = $fx.getParam("squares"); // get fx(param) for squares

  // draw the canvas
  const canvas = document.getElementById('marigolds');
  const ctx = canvas.getContext('2d');

  // possible image urls
  const imgUrls = ['./marigolds0.png','./marigolds1.png','./marigolds2.png','./marigolds3.png','./marigolds4.png'];

  // load the bottom image
  const bottomImg = new Image();
    const randomBottomIndex = Math.floor($fx.rand() * imgUrls.length); // use fx(rand)
    const bottomImgUrl = imgUrls[randomBottomIndex];
    const bottomHueRotate = Math.floor($fx.rand() * 360); // use fx(rand)

  bottomImg.src = bottomImgUrl;

  bottomImg.onload = function() {
    ctx.filter = `hue-rotate(${bottomHueRotate}deg) brightness(100%) contrast(150%)`;
      ctx.drawImage(bottomImg, 0, 0);

      // now load the top image
      let randomTopIndex;
      do {
        randomTopIndex = Math.floor($fx.rand() * imgUrls.length); // use fx(rand)
      } while (randomTopIndex === randomBottomIndex);

    const topImgUrl = imgUrls[randomTopIndex];
    const topHueRotate = Math.floor($fx.rand() * 360); // use fx(rand)
    const topImg = new Image();

    topImg.src = topImgUrl;
      topImg.onload = function() {

      ctx.filter = `hue-rotate(${topHueRotate}deg) opacity(60%) brightness(100%) contrast(150%)`;
      ctx.drawImage(topImg, 0, 0);

      // draw lines
      drawLines();

      // draw rectangles
      drawRectangles();

      // draw squares depending on fx(param)
      if (squares === "colorful") {
        drawColorfulSquares();
      } else if (squares === "mono") {
        drawSquares();
      } else {
        const rand = $fx.rand(); // use fx(rand)
        if (rand < 0.5) {
          drawColorfulSquares();
          } else {
            drawSquares();
          }
      }
      }
  };

  function drawLines() {
    var lines = $fx.getParam("lines"); // set line color with fx(param)

    if (lines === "light") {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    } else if (lines === "dark") {
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
    } else {
      const rand = $fx.rand(); // use fx(rand)
      if (rand < 0.5) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)'; 
        } else {
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
        }     
    }
    ctx.lineWidth = 1; // set line width

    // draw lines across the canvas
    for (let i = 0; i < canvas.height; i += 10) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }
  }

  function drawRectangles() {
    // generate random rgba values
    const r = Math.floor($fx.rand() * 256); // use fx(rand)
    const g = Math.floor($fx.rand() * 256); // use fx(rand)
    const b = Math.floor($fx.rand() * 256); // use fx(rand)
    const a = ($fx.rand() * 0.5 + 0.5).toFixed(1); // use fx(rand)

    // set fill style to random rgba value
    ctx.fillStyle = `rgba(${r},${g},${b},${a})`;

    // draw rectangles with random coordinates
    for (let i = 0; i < 50; i++) {
      const size = Math.floor($fx.rand() * 100) + 1; // use fx(rand)
      const size2 = Math.floor($fx.rand() * 100) + 1; // use fx(rand)
      const x = Math.floor($fx.rand() * canvas.width); // use fx(rand)
      const y = Math.floor($fx.rand() * canvas.height); // use fx(rand)
      ctx.fillRect(x, y, size, size2);
    }
  }

  function drawSquares() {
    // generate random rgba values
    const r = Math.floor($fx.rand() * 256); // use fx(rand)
    const g = Math.floor($fx.rand() * 256); // use fx(rand)
    const b = Math.floor($fx.rand() * 256); // use fx(rand)
    const a = ($fx.rand() * 0.5 + 0.5).toFixed(1); // use fx(rand)

    // set fill style to random rgba value
    ctx.fillStyle = `rgba(${r},${g},${b},${a})`;

    // draw squares with random coordinates
    for (let i = 0; i < 50; i++) {
      const size = Math.floor($fx.rand() * 200) + 1;  // use fx(rand)
      const x = Math.floor($fx.rand() * canvas.width); // use fx(rand)
      const y = Math.floor($fx.rand() * canvas.height); // use fx(rand)
      ctx.fillRect(x, y, size, size);
    }
  }

  function drawColorfulSquares() {
    // draw squares with random colors and coordinates
    for (let i = 0; i < 50; i++) {
      // generate random rgba values
      const r = Math.floor($fx.rand() * 256); // use fx(rand)
      const g = Math.floor($fx.rand() * 256); // use fx(rand)
      const b = Math.floor($fx.rand() * 256); // use fx(rand)
      const a = ($fx.rand() * 0.5 + 0.5).toFixed(1); // use fx(rand)

      // set fill style to random rgba value
      ctx.fillStyle = `rgba(${r},${g},${b},${a})`;

      // draw squares with random coordinates
        const size = Math.floor($fx.rand() * 200) + 10;  // use fx(rand)
        const x = Math.floor($fx.rand() * canvas.width); // use fx(rand)
        const y = Math.floor($fx.rand() * canvas.height); // use fx(rand)
      ctx.fillRect(x, y, size, size);
    }
  }
});