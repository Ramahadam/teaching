//custm js
const btnMenu = document.querySelector(".btn-menu");
const navigationMenu = document.querySelector(".navbar-menu");
const exitMenu = document.querySelector(".exitMenu");
const enrlTabsContainer = document.querySelector(".enrollment__tabs");
const enrlContents = document.querySelectorAll(".enrollment__content");
const enrlTabsBtn = document.querySelectorAll(".enrollment__tab");
const btnCourses = document.getElementById("courses");
const btnServices = document.getElementById("services");
const btnTestimon = document.getElementById("testimonials");
const btnProfession = document.getElementById("professional");
const login = document.querySelector(".login");
const register = document.querySelector(".register");
const formClose = document.querySelector(".form--close");
const formCloseRegister = document.querySelector(".form--close__register");
const overlay = document.querySelector(".overlay");
const links = document.querySelectorAll(".nav-link");
const nav = document.querySelector(".nav");
const section1 = document.querySelector(".services");
const hero = document.getElementById("hero");
const btnLogin = document.getElementById("login");
const btnRegister = document.getElementById("register");
const slides = document.querySelectorAll(".card--slide");
const slider = document.querySelector(".slider");
const btnRight = document.querySelector(".btn__right");
const btnLeft = document.querySelector(".btn__left");
let curSlide = 0;
let maxSlide = slides.length;

//Open the menu on click
btnMenu.addEventListener("click", openMenu);

//close menu
exitMenu.addEventListener("click", openMenu);

function openMenu() {
  navigationMenu.classList.toggle("show");
}

/**
 * Login & Register form
 */

//Dark Mode : TODO

document.addEventListener("scroll", function () {
  if (Math.floor(window.scrollY) >= 1000) {
    document.getElementById("scroll").style.display = "block";
  } else {
    document.getElementById("scroll").style.display = "none";
  }
});

//Smooth scroll

//scroller function
function scroller(sectionName) {
  return sectionName.scrollIntoView({ behavior: "smooth" });
}

document.querySelector(".navbar-menu").addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav-link")) {
    const section = e.target.id;

    if (section == "login") {
      login.classList.toggle("show");
      overlay.classList.toggle("show");
    } else if (section == "register") {
      register.classList.toggle("show");
      overlay.classList.toggle("show");
    } else
      document
        .querySelector(`.${section}`)
        .scrollIntoView({ behavior: "smooth" });
  }
});

formClose.addEventListener("click", function () {
  login.classList.toggle("show");
  overlay.classList.toggle("show");
});
formCloseRegister.addEventListener("click", function () {
  register.classList.toggle("show");
  overlay.classList.toggle("show");
});

/*
Tab module component

*/

enrlTabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".enrollment__tab");

  //Guard cluse
  if (!clicked) return;

  //Remvoing active class on the buttons
  enrlTabsBtn.forEach((btn) => btn.classList.remove("enrollment__tab--active"));
  clicked.classList.add("enrollment__tab--active");

  //Displaying content based on the dataset
  const tabNumber = clicked.dataset.tab;
  console.log(tabNumber);

  //Remove all active contents
  enrlContents.forEach((content) =>
    content.classList.remove("enrollment__content--active")
  );

  //Activating the class content
  document
    .querySelector(`.enrollment__content--${tabNumber}`)
    .classList.add("enrollment__content--active");
});

/**
 *
 * Navigation fade on menu
 */

const handOver = function (e) {
  if (e.target.classList.contains("nav-link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav-link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((ele) => {
      if (ele !== link) ele.style.opacity = this;
      logo.style.opacity = this;
    });
  }
};

nav.addEventListener("mouseover", handOver.bind(0.5));
nav.addEventListener("mouseout", handOver.bind(1));

/***
 *
 * Sticky menu
 */

/***
 *
 * Implementing sticky note with
 * intersection observer
 */
const navHeight = Math.trunc(nav.getBoundingClientRect().height);
console.log(navHeight);

const sticktyCall = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const heroObserver = new IntersectionObserver(sticktyCall, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

heroObserver.observe(hero);

/**
 * Reavel page scrolling effects using observer
 */

const allSections = document.querySelectorAll(".section");

const secCallbak = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
};
const sectionObserver = new IntersectionObserver(secCallbak, {
  root: null,
  threshold: 0.25,
});

allSections.forEach((section) => {
  sectionObserver.observe(section);
  //TODO comment the code below for developing slider, remove comment after done
  // section.classList.add("section--hidden");
});

/******************************************** Slider ***********************/

const goToSlide = function (curSlide) {
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${100 * (i - curSlide)}% )`;
  });
};

goToSlide(0);

//Next slide
const nextSlide = function () {
  if (curSlide === maxSlide - 1) curSlide = 0;
  else curSlide++;

  goToSlide(curSlide);
};

//PrevSlider
const prevSlide = function () {
  if (curSlide === 0) curSlide = maxSlide - 1;
  else curSlide--;

  goToSlide(curSlide);
};

btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);
