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
  // tao bang product
  const name = $("#name").val();
  const slug = $("#slug").val();
  const gender = $("#gender").val();
  const hot = $("#hot").val();
  const cost = $("#cost").val();
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
  console.log(
    name,
    slug,
    gender,
    hot,
    cost,
    thuongHieu,
    xuatXu,
    phatHanh,
    nhomHuong,
    phongCach,
    huongDau,
    huongGiua,
    huongCuoi,
    mota,
    image,
    status
  );
  var form = new FormData();
  form.append("name", name);
  form.append("slug", slug);
  form.append("gender", gender);
  form.append("hot", hot);
  form.append("cost", cost);
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
  console.log(resultProduct);
});
