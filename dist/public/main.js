// main.js

const cfg = HFS.getPluginConfig();

let starsAmount = cfg.number_of_background_stars || 15;
let smallestStar = cfg.smallest_star_size_in_px || 1;
let largestStar = cfg.largest_star_size_in_px || 2;

document.addEventListener("DOMContentLoaded", function () {
  var canvas = document.getElementById("sky");
  var ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  function drawStars() {
    for (var i = 0; i < starsAmount; i++) {
      var x = Math.random() * canvas.width;
      var y = Math.random() * canvas.height;
      var radius = Math.random() * (largestStar - smallestStar) + smallestStar;

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.fill();
    }
  }

  drawStars();
});
