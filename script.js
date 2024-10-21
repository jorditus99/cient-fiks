//SLIDER
const slides = document.querySelectorAll('.slide');
const btns = document.querySelectorAll('.navigation .slidebutton');
let currentSlide = 0;
const totalSlides = slides.length;

//NAVEGACIÓN MANUAL DEL SLIDER
function updateSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    btns[i].classList.remove('active');
  });
  slides[index].classList.add('active');
  btns[index].classList.add('active');
}

//BOTONES SLIDE
function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlide(currentSlide);
}

btns.forEach((slidebutton, i) => {
  slidebutton.addEventListener('click', () => {
    currentSlide = i;
    updateSlide(i);
  });
});

//SLIDE AUTOMÁTICO
setInterval(() => {
    nextSlide();
  }, 4000); // Change slide every 4 seconds