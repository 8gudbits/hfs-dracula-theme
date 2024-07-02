// main.js

const cfg = HFS.getPluginConfig(); // Get the plugin configuration

// Set the default number of background stars to 15 if not provided in the configuration
let starsAmount = cfg.number_of_background_stars || 15;

// Set the default size of the smallest star to 1px if not provided in the configuration
let smallestStar = cfg.smallest_star_size_in_px || 1;

// Set the default size of the largest star to 2px if not provided in the configuration
let largestStar = cfg.largest_star_size_in_px || 2;

// Wait for the DOM content to be fully loaded before executing the script
document.addEventListener("DOMContentLoaded", function () {
  // Get the canvas element with id "sky" from the "custom.html" file
  var canvas = document.getElementById("sky");

  // Get the 2D rendering context of the canvas
  var ctx = canvas.getContext("2d");

  // Set the canvas width to match the window width
  canvas.width = window.innerWidth;

  // Set the canvas height to match the window height
  canvas.height = window.innerHeight;

  // Function to draw random stars on the canvas
  function drawStars() {
    for (var i = 0; i < starsAmount; i++) {
      // Generate random x and y coordinates within the canvas
      var x = Math.random() * canvas.width;
      var y = Math.random() * canvas.height;

      // Generate a random radius for the star within the specified range
      var radius = Math.random() * (largestStar - smallestStar) + smallestStar;

      // Begin drawing a path for the star
      ctx.beginPath();

      // Draw a circle (star) at the specified x, y coordinates with the calculated radius
      ctx.arc(x, y, radius, 0, Math.PI * 2);

      // Fill the star with white color
      ctx.fillStyle = "white";
      ctx.fill();
    }
  }
  drawStars(); // Call the drawStars function to draw the stars on the canvas
});
