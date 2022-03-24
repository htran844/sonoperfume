function renderProducts() {
  let products = JSON.parse(localStorage.getItem("products"));

  let table_content = $(".table-content");
  // table_content.empty();
  if (!products) {
    $(".cart-bottom").empty();
    let the_div = `<div>
                            <div class="notify-backhome">Chưa có sản phẩm nào trong giỏ hàng </div>
                        <a href="/products" class="back-products">Về trang
                            sản phẩm</a>
                        </div>`;
    table_content.append(the_div);
    return;
  }
  products.forEach((product) => {
    let tr = `
    <tr>
    <td>
        <a href="/products/${product.slug}">
            <img src="${product.image}"
                alt="${product.name}">
        </a>
    </td>
    <td class="name-gia">
        <a href="/products/${product.slug}">
        ${product.name}
        </a>
        <div class="product-gia">Giá:<span>${product.cost
          .toLocaleString("en")
          .replace(/\,/g, ".")}</span>₫</div>
    </td>
    <td class="quantity-del">
        <div class="input-wrap" slug="${product.slug}" refund="${
      product.refund
    }" cost="${product.cost}">
            <button class="btn-ip prev">-</button>
            <input type="number" name="" id="" min="1" readonly value="${
              product.quantity
            }">
            <button class="btn-ip next">+</button>
        </div>

        <button class="btn-del" slug="${product.slug}">
            <ion-icon name="close-outline"></ion-icon>
        </button>
    </td>
    <td>

    </td>
</tr>
      `;
    table_content.append(tr);
  });
  // tinh tong tien
  reloadcost();
  //xoa
  $(".btn-del").click(function () {
    let slug = $(this)
      .closest(".quantity-del")
      .find(".input-wrap")
      .attr("slug");
    let products = JSON.parse(localStorage.getItem("products"));
    let newProducts = products.filter((product) => {
      return product.slug != slug;
    });
    localStorage.removeItem("products");
    localStorage.setItem("products", JSON.stringify(newProducts));
    $(this).closest("tr").remove();
    reloadcost();
    dem_cart();
  });
  // tang giam so lượng
  $(".prev").click(function () {
    let prev = $(this).closest(".input-wrap").find("input").val();
    if (prev == 1) {
      $(this).closest(".input-wrap").find("input").val("1");
    } else {
      prevVal = prev - 1;
      $(this).closest(".input-wrap").find("input").val(prevVal);
      console.log($(this).closest(".input-wrap").attr("slug"));
      let slug = $(this).closest(".input-wrap").attr("slug");
      let products = JSON.parse(localStorage.getItem("products"));
      products = products.map((product) => {
        if (product.slug == slug) {
          let newQuantity = product.quantity - 1;
          let newProduct = { ...product, quantity: newQuantity };
          return newProduct;
        } else {
          return product;
        }
      });
      localStorage.removeItem("products");
      localStorage.setItem("products", JSON.stringify(products));
      reloadcost();
      dem_cart();
    }
  });
  $(".next").click(function () {
    let next = Number($(this).closest(".input-wrap").find("input").val());
    if (next == 9) {
      $(this).closest(".input-wrap").find("input").val("9");
    } else {
      nextVal = next + 1;
      $(this).closest(".input-wrap").find("input").val(nextVal);
      console.log($(this).closest(".input-wrap").attr("slug"));
      let slug = $(this).closest(".input-wrap").attr("slug");
      let products = JSON.parse(localStorage.getItem("products"));
      products = products.map((product) => {
        if (product.slug == slug) {
          let newQuantity = product.quantity + 1;
          let newProduct = { ...product, quantity: newQuantity };
          return newProduct;
        } else {
          return product;
        }
      });
      localStorage.removeItem("products");
      localStorage.setItem("products", JSON.stringify(products));
      reloadcost();
      dem_cart();
    }
  });
}

async function getLocalstorage() {
  let list = JSON.parse(localStorage.getItem("products"));
  let products = await $.ajax({
    url: "/product/api/get-all-cart",
    method: "GET",
    data: {
      list: list,
    },
  });
  if (products) {
    localStorage.removeItem("products");
    localStorage.setItem("products", JSON.stringify(products.data));
  }
  renderProducts();
}
getLocalstorage();

function reloadcost() {
  let list = document.querySelectorAll(".input-wrap");
  let totalcost = 0;
  let totalrefund = 0;
  let totalproduct = 0;
  for (let i = 0; i < list.length; i++) {
    totalproduct += Number(list[i].querySelector("input").value);
    totalcost +=
      Number(list[i].getAttribute("cost")) *
      Number(list[i].querySelector("input").value);
    totalrefund +=
      Number(list[i].getAttribute("refund")) *
      Number(list[i].querySelector("input").value);
  }
  document.querySelector("#totalproduct").innerHTML = totalproduct;
  document.querySelector("#totalcost").innerHTML =
    totalcost.toLocaleString("en").replace(/\,/g, ".") + " đ";
  document.querySelector("#totalrefund").innerHTML =
    totalrefund.toLocaleString("en").replace(/\,/g, ".") + " đ";
}
$(".thanhtoan").click(() => {
  try {
    let token = getCookie("token");
    if (typeof token === "undefined") {
      window.location.href = "/dang-ky";
    } else {
      window.location.href = "/thanh-toan";
    }
  } catch (error) {
    throw error;
  }
});
function getCookie(cName) {
  const name = cName + "=";
  const cDecoded = decodeURIComponent(document.cookie); //to be careful
  const cArr = cDecoded.split("; ");
  let res;
  cArr.forEach((val) => {
    if (val.indexOf(name) === 0) res = val.substring(name.length);
  });
  return res;
}
