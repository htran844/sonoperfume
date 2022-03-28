$(".btn-capnhat").click(async () => {
  try {
    let _id = $("#_id").attr("orderID");
    let email = $("#email").val();
    let name = $("#name").val();
    let phone = $("#phone").val();
    let address = $("#address").val();
    let message = $("#message").val();
    let totalCost = $("#totalCost").val();
    let refundcost = $("#refundcost").val();
    let payment = $("#payment").val();
    let status = $("#status").val();

    let order = {
      email,
      name,
      phone,
      address,
      message,
      totalCost,
      refundcost,
      payment,
      status,
    };

    let result = await $.ajax({
      method: "PUT",
      url: "/order/api/update",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        orderId: _id,
        order,
      }),
    });
    if (result.message == "success") {
      alertify.success("Cập nhật đơn hàng thành công");
      // chuyển hướng về trang tài khoản có đơn hàng
    } else {
      alertify.warning("Có lỗi xảy ra vui lòng thử lại");
    }
  } catch (error) {
    throw error;
  }
});
