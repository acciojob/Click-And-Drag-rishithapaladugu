// --- SELECT ELEMENTS ---
    const container = document.querySelector('.items');

    // --- STATE MANAGEMENT ---
    let activeItem = null;        // The cube being dragged
    let isDraggingItem = false;   // Flag for cube dragging
    let isDraggingContainer = false; // Flag for container scrolling

    // Variables for container scrolling
    let startX;
    let scrollLeft;

    // Variables for item dragging
    let itemOffsetX;
    let itemOffsetY;
    let lastMouseEvent;
    let scrollInterval = null;

    // --- MASTER MOUSE DOWN LISTENER ---
    container.addEventListener('mousedown', (e) => {
      const clickedItem = e.target.closest('.item');

      if (clickedItem) {
        // --- CASE 1: USER IS DRAGGING AN INDIVIDUAL CUBE ---
        e.preventDefault();
        isDraggingItem = true;
        activeItem = clickedItem;
        lastMouseEvent = e;

        activeItem.classList.add('dragging');
        activeItem.style.position = 'absolute';
        activeItem.style.zIndex = 1000;

        const rect = activeItem.getBoundingClientRect();
        itemOffsetX = e.clientX - rect.left;
        itemOffsetY = e.clientY - rect.top;

        scrollInterval = setInterval(autoScroll, 16);

      } else if (e.target === container) {
        // --- CASE 2: USER IS DRAGGING THE CONTAINER BACKGROUND ---
        isDraggingContainer = true;
        container.classList.add('active');
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
      }

      // Add global listeners only when a drag starts
      if (isDraggingItem || isDraggingContainer) {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
      }
    });

    // --- GLOBAL MOUSE MOVE HANDLER ---
    function handleMouseMove(e) {
      if (isDraggingItem) {
        if (!activeItem) return;
        lastMouseEvent = e;
        const containerRect = container.getBoundingClientRect();
        let newX = e.clientX - containerRect.left - itemOffsetX + container.scrollLeft;
        let newY = e.clientY - containerRect.top - itemOffsetY;

        // Boundary checks
        const minX = 0, minY = 0;
        const maxX = container.scrollWidth - activeItem.offsetWidth;
        const maxY = container.clientHeight - activeItem.offsetHeight;

        activeItem.style.left = `${Math.max(minX, Math.min(newX, maxX))}px`;
        activeItem.style.top = `${Math.max(minY, Math.min(newY, maxY))}px`;

      } else if (isDraggingContainer) {
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2; // Scroll multiplier
        container.scrollLeft = scrollLeft - walk;
      }
    }

    // --- GLOBAL MOUSE UP HANDLER ---
    function handleMouseUp() {
      if (isDraggingItem) {
        clearInterval(scrollInterval);
        if (activeItem) {
          activeItem.classList.remove('dragging');
          activeItem.style.zIndex = '';
          activeItem = null;
        }
      }
      
      if (isDraggingContainer) {
        container.classList.remove('active');
      }

      isDraggingItem = false;
      isDraggingContainer = false;
      lastMouseEvent = null; // Reset for safety

      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    // --- AUTO-SCROLL FOR ITEM DRAGGING ---
    function autoScroll() {
      if (!isDraggingItem || !activeItem || !lastMouseEvent) return;

      const containerRect = container.getBoundingClientRect();
      const mouseX = lastMouseEvent.clientX;
      const scrollZone = 60;
      const scrollSpeed = 10;

      if (mouseX > containerRect.right - scrollZone) {
        container.scrollLeft += scrollSpeed;
      } else if (mouseX < containerRect.left + scrollZone) {
        container.scrollLeft -= scrollSpeed;
      }
    }