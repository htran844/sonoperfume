$(".add-brand").click(async (e) => {
  const brand_name = $("#brandname").val();
  let result = await $.ajax({
    url: "/brand/api/create-brand",
    method: "POST",
    data: { brand_name },
  });
  if (result.status === "success") {
    alertify.success("thêm brand thành công");
  } else {
    alertify.error("Error");
  }
});
async function deletebrand(id) {
  let result = await $.ajax({
    url: "/brand/api/delete-brand",
    method: "DELETE",
    data: { id },
  });
  if (result.status === "success") {
    alertify.success("xóa brand thành công");
  } else {
    alertify.error("Error");
  }
}
