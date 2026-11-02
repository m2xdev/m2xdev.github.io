// 1. Автоматический год в футере
document.getElementById("year").textContent = new Date().getFullYear();

// 2. Переключатель светлой/тёмной темы
const toggle = document.getElementById("theme-toggle");

// Восстановить тему из localStorage при загрузке
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  toggle.textContent = "☀️";
}

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  toggle.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});