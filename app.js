// app.js
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const penButton = document.getElementById('pen');
const eraserButton = document.getElementById('eraser');
const textButton = document.getElementById('text');
const colorPicker = document.getElementById('colorPicker');
const clearButton = document.getElementById('clear');
const saveButton = document.getElementById('save');

// Set up canvas dimensions
canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 200;

// Variables for drawing
let isDrawing = false;
let mode = 'pen'; // 'pen', 'eraser', 'text'
let currentColor = '#000000';
let startX, startY;

// Event listener for starting drawing
canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  startX = e.offsetX;
  startY = e.offsetY;
  if (mode === 'text') {
    let text = prompt('Enter text:');
    if (text) {
      ctx.fillStyle = currentColor;
      ctx.font = '30px Arial';
      ctx.fillText(text, startX, startY);
    }
  }
});

// Event listener for drawing
canvas.addEventListener('mousemove', (e) => {
  if (!isDrawing) return;
  const x = e.offsetX;
  const y = e.offsetY;
  ctx.strokeStyle = currentColor;
  ctx.lineWidth = mode === 'eraser' ? 20 : 5;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';

  if (mode === 'pen') {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(x, y);
    ctx.stroke();
  } else if (mode === 'eraser') {
    ctx.clearRect(x - 20, y - 20, 40, 40);
  }

  startX = x;
  startY = y;
});

// Event listener for stopping drawing
canvas.addEventListener('mouseup', () => {
  isDrawing = false;
});

// Set the drawing mode to pen
penButton.addEventListener('click', () => {
  mode = 'pen';
});

// Set the drawing mode to eraser
eraserButton.addEventListener('click', () => {
  mode = 'eraser';
});

// Change the current color
colorPicker.addEventListener('input', (e) => {
  currentColor = e.target.value;
});

// Clear the canvas
clearButton.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Save the canvas as an image
saveButton.addEventListener('click', () => {
  const imageUrl = canvas.toDataURL();
  const link = document.createElement('a');
  link.href = imageUrl;
  link.download = 'my_design.png';
  link.click();
});
