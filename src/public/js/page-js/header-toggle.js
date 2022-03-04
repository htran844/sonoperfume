const show_toggle = document.querySelector(".show--toggle");
const hide_toggle = document.querySelector(".hide--toggle");
const navLink = document.querySelector(".header__bottom");
const hamburger = document.querySelector(".menu");

hamburger.addEventListener("click", (e) => {
  e.preventDefault();
  navLink.classList.toggle("trans");
  show_toggle.classList.toggle("hide");
  hide_toggle.classList.toggle("hide");
});
$(".header-search").click(() => {
  let name_search = $("#input-search").val();
  window.location.href = `/products?&name=${name_search}`;
});
$(".header-search-2").click(() => {
  let name_search = $("#search-2").val();
  window.location.href = `/products?&name=${name_search}`;
});
$("#input-search").on("keyup", function (e) {
  if (e.key === "Enter" || e.keyCode === 13) {
    let name_search = $("#input-search").val();
    window.location.href = `/products?&name=${name_search}`;
  }
});
$("#search-2").on("keyup", function (e) {
  if (e.key === "Enter" || e.keyCode === 13) {
    let name_search = $("#search-2").val();
    window.location.href = `/products?&name=${name_search}`;
  }
});
