let items = document.querySelectorAll('.slider .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');

let active = 0; 
const totalItems = items.length;
let isTransitioning = false; 


let slider = document.querySelector('.slider');
slider.style.width = `${totalItems * (310 + 10)}px`; 

// Function to load the current view
function loadShow() {
    let offset = -active * (310 + 10); 
    slider.style.transform = `translateX(${offset}px)`;
}

// Disable buttons while transitioning
function disableButtons() {
    isTransitioning = true;
    slider.addEventListener('transitionend', () => {
        isTransitioning = false;
    }, { once: true });
}

// Event for next button
next.onclick = function () {
    if (!isTransitioning) {
        if (active < totalItems - 1) {
            active++;
        } else {
            active = 0; 
        }
        loadShow();
        disableButtons();
    }
};

// Event for prev button
prev.onclick = function () {
    if (!isTransitioning) {
        if (active > 0) {
            active--;
        } else {
            active = totalItems - 1; 
        }
        loadShow();
        disableButtons();
    }
};

// Initial load
loadShow();



