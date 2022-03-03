// search products
let inputSearch = $(".header-table .search input");
let selectGender = $("#gender-search");
//get
function getProducts() {
  let name = inputSearch.val();
  let nameSearch = `&name=${name}`;
  if (name === "") {
    nameSearch = "";
  }
  let gender = selectGender.val();
  let genderSearch = `&gender=${gender}`;
  if (gender === "") {
    genderSearch = "";
  }
  window.location.href = `/admin/products?page=1${nameSearch}${genderSearch}`;
}
$(".header-table .search input").keyup(function (event) {
  if (event.keyCode === 13) {
    getProducts();
  }
});
$("#gender-search").change(function () {
  getProducts();
});
// add product
$("#image").change(function () {
  let files = this.files;
  const previewImages = $(".image-preview");
  previewImages.empty();
  $("<img />", {
    src: URL.createObjectURL(files[0]),
  }).appendTo(previewImages);
});
async function addProduct(e) {}
$("#form").submit(async function (e) {
  e.preventDefault();
  // tao bang product full
  const capaFullseal = $("#capaFullseal").val();
  const costFullseal = $("#costFullseal").val();
  var statusFullseal = "";
  $("#fullseal").is(":checked") === true
    ? (statusFullseal = true)
    : (statusFullseal = false);
  const capaTester = $("#capaTester").val();
  const costTester = $("#costTester").val();
  var statusTester = "";
  $("#fulltester").is(":checked") === true
    ? (statusTester = true)
    : (statusTester = false);
  startload();
  // call ajax
  const resultProductFull = await $.ajax({
    url: "/product/api/create-productfull",
    method: "POST",
    data: {
      capaFullseal,
      costFullseal,
      statusFullseal,
      capaTester,
      costTester,
      statusTester,
    },
  });
  if (resultProductFull) {
    alertify.success("sản phẩm(full và tester) thành công");
  } else {
    alertify.error("Error");
  }
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
  const productFull = resultProductFull.data._id;

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
  form.append("productFull", productFull);
  const resultProduct = await $.ajax({
    url: "/product/api/create-product",
    method: "POST",
    timeout: 0,
    processData: false,
    mimeType: "multipart/form-data",
    contentType: false,
    data: form,
  });
  endload();
  if (resultProduct) {
    alertify.success("Tạo sản phẩm thành công");
  } else {
    alertify.error("Error");
  }
});
async function deleteProduct(e) {
  e.preventDefault();
  const tr = e.target.closest("tr");
  const idProduct = tr
    .querySelector(".delete-product a")
    .getAttribute("idProduct");
  startload();
  await alertify.confirm("Xác nhận muốn xóa sản phẩm?", async function (e) {
    if (e) {
      let delProduct = await $.ajax({
        url: "/product/api/delete-product/" + idProduct,
        method: "DELETE",
      });
      if (delProduct.status === "success") {
        tr.remove();
        alertify.success("Đã xóa 1 sản phẩm");
      }
    } else {
      return;
    }
    endload();
  });
}
