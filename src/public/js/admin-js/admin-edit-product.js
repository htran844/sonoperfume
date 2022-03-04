//lay id san pham
const url = window.location.href.split("/");
const idProduct = url[url.length - 1];

$("#image").change(function () {
  let files = this.files;
  const previewImages = $(".image-preview");
  previewImages.empty();
  $("<img />", {
    src: URL.createObjectURL(files[0]),
  }).appendTo(previewImages);
});
const list_full = ` <div class="product-full__list">
<input type="text" name="chai-full">
<button onclick="$(this).parent().remove()">[x]</button>
</div>`;
$("#add-full").click((e) => {
  e.preventDefault();
  $(".all-listfull").append(list_full);
});

$("#form").submit(async function (e) {
  e.preventDefault();

  // tao bang product
  const name = $("#name").val();
  const slug = $("#slug").val().replace(/\s+/g, "-").toLowerCase();
  const gender = $("#gender").val();
  const hot = $("#hot").val();
  const cost = $("#cost").val();
  const oldcost = $("#oldcost").val();
  const refundcost = cost * 0.03;
  const thuongHieu = $("#thuongHieu").val();
  const xuatXu = $("#xuatXu").val();
  const phatHanh = $("#phatHanh").val();
  const nhomHuong = $("#nhomHuong").val();
  const phongCach = $("#phongCach").val();
  const huongDau = $("#huongDau").val();
  const huongGiua = $("#huongGiua").val();
  const huongCuoi = $("#huongCuoi").val();
  const mota = $("#mota").val();
  const status = $("#status").val();
  const image = $("#image")[0].files[0];

  var form = new FormData();
  form.append("name", name);
  form.append("slug", slug);
  form.append("gender", gender);
  form.append("hot", hot);
  form.append("cost", cost);
  form.append("oldcost", oldcost);
  form.append("refundcost", refundcost);
  form.append("image", image);
  form.append("thuongHieu", thuongHieu);
  form.append("xuatXu", xuatXu);
  form.append("phatHanh", phatHanh);
  form.append("nhomHuong", nhomHuong);
  form.append("phongCach", phongCach);
  form.append("huongDau", huongDau);
  form.append("huongGiua", huongGiua);
  form.append("huongCuoi", huongCuoi);
  form.append("mota", mota);
  form.append("status", status);
  // lấy list full
  let listfull = $("[name=chai-full]");
  for (let i = 0; i < listfull.length; i++) {
    form.append("productFull", listfull[i].value);
  }
  const resultProduct = await $.ajax({
    url: "/product/api/update-product/" + idProduct,
    method: "PUT",
    timeout: 0,
    processData: false,
    mimeType: "multipart/form-data",
    contentType: false,
    data: form,
  });
  endload();
  if (resultProduct) {
    alertify.success("Cập nhật sản phẩm thành công");
  } else {
    alertify.error("Error");
  }
});
