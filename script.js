let items = document.querySelectorAll(".item");
let offsetX, offsetY;
let isDragging = false;
let currentItem = null;

let container = document.querySelector(".items");
container.style.position = "relative"; // coordinates will be relative to this

// First, measure while still in flex
let positions = [];
items.forEach(item => {
  let rect = item.getBoundingClientRect();
  let parentRect = container.getBoundingClientRect();
  positions.push({
    item: item,
    left: rect.left - parentRect.left,
    top: rect.top - parentRect.top
  });
});

// Now make them absolute and place them where they were
positions.forEach(pos => {
  pos.item.style.position = "absolute";
  pos.item.style.left = pos.left + "px";
  pos.item.style.top = pos.top + "px";

  pos.item.addEventListener("mousedown", e => {
    isDragging = true;
    currentItem = pos.item;
    offsetX = e.clientX - currentItem.offsetLeft;
    offsetY = e.clientY - currentItem.offsetTop;
    e.preventDefault();
  });
});

document.addEventListener("mousemove", e => {
  if (!isDragging || !currentItem) return;
  let newLeft = e.clientX - offsetX;
  let newTop = e.clientY - offsetY;

  // Boundary checks
  const containerRect = container.getBoundingClientRect();
  const itemRect = currentItem.getBoundingClientRect();

  if (newLeft < 0) newLeft = 0;
  if (newTop < 0) newTop = 0;
  if (newLeft + itemRect.width > containerRect.width) {
    newLeft = containerRect.width - itemRect.width;
  }
  if (newTop + itemRect.height > containerRect.height) {
    newTop = containerRect.height - itemRect.height;
  }

  currentItem.style.left = newLeft + "px";
  currentItem.style.top = newTop + "px";
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  currentItem = null;
});