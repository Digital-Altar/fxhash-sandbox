// this is how to define parameters
$fx.params([
  {
    id: "squares",
    name: "Squares Style",
    type: "select",
    default: "random",
    options: {
      options: ["colorful","monocolor","random"],
    },
  },
 {
    id: "lines",
    name: "Lines Style",
    type: "select",
    default: "random",
    options: {
      options: ["dark", "light", "random"],
    },
  },
]);

// this is how features can be defined
$fx.features({
  "Squares Style": $fx.getParam("squares"),
  "Lines Style": $fx.getParam("lines")
});

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

  bottomImg.src = bottomImgUrl;

  bottomImg.onload = function() {

      // draw the bottom img
      ctx.save(); // save the current context state
      ctx.globalAlpha = .3 + $fx.rand() * (.9 - .3); // use fx(rand) to set a random opacity
      ctx.drawImage(bottomImg, 0, 0); // draw the top image

      // Create a new canvas to use as a buffer
      const bufferCanvas = document.createElement('canvas');
      bufferCanvas.width = canvas.width;
      bufferCanvas.height = canvas.height;
      const bufferCtx = bufferCanvas.getContext('2d');

      // Get the image data from the canvas
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      // Loop through the image data and modify the hue of each pixel
      for (let i = 0; i < imageData.data.length; i += 4) {
        const r = imageData.data[i];
        const g = imageData.data[i + 1];
        const b = imageData.data[i + 2];

        // Convert RGB to HSL
        const [h, s, l] = rgbToHsl(r, g, b);

      // Randomize the hue modification
        const deltaH = ($fx.rand() * 0.5 + 0.8).toFixed(1);

        // Modify the hue
        const newH = (h + deltaH) % 1;

        // Convert back to RGB
        const [newR, newG, newB] = hslToRgb(newH, s, l);

        // Set the new pixel values
        imageData.data[i] = newR;
        imageData.data[i + 1] = newG;
        imageData.data[i + 2] = newB;
      }

      // now load the top image
      let randomTopIndex;
      do {
        randomTopIndex = Math.floor($fx.rand() * imgUrls.length); // use fx(rand)
      } while (randomTopIndex === randomBottomIndex);

    const topImgUrl = imgUrls[randomTopIndex];
    const topImg = new Image();

    topImg.src = topImgUrl;
    topImg.onload = function() {

      // draw the top image
      ctx.save(); // save the current context state
      ctx.globalAlpha = .2 + $fx.rand() * (.8 - .2); // set a random opacity between 0.2 and 0.8
      ctx.drawImage(topImg, 0, 0); // draw the top image

      // Create a new canvas to use as a buffer
      const bufferCanvas = document.createElement('canvas');
      bufferCanvas.width = canvas.width;
      bufferCanvas.height = canvas.height;
      const bufferCtx = bufferCanvas.getContext('2d');

      // Get the image data from the canvas
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      // Loop through the image data and modify the hue of each pixel
      for (let i = 0; i < imageData.data.length; i += 4) {
        const r = imageData.data[i];
        const g = imageData.data[i + 1];
        const b = imageData.data[i + 2];

        // Convert RGB to HSL
        const [h, s, l] = rgbToHsl(r, g, b);

      // Randomize the hue modification
        const deltaH = ($fx.rand() * 0.5 + 0.8).toFixed(1);

        // Modify the hue
        const newH = (h + deltaH) % 1;

        // Convert back to RGB
        const [newR, newG, newB] = hslToRgb(newH, s, l);

        // Set the new pixel values
        imageData.data[i] = newR;
        imageData.data[i + 1] = newG;
        imageData.data[i + 2] = newB;
      }

  // Put the modified image data onto the buffer canvas
  bufferCtx.putImageData(imageData, 0, 0);

  // Draw the modified image onto the original canvas
  ctx.drawImage(bufferCanvas, 0, 0);

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

  // Utility functions for RGB to HSL conversion
  function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
    h /= 6;
  }

  return [h, s, l];
  }

  function hslToRgb(h, s, l) {
  let r, g, b;

  if (s === 0) {
  r = g = b = l; // achromatic
  } else {
  const hue2rgb = (p, q, t) => {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1/6) return p + (q - p) * 6 * t;
  if (t < 1/2) return q;
  if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
  return p;
  };

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  r = hue2rgb(p, q, h + 1/3);
  g = hue2rgb(p, q, h);
  b = hue2rgb(p, q, h - 1/3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  }
});