// JS for click-and-dragging individual cubes inside the .items boundary

const items = document.querySelector(".items");
const cubes = Array.from(document.querySelectorAll(".item"));

let dragging = false;
let selected = null;
let startX = 0;
let startY = 0;
let startLeft = 0;
let startTop = 0;

// Helper to clamp within container bounds
function clamp(v, min, max) {
  return Math.max(min, Math.min(v, max));
}

// Initialize: convert current visual positions to absolute coords
function initAbsolutePositions() {
  const parentRect = items.getBoundingClientRect();

  cubes.forEach((cube) => {
    // Establish absolute positioning once
    cube.style.position = "absolute";
    cube.style.willChange = "left, top";
    // Compute current position relative to the container's padding box
    const r = cube.getBoundingClientRect();
    const left = r.left - parentRect.left;
    const top = r.top - parentRect.top;

    cube.style.left = `${left}px`;
    cube.style.top = `${top}px`;
  });
}

initAbsolutePositions();

// Start dragging on mousedown
cubes.forEach((cube) => {
  cube.addEventListener("mousedown", (e) => {
    e.preventDefault();

    selected = cube;
    dragging = true;

    items.classList.add("active");
    selected.style.zIndex = "1000";

    startX = e.clientX;
    startY = e.clientY;

    // Current numeric left/top as starting point
    startLeft = parseFloat(selected.style.left) || 0;
    startTop = parseFloat(selected.style.top) || 0;
  });
});

// Move with mouse
document.addEventListener("mousemove", (e) => {
  if (!dragging || !selected) return;

  const dx = e.clientX - startX;
  const dy = e.clientY - startY;

  const parentRect = items.getBoundingClientRect();
  const maxLeft = parentRect.width - selected.offsetWidth;
  const maxTop = parentRect.height - selected.offsetHeight;

  let newLeft = clamp(startLeft + dx, 0, maxLeft);
  let newTop = clamp(startTop + dy, 0, maxTop);

  selected.style.left = `${newLeft}px`;
  selected.style.top = `${newTop}px`;
});

// Drop on mouseup
document.addEventListener("mouseup", () => {
  if (!dragging) return;

  dragging = false;
  if (selected) {
    selected.style.zIndex = "";
  }
  items.classList.remove("active");
  selected = null;
});

// Keep cubes inside if window resizes
window.addEventListener("resize", () => {
  const parentRect = items.getBoundingClientRect();
  cubes.forEach((cube) => {
    const maxLeft = parentRect.width - cube.offsetWidth;
    const maxTop = parentRect.height - cube.offsetHeight;

    let left = parseFloat(cube.style.left) || 0;
    let top = parseFloat(cube.style.top) || 0;

    cube.style.left = `${clamp(left, 0, maxLeft)}px`;
    cube.style.top = `${clamp(top, 0, maxTop)}px`;
  });
});