let inputSearch = $(".header-table .search input");
function getAccounts() {
  let email = inputSearch.val();
  let emailSearch = `&email=${email}`;
  if (email === "") {
    emailSearch = "";
  }
  window.location.href = `/admin/accounts?page=1${emailSearch}`;
}
$(".header-table .search input").keyup(function (event) {
  if (event.keyCode === 13) {
    getAccounts();
  }
});
