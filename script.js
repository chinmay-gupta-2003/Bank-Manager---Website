"use strict";

///////////////////////////////////////
//          Modal window             //
///////////////////////////////////////

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnShowModal = document.querySelector(".btn--show-modal");
const btnCloseModal = document.querySelector(".btn--close-modal");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnShowModal.addEventListener("click", openModal);
btnCloseModal.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
});

overlay.addEventListener("click", function () {
  if (!modal.classList.contains("hidden")) closeModal();
});

///////////////////////////////////////
//     Smooth scrolling learn more   //
///////////////////////////////////////

const btnLearnMore = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

btnLearnMore.addEventListener("click", function () {
  section1.scrollIntoView({ behavior: "smooth" });
});

///////////////////////////////////////
//          Page navigation          //
///////////////////////////////////////

const navLinksCont = document.querySelector(".nav__links");

navLinksCont.addEventListener("click", function (e) {
  e.preventDefault();

  const target = e.target;

  if (target.classList.contains("nav__link")) {
    const id = target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

///////////////////////////////////////
//        Navigation Fade            //
///////////////////////////////////////

const navPane = document.querySelector(".nav");

const navHoverFade = function (e, opacity) {
  const navLink = e.target;

  if (navLink.classList.contains("nav__link")) {
    const siblings = navLink.closest(".nav").querySelectorAll(".nav__link");

    siblings.forEach((link) => {
      if (link !== navLink) link.style.opacity = opacity;
    });

    document.querySelector("#logo").style.opacity = opacity;
  }
};

navPane.addEventListener("mouseover", function (e) {
  navHoverFade(e, 0.64);
});
navPane.addEventListener("mouseout", function (e) {
  navHoverFade(e, 1);
});

///////////////////////////////////////
//        Sticky Navigation          //
///////////////////////////////////////

const header = document.querySelector(".header");

const navPaneHeight = navPane.getBoundingClientRect().height;

const stickyCallBack = function (entries) {
  const entry = entries[0];

  if (!entry.isIntersecting) navPane.classList.add("sticky");
  else navPane.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyCallBack, {
  root: null,
  threshold: 0,
  rootMargin: `-${navPaneHeight}px`,
});

headerObserver.observe(header);

///////////////////////////////////////
//         Revealing Sections        //
///////////////////////////////////////

const allSections = document.querySelectorAll(".section");

const sectionCallBack = function (entries, observer) {
  const entry = entries[0];

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(sectionCallBack, {
  root: null,
  threshold: 0.24,
});

allSections.forEach((section) => {
  section.classList.add("section--hidden");
  sectionObserver.observe(section);
});

///////////////////////////////////////
//            Lazy Loading           //
///////////////////////////////////////

const lazyImages = document.querySelectorAll("img[data-src]");

const imgCallBack = function (entries, observer) {
  const entry = entries[0];

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
};

const lazyImgObserver = new IntersectionObserver(imgCallBack, {
  root: null,
  threshold: 0,
  rootMargin: "100px",
});

lazyImages.forEach((img) => lazyImgObserver.observe(img));

///////////////////////////////////////
//         Tabbed Components         //
///////////////////////////////////////

const tabsContainer = document.querySelector(".operations__tab-container");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContent = document.querySelectorAll(".operations__content");

tabsContainer.addEventListener("click", function (e) {
  const tabClicked = e.target.closest(".operations__tab");

  if (!tabClicked) return;

  tabs.forEach((tab) => tab.classList.remove("operations__tab--active"));
  tabClicked.classList.add("operations__tab--active");

  const tabNumberActive = tabClicked.getAttribute("data-tab");
  const tabDataActive = document.querySelector(
    `.operations__content--${tabNumberActive}`
  );

  tabsContent.forEach((tab) =>
    tab.classList.remove("operations__content--active")
  );
  tabDataActive.classList.add("operations__content--active");
});

///////////////////////////////////////
//             Slider                //
///////////////////////////////////////

const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotsCont = document.querySelector(".dots");

let currentSlide = 0;
const maxSlide = slides.length - 1;

const goToSlide = function (slidePass) {
  slides.forEach(
    (slide, i) =>
      (slide.style.transform = `translateX(${100 * (i - slidePass)}%)`)
  );
};

const createDots = function () {
  slides.forEach((_, i) => {
    dotsCont.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot dots__dot--active" data-slide="${i}"></button>`
    );
  });
};

const activateDots = function (dotActive) {
  const allDots = document.querySelectorAll(".dots__dot");

  allDots.forEach((dot) => dot.classList.remove("dots__dot--active"));

  document
    .querySelector(`.dots__dot[data-slide="${dotActive}"]`)
    .classList.add("dots__dot--active");
};

const nextSlide = function () {
  if (currentSlide === maxSlide) currentSlide = 0;
  else currentSlide++;

  goToSlide(currentSlide);
  activateDots(currentSlide);
};

const previousSlide = function () {
  if (currentSlide === 0) currentSlide = maxSlide;
  else currentSlide--;

  goToSlide(currentSlide);
  activateDots(currentSlide);
};

goToSlide(currentSlide);
createDots();
activateDots(currentSlide);

btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", previousSlide);

dotsCont.addEventListener("click", function (e) {
  if (!e.target.classList.contains("dots__dot")) return;

  const slideActive = e.target.dataset.slide;

  goToSlide(slideActive);
});
