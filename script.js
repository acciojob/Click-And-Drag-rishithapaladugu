// Your code here.
 const slider = document.querySelector('.items');
  let isDown = false;
  let startX;
  let scrollLeft;

  function startDrag(x) {
    isDown = true;
    slider.classList.add('active');
    startX = x - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  }

  function endDrag() {
    isDown = false;
    slider.classList.remove('active');
  }

  function moveDrag(x, e) {
    if (!isDown) return;
    e.preventDefault();
    const pos = x - slider.offsetLeft;
    const walk = (pos - startX) * 2; // scroll speed multiplier
    slider.scrollLeft = scrollLeft - walk;
  }

  // ---- Mouse Events ----
  slider.addEventListener('mousedown', (e) => startDrag(e.pageX));
  slider.addEventListener('mouseup', endDrag);
  slider.addEventListener('mouseleave', endDrag);
  slider.addEventListener('mousemove', (e) => moveDrag(e.pageX, e));

  // ---- Touch Events (mobile) ----
  slider.addEventListener('touchstart', (e) => startDrag(e.touches[0].pageX));
  slider.addEventListener('touchend', endDrag);
  slider.addEventListener('touchmove', (e) => moveDrag(e.touches[0].pageX, e));

  // ---- Pointer Events (for Cypress / modern browsers) ----
  slider.addEventListener('pointerdown', (e) => startDrag(e.clientX));
  slider.addEventListener('pointerup', endDrag);
  slider.addEventListener('pointerleave', endDrag);
  slider.addEventListener('pointermove', (e) => moveDrag(e.clientX, e));