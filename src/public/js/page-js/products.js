let _gender = "";
let _cost = "";
let _sort = "";
let page = "";
let _page = "";
function gender_handle(e) {
  let gender = e.value;
  let genders = $("[name='gender']");
  for (let i = 0; i < genders.length; i++) {
    if (genders[i].value === gender && genders[i].checked == true) {
      genders[i].checked = true;
    } else {
      genders[i].checked = false;
    }
  }
  // kiểm tra xem có check vào ô gender nào không
  let check = 0;
  for (let i = 0; i < genders.length; i++) {
    if (genders[i].checked == true) {
      check++;
    }
  }
  if (check != 0) {
    _gender = `&gender=${gender}`;
  } else {
    _gender = ``;
  }
  window.location.href = `/products?${_gender}${_cost}${_sort}`;
}
function cost_handle(e) {
  let cost = e.value;
  let costs = $("[name='cost']");
  for (let i = 0; i < costs.length; i++) {
    if (costs[i].value === cost && costs[i].checked == true) {
      costs[i].checked = true;
    } else {
      costs[i].checked = false;
    }
  }
  // kiểm tra xem có check vào ô gender nào không
  let check = 0;
  for (let i = 0; i < costs.length; i++) {
    if (costs[i].checked == true) {
      check++;
    }
  }
  if (check != 0) {
    _cost = `&cost=${cost}`;
  } else {
    _cost = ``;
  }
  window.location.href = `/products?${_gender}${_cost}${_sort}`;
}
function sort_handle() {
  let sort = $("#sort").val();
  _sort = `&sort=${sort}`;
  window.location.href = `/products?${_gender}${_cost}${_sort}`;
}
function filter_handle() {
  // lấy giá trị gender
  let genders = $("[name='gender']");
  // kiểm tra xem có check vào ô gender nào không
  let gender = "";
  let checkgender = 0;
  for (let i = 0; i < genders.length; i++) {
    if (genders[i].checked == true) {
      gender = genders[i].value;
      checkgender++;
    }
  }
  if (checkgender != 0) {
    _gender = `&gender=${gender}`;
  } else {
    _gender = ``;
  }

  // lấy giá trị tiền

  let costs = $("[name='cost']");
  let cost = "";
  let checkcost = 0;
  for (let i = 0; i < costs.length; i++) {
    if (costs[i].checked == true) {
      cost = costs[i].value;
      checkcost++;
    }
  }
  if (checkcost != 0) {
    _cost = `&cost=${cost}`;
  } else {
    _cost = ``;
  }
  // lấy giá trị page
  page = $("#nowpage").text();
  page = Number(page);
  _page = `&page=${page}`;
  // lấy giá trị sort
  let sort = $("#sort").val();
  _sort = `&sort=${sort}`;
}
filter_handle();
$("#nextpage").click(() => {
  page = page + 1;
  _page = `&page=${page}`;
  window.location.href = `/products?${_page}${_gender}${_cost}${_sort}`;
});
$("#prepage").click(() => {
  page = page - 1;

  _page = `&page=${page}`;
  window.location.href = `/products?${_page}${_gender}${_cost}${_sort}`;
});
