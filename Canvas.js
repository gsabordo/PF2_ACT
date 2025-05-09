const canvas = document.getElementById('canvas');
const workspace = canvas.getContext('2d');

let circles = [];
let selectedCircle = null;
let isDragging = false;
let dragOffset = { x: 0, y: 0 };

// Mouse down to select or create a circle
canvas.addEventListener('mousedown', function (e) {
  const { x, y } = getMousePos(e);
  selectedCircle = getCircleAt(x, y);

  // If a circle is selected, change its color to red for selection
  if (selectedCircle) {
    selectedCircle.color = 'red'; // Red when selected
    dragOffset.x = x - selectedCircle.x;
    dragOffset.y = y - selectedCircle.y;
    isDragging = true;
  } else {
    deselectAll();
    circles.push({ x, y, radius: 20, color: 'skyblue' }); // Default blue color for new circles
  }

  draw();
});

// Mouse move to drag the selected circle
canvas.addEventListener('mousemove', function (e) {
  if (isDragging && selectedCircle) {
    const { x, y } = getMousePos(e);
    selectedCircle.x = x - dragOffset.x;
    selectedCircle.y = y - dragOffset.y;
    draw();
  }
});

// Mouse up to stop dragging
canvas.addEventListener('mouseup', function () {
  isDragging = false;
});

// Mouse wheel to resize the selected circle
canvas.addEventListener('wheel', function (e) {
  if (selectedCircle) {
    e.preventDefault();
    selectedCircle.radius += e.deltaY < 0 ? 2 : -2; // Increase/decrease radius on scroll
    if (selectedCircle.radius < 5) selectedCircle.radius = 5; // Set minimum radius
    draw();
  }
});

// Keydown for delete key to remove the selected circle
window.addEventListener('keydown', function (e) {
  if (e.key === 'Delete' && selectedCircle) {
    circles = circles.filter(c => c !== selectedCircle);
    selectedCircle = null;
    draw();
  }
});

// Get mouse position relative to canvas
function getMousePos(evt) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

// Check if a circle exists at a given position
function getCircleAt(x, y) {
  for (let i = circles.length - 1; i >= 0; i--) {
    const c = circles[i];
    const dx = c.x - x;
    const dy = c.y - y;
    if (Math.sqrt(dx * dx + dy * dy) <= c.radius) {
      return c;
    }
  }
  return null;
}

// Deselect all circles (reset to default color)
function deselectAll() {
  circles.forEach(c => c.color = 'skyblue'); // Reset all circles to blue
  selectedCircle = null;
}

// Draw all circles on the canvas
function draw() {
  workspace.clearRect(0, 0, canvas.width, canvas.height);
  circles.forEach(c => {
    workspace.beginPath();
    workspace.arc(c.x, c.y, c.radius, 0, Math.PI * 2);
    workspace.fillStyle = c.color;
    workspace.fill();
  });
}

// Clear the canvas (remove all circles)
function clearCanvas() {
  circles = [];
  selectedCircle = null;
  draw();
}

// Go back to home page (modify with your actual homepage URL)
function goHome() {
  window.location.href = "index.html"; // Change to your actual home page URL
}

// Soft pastel background animation
const colors = ['#ffeef8', '#fff0f5', '#fbeaff', '#fce1f2', '#ffe4e1'];
let currentColor = 0;
setInterval(() => {
  document.body.style.backgroundColor = colors[currentColor];
  currentColor = (currentColor + 1) % colors.length;
}, 4000);
