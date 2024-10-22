//SLIDER
const slides = document.querySelectorAll('.slide');
const btns = document.querySelectorAll('.navigation .slidebutton');
let currentSlide = 0;
const totalSlides = slides.length;

// Function to update the active slide
function updateSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    btns[i].classList.remove('active');
  });
  slides[index].classList.add('active');
  btns[index].classList.add('active');
}

// Move to the next slide
function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlide(currentSlide);
}

// Move to the previous slide
function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateSlide(currentSlide);
}

// Button functionality
document.querySelector('.right-button').addEventListener('click', nextSlide);
document.querySelector('.left-button').addEventListener('click', prevSlide);

// Manual navigation through dots
btns.forEach((slidebutton, i) => {
  slidebutton.addEventListener('click', () => {
    currentSlide = i;
    updateSlide(i);
  });
});


// //SLIDE AUTOMÁTICO
// setInterval(() => {
//     nextSlide();
//   }, 4000); // Change slide every 4 seconds