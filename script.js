document.addEventListener("DOMContentLoaded", () => {
    // Load header and footer
    fetch("header.html")
      .then(res => res.text())
      .then(data => document.getElementById("header-placeholder").innerHTML = data);
  
    fetch("footer.html")
      .then(res => res.text())
      .then(data => document.getElementById("footer-placeholder").innerHTML = data);
  
    const form = document.getElementById("weather-form");
    const input = document.getElementById("location-input");
    const result = document.getElementById("weather-result");
    const spinner = document.getElementById("loading-spinner");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const location = input.value.trim();
      if (!location) return;
  
      spinner.classList.remove("hidden");
      result.innerHTML = "";
  
      try {
        const apiKey = "d102dc1d40cf4f3f98c185742251106";
        const res = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`);
        const data = await res.json();
  
        if (data.error) throw new Error(data.error.message);
  
        const weatherHTML = `
          <h2>${data.location.name}, ${data.location.country}</h2>
          <img src="${data.current.condition.icon}" alt="weather icon">
          <p>${data.current.condition.text}</p>
          <p><strong>Temperature:</strong> ${data.current.temp_c} °C</p>
          <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
          <p><strong>Wind:</strong> ${data.current.wind_kph} kph</p>
        `;
        result.innerHTML = weatherHTML;
        result.style.display="block"
      } catch (err) {
        result.innerHTML = `<p class="error">${err.message}</p>`;
      } finally {
        spinner.classList.add("hidden");
      }
    });
  });
  