$("#btn-pass").click(async () => {
  let oldpass = $("#old-pass").val();
  let newpass = $("#new-pass").val();
  let renewpass = $("#renew-pass").val();
  if (oldpass.length == 0 || newpass.length == 0 || renewpass.length == 0) {
    alertify.warning("Phải điền đủ thông tin");
    return;
  }
  if (newpass != renewpass) {
    alertify.warning("Mật khẩu nhập lại không khớp");
    return;
  }
  if (newpass.length < 6) {
    alertify.warning("Mật khẩu phải 6 ký tự trở lên");
    return;
  }
  if (oldpass.length < 6) {
    alertify.warning("Mật khẩu phải 6 ký tự trở lên");
    return;
  }
  let result = await $.ajax({
    url: "/account/api/changepass",
    method: "POST",
    data: {
      oldpass,
      newpass,
    },
  });
  if (result.message == "success") {
    alertify.success("Đổi mật khẩu thành công");
    setTimeout(() => {
      location.reload();
    }, 2000);
  } else {
    alertify.error("Mật khẩu hiện tại không đúng hoặc có lỗi xảy ra");
  }
});
$("#btn-cn").click(async () => {
  $("#btn-cn").prop("disabled", true);
  $("#btn-cn").addClass("btn-loading-on");
  let name = $("#name").val();
  let email = $("#email").val();
  let phone = $("#phone").val();
  let vnf_regex = /(0+([0-9]{9})\b)/g;
  if (!vnf_regex.test(phone)) {
    alertify.warning("Số điện thoại không đúng định dạng");
    $("#btn-cn").prop("disabled", false);
    $("#btn-cn").removeClass("btn-loading-on");
    return;
  }
  let address = $("#address").val();
  let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailPattern.test(email)) {
    alertify.warning("Email không đúng định dạng");
    $("#btn-cn").prop("disabled", false);
    $("#btn-cn").removeClass("btn-loading-on");
    return;
  }
  let result = await $.ajax({
    url: "/account/api/changeinfo",
    method: "POST",
    data: {
      name,
      email,
      phone,
      address,
    },
  });

  $("#btn-cn").prop("disabled", false);
  $("#btn-cn").removeClass("btn-loading-on");
  if (result.message == "success") {
    alertify.success("Đổi thông tin thành công");
    setCookie("token", result.data, 300);
  } else {
    alertify.error("Có lỗi khi đổi thông tin");
  }
});
function setCookie(cName, cValue, expDays) {
  let date = new Date();
  date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
}
