// Đổi tab chi tiết
document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".acc-tabs-nav .tab-btn");
  const panels = document.querySelectorAll(".acc-tab-panel");

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const tabName = btn.dataset.tab;
      const targetId = "tab-" + tabName;

      // bỏ active cũ
      tabButtons.forEach((b) => b.classList.remove("active"));
      panels.forEach((p) => p.classList.remove("active"));

      // set active mới
      btn.classList.add("active");
      const panel = document.getElementById(targetId);
      if (panel) panel.classList.add("active");
    });
  });
});
