// 1. Год в футере
document.getElementById("year").textContent = new Date().getFullYear();

// 2. Переключатель темы
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

// 3. Загрузка проектов
var githubUsername = "m2xdev"; 
var projectsContainer = document.getElementById("projects-container");

if (projectsContainer) {
  fetch("https://api.github.com/users/" + githubUsername + "/repos?sort=updated")
    .then(function(response) { return response.json(); })
    .then(function(repos) {
      projectsContainer.innerHTML = ""; 
      var myRepos = repos.filter(function(repo) {
        return repo.name !== "m2xdev.github.io";
      });

      if (myRepos.length === 0) {
        projectsContainer.innerHTML = "<p>No public projects yet.</p>";
        return;
      }

      myRepos.forEach(function(repo) {
        var div = document.createElement("div");
        div.className = "project-item";
        var desc = repo.description || "No description";
        var lang = repo.language ? repo.language : "Code"; 
        
        div.innerHTML = "<h3>" + repo.name + "</h3>" +
                        "<div><span class='project-lang'>" + lang + "</span></div>" +
                        "<p>" + desc + "</p>" +
                        "<a href='" + repo.html_url + "' target='_blank'>View on GitHub →</a>";
        projectsContainer.appendChild(div);
      });
    })
    .catch(function(error) {
      projectsContainer.innerHTML = "<p style='color: red;'>Failed to load projects.</p>";
    });
}

// 4. Новогодний снег
var canvas = document.createElement('canvas');
canvas.id = 'snow-canvas';
document.body.prepend(canvas); 

var ctx = canvas.getContext('2d');
var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

var particles = [];
for (var i = 0; i < 100; i++) {
  particles.push({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 2 + 1,
    speed: Math.random() * 1 + 0.5,
    wind: Math.random() * 0.5 - 0.25
  });
}

function drawSnow() {
  ctx.clearRect(0, 0, width, height);
  
  // Проверяем тему для цвета снега
  if (document.body.classList.contains('dark')) {
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)"; 
  } else {
    ctx.fillStyle = "rgba(2, 132, 199, 0.8)"; // Сделал снег темнее, чтобы было видно
  }
  
  ctx.beginPath();
  for (var i = 0; i < particles.length; i++) {
    var p = particles[i];
    ctx.moveTo(p.x, p.y);
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, true);
    
    p.y += p.speed;
    p.x += p.wind;
    
    if (p.y > height) { p.y = 0; p.x = Math.random() * width; }
    if (p.x > width) { p.x = 0; }
    if (p.x < 0) { p.x = width; }
  }
  ctx.fill();
  requestAnimationFrame(drawSnow);
}
drawSnow();

window.addEventListener('resize', function() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});