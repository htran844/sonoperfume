const tabs = document.querySelectorAll(".tab-item");
const panes = document.querySelectorAll(".tab-pane");
tabs.forEach((tab, index) => {
  tab.onclick = function () {
    const pane = panes[index];
    document.querySelector(".tab-item.active").classList.remove("active");
    document.querySelector(".tab-pane.active").classList.remove("active");
    this.classList.add("active");
    pane.classList.add("active");
  };
});
