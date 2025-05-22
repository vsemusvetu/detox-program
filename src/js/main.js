const btn = document.querySelector(".delivery__btn");
const popup = document.querySelector(".popup");
const closePopup = document.querySelector(".popup__close");
const popupBtn = document.querySelector(".popup__btn");
const popupBtnClose = document.querySelector(".popup__btn-close");
const popupForm = document.querySelector(".popup__wrapper-form");
const popupDone = document.querySelector(".popup__wrapper-done");

function showContent(btn, content) {
  btn.addEventListener("click", function () {
    content.style.display = "block";
  });
}
function closeContent(btn, content) {
  btn.addEventListener("click", function () {
    content.style.display = "none";
    popupDone.style.display = "none";
    popupForm.style.display = "block";
  });
}

popupBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const form = e.target.closest("form");

  if (form.checkValidity()) {
    popupForm.style.display = "none";
    popupDone.style.display = "block";
    form.reset();
  } else {
    form.reportValidity();
  }
});
popupBtnClose.addEventListener("click", function (e) {
  e.preventDefault();
  popup.style.display = "none";
  popupDone.style.display = "none";
  popupForm.style.display = "block";
});

showContent(btn, popup);
closeContent(closePopup, popup);

// hamburger
const hamburger = document.querySelector(".header__hamburger");
const navbar = document.querySelector(".header__navbar-mobile");
const closeNavbar = document.querySelector(".header__navbar-close");

showContent(hamburger, navbar);
closeContent(closeNavbar, navbar);

const prevButton = document.querySelector(".left");
const nextButton = document.querySelector(".right");
const slider = document.querySelector(".main__slider");
const slides = Array.from(slider.querySelectorAll(".main__slide"));
const slideCount = slides.length;
let slideIndex = 0;

const dotsBlock = document.querySelector(".main__dots");
const dots = document.querySelectorAll(".main__dot");

// slider

prevButton.addEventListener("click", showPreviousSlide);
nextButton.addEventListener("click", showNextSlide);

function showPreviousSlide() {
  slideIndex = (slideIndex - 1 + slideCount) % slideCount;
  updateSlider();
}

function showNextSlide() {
  slideIndex = (slideIndex + 1) % slideCount;
  updateSlider();
}

function updateSlider() {
  slides.forEach((slide, index) => {
    if (index === slideIndex) {
      slide.style.display = "block";
      for (const dot of dots) {
        dot.classList.remove("active");
      }
      dots[slideIndex].classList.add("active");
    } else {
      slide.style.display = "none";
    }
  });
}

updateSlider();

// dot

dotsBlock.addEventListener("click", (e) => {
  const target = e.target;

  if (target.className === "main__dot") {
    for (const dot of dots) {
      dot.classList.remove("active");
    }
    slides[slideIndex].style.display = "none";
    slideIndex = target.dataset.id - 1;
    slides[slideIndex].style.display = "block";
    target.classList.add("active");
  }
});

// phoneInput

const phoneInput = document.querySelector('input[type="tel"]');

phoneInput.addEventListener('focus', function () {
  if (!this.value) this.value = '+7 (';
});

phoneInput.addEventListener('input', function () {
  let value = this.value.replace(/\D/g, '');

  if (value.startsWith('8')) value = '7' + value.slice(1);
  if (!value.startsWith('7')) value = '7' + value;

  value = value.slice(0, 11);

  let formatted = '+7 (';

  if (value.length > 1) formatted += value.slice(1, 4);
  if (value.length >= 4) formatted += ') ' + value.slice(4, 7);
  if (value.length >= 7) formatted += '-' + value.slice(7, 9);
  if (value.length >= 9) formatted += '-' + value.slice(9, 11);

  this.value = formatted;
});

phoneInput.addEventListener('blur', function () {
  if (this.value === '+7 (') this.value = '';
});


