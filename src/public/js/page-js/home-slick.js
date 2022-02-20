const hamburger = document.querySelector(".menu");
const show_toggle = document.querySelector(".show--toggle");
const hide_toggle = document.querySelector(".hide--toggle");
const navLink = document.querySelector(".header__bottom");

hamburger.addEventListener("click", (e) => {
  e.preventDefault();
  navLink.classList.toggle("trans");
  show_toggle.classList.toggle("hide");
  hide_toggle.classList.toggle("hide");
});
$(document).ready(function () {
  $(".list__blogs").slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 1,
        },
      },
    ],
  });
  $(".slider__show").slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 2000,
  });
  $(".nam__list").slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 5,
    adaptiveHeight: true,
    arrows: true,
    prevArrow: `<ion-icon name="arrow-back-outline" class="arrow-back-outline"></ion-icon>`,
    nextArrow: `<ion-icon name="arrow-forward-outline" class="arrow-forward-outline"></ion-icon>`,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: true,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 769,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 541,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 1,
        },
      },
    ],
  });
});
