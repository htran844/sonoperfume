let formData = new FormData();
$("#imageSlide").change((e) => {
  const previewImages = $(".slide-preview");
  previewImages.empty();
  const images = e.target.files;
  for (let i = 0; i < images.length; i++) {
    formData.append("images", images[i]);
    $("<img />", {
      src: URL.createObjectURL(images[i]),
    }).appendTo(previewImages);
  }
});
$("#imagethongbao").change((e) => {
  const previewImages = $(".thongbao-preview");
  previewImages.empty();
  const images = e.target.files;
  formData.append("images", images[0]);
  $("<img />", {
    src: URL.createObjectURL(images[0]),
  }).appendTo(previewImages);
});
$(".button-submit button").click(async (e) => {
  e.preventDefault();
  let webname = $("#name").val();
  let address = $("#address").val();
  let email = $("#email").val();
  let phone = $("#phone").val();
  let facebook = $("#facebook").val();
  let insta = $("#insta").val();
  let youtube = $("#youtube").val();
  let messenger = $("#messenger").val();
  formData.append("webname", webname);
  formData.append("address", address);
  formData.append("email", email);
  formData.append("phone", phone);
  formData.append("facebook", facebook);
  formData.append("insta", insta);
  formData.append("youtube", youtube);
  formData.append("messenger", messenger);
  startload();
  const result = await $.ajax({
    url: "/info/api/update-info",
    method: "POST",
    timeout: 0,
    processData: false,
    mimeType: "multipart/form-data",
    contentType: false,
    data: formData,
  });
  formData = new FormData();
  endload();
  if ((result.status = "success")) {
    alertify.success("cập nhật thông tin thành công");
  } else {
    alertify.error("Error");
  }
});
