const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const circles = [];
let selectedCircle = null;
let offsetX, offsetY;

function drawCircles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  circles.forEach(c => {
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.radius, 0, Math.PI * 2);
    ctx.fillStyle = c.selected ? 'red' : 'dodgerblue';
    ctx.fill();
    ctx.stroke();
  });
}

canvas.addEventListener("click", function(e) {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  let clickedCircle = null;
  for (const circle of circles) {
    const dist = Math.hypot(mouseX - circle.x, mouseY - circle.y);
    if (dist <= circle.radius) {
      clickedCircle = circle;
    }
  }

  circles.forEach(c => c.selected = false);

  if (clickedCircle) {
    clickedCircle.selected = true;
    selectedCircle = clickedCircle;
  } else {
    const newCircle = { x: mouseX, y: mouseY, radius: 20, selected: false };
    circles.push(newCircle);
    selectedCircle = null;
  }

  drawCircles();
});

canvas.addEventListener("mousedown", function(e) {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  if (selectedCircle) {
    const dist = Math.hypot(mouseX - selectedCircle.x, mouseY - selectedCircle.y);
    if (dist <= selectedCircle.radius) {
      offsetX = mouseX - selectedCircle.x;
      offsetY = mouseY - selectedCircle.y;
      canvas.addEventListener("mousemove", onMouseMove);
    }
  }
});

function onMouseMove(e) {
  const rect = canvas.getBoundingClientRect();
  selectedCircle.x = e.clientX - rect.left - offsetX;
  selectedCircle.y = e.clientY - rect.top - offsetY;
  drawCircles();
}

canvas.addEventListener("mouseup", function() {
  canvas.removeEventListener("mousemove", onMouseMove);
});

window.addEventListener("keydown", function(e) {
  if (e.key === "Delete" && selectedCircle) {
    const index = circles.indexOf(selectedCircle);
    if (index > -1) {
      circles.splice(index, 1);
      selectedCircle = null;
      drawCircles();
    }
  }
});

canvas.addEventListener("wheel", function(e) {
  if (selectedCircle) {
    e.preventDefault();
    if (e.deltaY < 0) {
      selectedCircle.radius += 2;
    } else if (selectedCircle.radius > 5) {
      selectedCircle.radius -= 2;
    }
    drawCircles();
  }
});
