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
    slidesToScroll: 2,
    adaptiveHeight: true,
    arrows: true,
    prevArrow: `<ion-icon name="arrow-back-outline" class="arrow-back-outline"></ion-icon>`,
    nextArrow: `<ion-icon name="arrow-forward-outline" class="arrow-forward-outline"></ion-icon>`,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: true,
          // centerMode: true,
          centerPadding: "40px",
          slidesToShow: 4,
          slidesToScroll: 2,
          // swipeToSlide: true,
          // rows: 1,
        },
      },
      {
        breakpoint: 830,
        settings: {
          arrows: false,
          // centerMode: false,
          centerPadding: "50px",
          slidesToShow: 3,
          slidesToScroll: 2,
          swipeToSlide: true,
          // rows: 1,
        },
      },
      {
        breakpoint: 769,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 541,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 300,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "20px",
          slidesToShow: 1,
        },
      },
    ],
  });
});
