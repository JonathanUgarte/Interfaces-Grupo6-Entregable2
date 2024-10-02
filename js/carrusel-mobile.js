let items = document.querySelectorAll('.slider .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');

let active = 0; // Start with the first card
const totalItems = items.length;

// Function to load the current view
function loadShow() {
  // Calculate the offset for the slider
  let offset = -active * 310; // 310px is the width of each card plus margin
  document.querySelector('.slider').style.transform = `translateX(${offset}px)`;
}

// Event for next button
next.onclick = function () {
  // Update the active index, looping back to 0 if necessary
  active = (active + 1) % totalItems; 
  loadShow();
};

// Event for prev button
prev.onclick = function () {
  // Update the active index, looping back to the last item if necessary
  active = (active - 1 + totalItems) % totalItems; 
  loadShow();
};

// Initial load
loadShow();

