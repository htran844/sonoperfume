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
function show_popup() {
  const popup = document.querySelector(".popup-product");
  const body = document.querySelector(".wrapper");
  body.classList.add("blur");
  popup.classList.remove("hide");
  popup.classList.add("show");
}
$(".popup-buying").click(() => {
  const popup = document.querySelector(".popup-product");
  const body = document.querySelector(".wrapper");
  popup.classList.add("hide");
  body.classList.remove("blur");
});
function handle_mua(slug) {
  show_popup();
  let url = window.location.href;
  let quantity = 0;
  let ip = document.querySelector(".inp-sl");
  if (!ip) {
    quantity = 1;
  } else {
    quantity = Number(document.querySelector(".inp-sl").value);
  }

  let newProduct = {
    slug: slug,
    quantity: quantity,
  };
  let storage = JSON.parse(localStorage.getItem("products"));
  if (storage) {
    let check = false;
    storage = storage.map((product) => {
      if (product.slug === slug) {
        product.quantity += quantity;
        check = true;
      }
      return product;
    });

    if (check == false) {
      storage.push(newProduct);
    }
    localStorage.removeItem("products");
    localStorage.setItem("products", JSON.stringify(storage));
  } else {
    let storage = [newProduct];
    localStorage.setItem("products", JSON.stringify(storage));
  }
  dem_cart();
}

function dem_cart() {
  let storage = JSON.parse(localStorage.getItem("products"));
  let count = 0;
  storage.forEach((ele) => {
    count += ele.quantity;
  });
  document.querySelector(".header__mid_cart--count").innerHTML = count;
}
dem_cart();
$("#logout").click((e) => {
  e.preventDefault();
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
  window.location.href = "/";
});
