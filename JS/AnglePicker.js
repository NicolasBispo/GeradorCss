const anglePicker = document.querySelector('.angle-picker');
const angleDisplay = anglePicker.querySelector('.angle-display');
const angleCanvas = anglePicker.querySelector('.angle-canvas');

const anglePickerWidth = anglePicker.clientWidth;
const anglePickerHeight = anglePicker.clientHeight;
const anglePickerRadius = Math.min(anglePickerWidth, anglePickerHeight) / 2;

angleCanvas.width = anglePickerWidth;
angleCanvas.height = anglePickerHeight;

const angleCtx = angleCanvas.getContext('2d');
angleCtx.translate(anglePickerWidth / 2, anglePickerHeight / 2);

function drawAnglePicker() {
  angleCtx.clearRect(-anglePickerWidth / 2, -anglePickerHeight / 2, anglePickerWidth, anglePickerHeight);

  angleCtx.beginPath();
  angleCtx.arc(0, 0, anglePickerRadius, 0, 2 * Math.PI);
  angleCtx.stroke();

  for (let i = 0; i < 360; i += 10) {
    angleCtx.beginPath();
    angleCtx.moveTo(0, 0);
    angleCtx.lineTo(anglePickerRadius * Math.cos(i * Math.PI / 180), anglePickerRadius * Math.sin(i * Math.PI / 180));
    angleCtx.stroke();
  }
}

drawAnglePicker();

let angle = 0;
let isDragging = false;

function updateAngle(event) {
  if (isDragging) {
    const rect = angleCanvas.getBoundingClientRect();
    const x = event.clientX - rect.left - anglePickerWidth / 2;
    const y = event.clientY - rect.top - anglePickerHeight / 2;
    angle = (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
    angleDisplay.textContent = angle.toFixed(0);
  }
}

angleCanvas.addEventListener('mousedown', (event) => {
  isDragging = true;
  updateAngle(event);
});

angleCanvas.addEventListener('mousemove', (event) => {
  updateAngle(event);
});

angleCanvas.addEventListener('mouseup', () => {
  isDragging = false;
});
