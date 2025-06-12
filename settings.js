document.addEventListener("DOMContentLoaded", () => {
    fetch("header.html")
      .then(res => res.text())
      .then(data => document.getElementById("header-placeholder").innerHTML = data);
  
    fetch("footer.html")
      .then(res => res.text())
      .then(data => document.getElementById("footer-placeholder").innerHTML = data);
  
    const unitToggle = document.getElementById("unit-toggle");
    const themeToggle = document.getElementById("theme-toggle");
  
    // Load saved preferences
    unitToggle.checked = localStorage.getItem("unit") === "f";
    themeToggle.checked = localStorage.getItem("theme") === "dark";
    applyTheme();
  
    unitToggle.addEventListener("change", () => {
      localStorage.setItem("unit", unitToggle.checked ? "f" : "c");
      alert("Unit preference saved!");
    });
  
    themeToggle.addEventListener("change", () => {
      localStorage.setItem("theme", themeToggle.checked ? "dark" : "light");
      applyTheme();
    });
  
    function applyTheme() {
      if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
    }
  });
  