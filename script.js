// 1. Автоматический год в футере
document.getElementById("year").textContent = new Date().getFullYear();

// 2. Переключатель светлой/тёмной темы
var toggle = document.getElementById("theme-toggle");
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  toggle.textContent = "☀️";
}
toggle.addEventListener("click", function() {
  document.body.classList.toggle("dark");
  var isDark = document.body.classList.contains("dark");
  toggle.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// 3. Загрузка проектов с GitHub (максимально простой вариант)
var githubUsername = "m2xdev"; 
var projectsContainer = document.getElementById("projects-container");

if (projectsContainer) {
  fetch("https://api.github.com/users/" + githubUsername + "/repos?sort=updated")
    .then(function(response) {
      return response.json();
    })
    .then(function(repos) {
      projectsContainer.innerHTML = ""; // Убираем "Loading"
      
      // Берем последние 4 проекта, кроме самого сайта
      var myRepos = repos.filter(function(repo) {
        return repo.name !== "m2xdev.github.io";
      })

      if (myRepos.length === 0) {
        projectsContainer.innerHTML = "<p>No public projects yet.</p>";
        return;
      }

      myRepos.forEach(function(repo) {
        var div = document.createElement("div");
        div.className = "project-item";
        
        var desc = repo.description || "No description";
        
        // Собираем HTML без обратных кавычек
        div.innerHTML = "<h3>" + repo.name + "</h3>" +
                        "<p>" + desc + "</p>" +
                        "<a href='" + repo.html_url + "' target='_blank'>View on GitHub →</a>";
                        
        projectsContainer.appendChild(div);
      });
    })
    .catch(function(error) {
      projectsContainer.innerHTML = "<p style='color: red;'>Failed to load projects.</p>";
      console.error(error);
    });
}