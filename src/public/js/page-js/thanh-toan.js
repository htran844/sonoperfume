let total_quantity = 0;
let total_cost = 0;
function renderProducts() {
  let products = JSON.parse(localStorage.getItem("products"));

  let pr_sp_render = $(".pr_sp_render");

  products.forEach((product) => {
    let div = `<div class="product__sp">
    <div class="sp__image">
        <img src="${product.image}"
            alt="${product.name}">
    </div>
    <div class="sp__name">${product.name}</div>
    <div class="sp__cost">
        <div class="cost__quantity">x <span id="sp-quantity">${product.quantity}</span></div>
        <div class="cost__money">${product.cost}</div>
    </div>
</div> `;

    // lay so luong va gia tien
    total_quantity += product.quantity;
    total_cost = total_cost + product.quantity * product.cost;
    //apend
    pr_sp_render.append(div);
  });

  document.querySelector("#total-quantity").innerHTML = total_quantity;
  document.querySelector("#cost_end").innerHTML =
    (total_cost + 35000).toLocaleString("en").replace(/\,/g, ".") + " đ";
  document.querySelector("#total_cost").innerHTML =
    total_cost.toLocaleString("en").replace(/\,/g, ".") + " đ";
  document.querySelector(".btn-dathang").innerHTML =
    "Đặt hàng - " +
    (total_cost + 35000).toLocaleString("en").replace(/\,/g, ".") +
    " đ";
}
renderProducts();
$("#vi-sono").click(async (e) => {
  let result = await $.ajax({
    method: "GET",
    url: "/account/api/getvisono",
    data: {},
  });
  let new_refund_cost = result.data;
  document.querySelector(".visono").innerHTML =
    "- " + new_refund_cost.toLocaleString("en").replace(/\,/g, ".") + " đ";
  if (document.querySelector("#vi-sono").checked == true) {
    document.querySelector("#cost_end").innerHTML =
      (total_cost + 35000 - new_refund_cost)
        .toLocaleString("en")
        .replace(/\,/g, ".") + " đ";
    document.querySelector(".btn-dathang").innerHTML =
      "Đặt hàng - " +
      (total_cost + 35000 - new_refund_cost)
        .toLocaleString("en")
        .replace(/\,/g, ".") +
      " đ";
  } else {
    document.querySelector("#cost_end").innerHTML =
      (total_cost + 35000).toLocaleString("en").replace(/\,/g, ".") + " đ";
    document.querySelector(".btn-dathang").innerHTML =
      "Đặt hàng - " +
      (total_cost + 35000).toLocaleString("en").replace(/\,/g, ".") +
      " đ";
  }
  let element_refund = document.querySelector(".visono");
  element_refund.classList.toggle("gray");
});
$(".btn-dathang").click(async () => {
  try {
    $("#btn-dh").prop("disabled", true);
    $("#btn-dh").addClass("btn-loading-on");
    //get data
    let visono = $("#vi-sono").is(":checked");
    let message = $("#note").val();
    let name = $("#name").val();
    let email = $("#email").val();
    let phone = $("#phone").val();
    let address = $("#address").val();
    let payment = $("input[type='radio'][name='payment']:checked").val();
    // validate
    // phone
    let vnf_regex = /(0+([0-9]{9})\b)/g;
    if (!vnf_regex.test(phone)) {
      alertify.warning("Số điện thoại không đúng định dạng");
      $("#btn-dh").prop("disabled", false);
      $("#btn-dh").removeClass("btn-loading-on");
      return;
    }

    // payment
    if (typeof payment === "undefined") {
      alertify.warning("Vui lòng chọn phương thức thanh toán");
      $("#btn-dh").prop("disabled", false);
      $("#btn-dh").removeClass("btn-loading-on");
      return;
    }
    // lay local storage
    let listProduct = JSON.parse(localStorage.getItem("products"));

    let result = await $.ajax({
      method: "POST",
      url: "/order/api/create",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        email,
        name,
        phone,
        address,
        message,
        visono,
        payment,
        listProduct: listProduct,
      }),
    });
    $("#btn-dh").prop("disabled", false);
    $("#btn-dh").removeClass("btn-loading-on");
    if (result.message == "success") {
      alertify.success("Đặt đơn hàng thành công");
      // chuyển hướng về trang tài khoản có đơn hàng
    } else {
      alertify.warning("Có lỗi xảy ra vui lòng thử lại");
    }
  } catch (error) {
    throw error;
  }
});
