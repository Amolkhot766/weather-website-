document.addEventListener("DOMContentLoaded", () => {
    fetch("header.html")
      .then(res => res.text())
      .then(data => document.getElementById("header-placeholder").innerHTML = data);
  
    fetch("footer.html")
      .then(res => res.text())
      .then(data => document.getElementById("footer-placeholder").innerHTML = data);
  
    const form = document.getElementById("forecast-form");
    const input = document.getElementById("forecast-location");
    const result = document.getElementById("forecast-result");
    const spinner = document.getElementById("loading-spinner");
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const location = input.value.trim();
      if (!location) return;
  
      spinner.classList.remove("hidden");
      result.innerHTML = "";
  
      try {
        const apiKey = "d102dc1d40cf4f3f98c185742251106";
        const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3`);
        const data = await res.json();
  
        if (data.error) throw new Error(data.error.message);
  
        let forecastHTML = `<h3>${data.location.name}, ${data.location.country}</h3><div class="forecast-days">`;
        data.forecast.forecastday.forEach(day => {
          forecastHTML += `
            <div class="forecast-card">
              <p><strong>${day.date}</strong></p>
              <img src="${day.day.condition.icon}" alt="weather icon">
              <p>${day.day.condition.text}</p>
              <p>Max: ${day.day.maxtemp_c}°C</p>
              <p>Min: ${day.day.mintemp_c}°C</p>
            </div>
          `;
        });
        forecastHTML += `</div>`;
        result.innerHTML = forecastHTML;
      } catch (err) {
        result.innerHTML = `<p class="error">${err.message}</p>`;
      } finally {
        spinner.classList.add("hidden");
      }
    });
  });
  