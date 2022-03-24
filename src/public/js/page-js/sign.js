$(".btn-up").click(async () => {
  const email = $("#email").val();
  const password = $("#pass").val();
  const repass = $("#re-pass").val();
  if (password.length < 6) {
    alertify.warning("Mật khẩu ít nhất 6 ký tự");
    return;
  }
  let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailPattern.test(email)) {
    alertify.warning("Email không đúng định dạng");
    return;
  }

  if (password != repass) {
    alertify.warning("Mật khẩu nhập lại không đúng");
    return;
  }
  let result = await $.ajax({
    url: "/account/api/create-account",
    method: "POST",
    data: {
      email,
      password,
    },
  });
  if (result.message == "success") {
    alertify.success("Tạo tài khoản thành công, tự động đăng nhập sau 2s");

    setTimeout(async () => {
      console.log(password);
      let result = await $.ajax({
        url: "/account/api/login",
        method: "GET",
        data: {
          email,
          password,
        },
      });
      setCookie("token", result.data, 300);
      window.location.href = "/gio-hang";
    }, 2000);
  } else if (result.message == "had") {
    alertify.error("Email này đã được sử dụng!");
  } else {
    alertify.warning("Có lỗi xảy ra, vui lòng thử lại");
  }
});
$(".btn-in").click(async () => {
  const email = $("#email").val();
  const password = $("#pass").val();
  let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailPattern.test(email)) {
    alertify.warning("Email không đúng định dạng");
    return;
  }
  if (password.length < 6) {
    alertify.warning("Mật khẩu ít nhất 6 ký tự");
    return;
  }
  let result = await $.ajax({
    url: "/account/api/login",
    method: "GET",
    data: {
      email,
      password,
    },
  });
  if (result.message == "success") {
    alertify.success("Đăng nhập thành công, tự động chuyển trang sau 2s");
    setCookie("token", result.data, 300);
    setTimeout(() => {
      window.location.href = "/gio-hang";
    }, 2000);
  } else if (result.message == "fail") {
    alertify.error("Email hoặc mật khẩu không đúng!");
  } else {
    alertify.warning("Có lỗi xảy ra, vui lòng thử lại");
  }
});
function setCookie(cName, cValue, expDays) {
  let date = new Date();
  date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
}
$(".btn-lay").click(async () => {
  let email = $("#email").val();
  let result = await $.ajax({
    url: "/account/api/verify",
    method: "POST",
    data: {
      email,
    },
  });
  if (result.message == "success") {
    alertify.success(
      "Một mail đã gửi tới mail của bạn, kiểm tra trong hộp thư hoặc thư rác"
    );
  } else {
    alertify.error("Email này chưa được đăng ký");
  }
});
$(".btn-newpass").click(async () => {
  let email = document.querySelector("#email").getAttribute("value");
  let pass = $("#pass").val();
  let repass = $("#re-pass").val();
  console.log(email);
  console.log(pass);
  if (pass.length < 6) {
    alertify.error("Mật khẩu 6 ký tự trở lên");
    return;
  }
  if (pass != repass) {
    alertify.error("Mật khẩu nhập lại chưa khớp");
    return;
  }
  let result = await $.ajax({
    url: "/account/api/verify-end",
    method: "POST",
    data: {
      email,
      pass,
    },
  });
  if (result.message == "success") {
    alertify.success("Mật khẩu đã thay đổi bây giờ bạn có thể đăng nhập");
    setTimeout(() => {
      window.location.href = "/dang-nhap";
    }, 2000);
  } else {
    alertify.error("Có lỗi xảy ra");
  }
});
