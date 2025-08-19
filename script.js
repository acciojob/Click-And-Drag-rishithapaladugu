// // Your code here.

// let items=document.querySelectorAll(".item");
// let offsetX,offsetY;
// let isDragging=false;
// let currentItem=null;


// let container=document.querySelector(".items");
// container.style.position="relative";
// items.forEach((item)=>{
// 	let rect=item.getBoundingClientRect();
// 	let parentRect=item.parentElement.getBoundingClientRect();
// 	item.style.position="absolute";
// 	item.style.left=(rect.left-parentRect.left)+"px";
// 	item.style.top=(rect.top-parentRect.top)+"px"

// 	item.addEventListener("mousedown",(e)=>{
// 		isDragging=true;
// 		currentItem=e.target;
// 		offsetX=e.clientX-currentItem.offsetLeft;
// 		offsetY=e.clientY-currentItem.offsetTop;
// 		e.preventDefault();
// 	})

// 	document.addEventListener("mousemove",(e)=>{
// 		if(!isDragging ||!currentItem){
// 			return
// 		}
// 		currentItem.style.left=(e.clientX-offsetX)+"px";
// 		currentItem.style.top=(e.clientY-offsetY)+"px";
// 	})

// 	document.addEventListener("mouseup",(e)=>{
// 		isDragging=false;
// 		currentItem=null;
// 	})
// })



// // box.addEventListener("mousedown",(e)=>{
// //   isDragging=true;
// //   offsetX=e.clientX-box.offsetLeft;
// //   offsetY=e.clientY-box.offsetTop;
// //   e.preventDefault();
  
// // })

// // box.addEventListener("mousemove",(e)=>{
// //   // isDragging=false;
// //   if(!isDragging){
// //     return;
// //   }
// //   box.style.left=(e.clientX-offsetX)+"px"
// //   box.style.top=(e.clientY-offsetY)+"px"
// // })

// // box.addEventListener("mouseup",()=>{
// //   isDragging=false;
// // })

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
  currentItem.style.left = (e.clientX - offsetX) + "px";
  currentItem.style.top = (e.clientY - offsetY) + "px";
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  currentItem = null;
