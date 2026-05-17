(() => {
  const currentYear = String(new Date().getFullYear());
  document.querySelectorAll(".js-current-year").forEach((node) => {
    node.textContent = currentYear;
  });
})();
