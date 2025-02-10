document.addEventListener("DOMContentLoaded", () => {
  // ----------------------------
  // 1. Hamburger Menu Functionality
  // ----------------------------
  const hamburger = document.querySelector(".hamburger");
  const mobileNav = document.querySelector(".mobile-nav");

  hamburger.addEventListener("click", () => {
    mobileNav.classList.toggle("open");
    mobileNav.classList.toggle("hidden");
  });

  // ----------------------------
  // 2. Weather and Forecast API
  // ----------------------------
  const apiKey = "7628821d2985129f91ea402d5e5ef0d2";
  const city = "Buenos Aires";
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

  // Fetch current weather
  fetch(weatherUrl)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById(
        "weather-description"
      ).textContent = `Weather: ${data.weather[0].description.replace(
        /\b\w/g,
        (char) => char.toUpperCase()
      )}`;
      document.getElementById(
        "temperature"
      ).textContent = `Temperature: ${Math.round(data.main.temp)}°C`;
    });

  // Fetch 3-day forecast
  fetch(forecastUrl)
    .then((response) => response.json())
    .then((data) => {
      let forecastHTML = "";
      for (let i = 0; i < 3; i++) {
        forecastHTML += `
          <div>
            <p>${new Date(data.list[i].dt * 1000).toLocaleDateString()}</p>
            <p>Temp: ${Math.round(data.list[i].main.temp)}°C</p>
          </div>
        `;
      }
      document.getElementById("forecast").innerHTML = forecastHTML;
    });

  // ----------------------------
  // 3. Spotlight Members (Gold/Silver Members)
  // ----------------------------
  fetch("data/members.json")
    .then((response) => response.json())
    .then((members) => {
      const spotlightContainer = document.getElementById("spotlight-container");
      const spotlightMembers = members.filter(
        (member) => member.membershipLevel === 2 || member.membershipLevel === 3
      );
      spotlightMembers.sort(() => Math.random() - 0.5);

      spotlightMembers.slice(0, 3).forEach((member) => {
        const memberCard = document.createElement("div");
        memberCard.classList.add("member-card");
        memberCard.innerHTML = `
          <img src="images/${member.image}" alt="${member.name} Logo">
          <h3>${member.name}</h3>
          <p>Phone: ${member.phone}</p>
          <p>Address: ${member.address}</p>
          <p><a href="${member.website}" target="_blank">Visit Website</a></p>
          <p>Membership Level: ${member.membershipLevel === 2 ? "Silver" : "Gold"}</p>
        `;
        spotlightContainer.appendChild(memberCard);
      });
    });

  // ----------------------------
  // 4. Directory View Toggle (List/Grid)
  // ----------------------------
  const memberContainer = document.getElementById("memberContainer");
  const toggleViewButton = document.getElementById("toggleView");

  if (memberContainer && toggleViewButton) {
    fetch("data/members.json")
      .then((response) => response.json())
      .then((members) => {
        renderMembers(members, "list-view");

        // Toggle view event listener
        toggleViewButton.addEventListener("click", () => {
          const currentView = memberContainer.classList.contains("list-view")
            ? "list-view"
            : "grid-view";
          const newView = currentView === "list-view" ? "grid-view" : "list-view";
          memberContainer.classList.remove(currentView);
          memberContainer.classList.add(newView);
          renderMembers(members, newView);
        });
      });

    // Function to render members
    function renderMembers(members, view) {
      memberContainer.innerHTML = "";
      members.forEach((member) => {
        const card = document.createElement("div");
        card.className = `member-card ${view}`;
        card.innerHTML = `
          <img src="images/${member.image}" alt="${member.name}" class="logo">
          <h2>${member.name}</h2>
          <p>${member.address}</p>
          <p>${member.phone}</p>
          <a href="${member.website}" target="_blank">Visit Website</a>
        `;
        memberContainer.appendChild(card);
      });
    }
  }

  // ----------------------------
  // 5. Form Timestamp and Footer Date
  // ----------------------------
  // Set timestamp value for the form
  const timestampField = document.getElementById("timestamp");
  if (timestampField) {
    timestampField.value = new Date().toISOString();
  }

  // Set dynamic footer date
  document.getElementById("currentYear").textContent = new Date().getFullYear();
  document.getElementById("lastModified").textContent = document.lastModified;

  // ----------------------------
  // 6. Modal Close Functionality
  // ----------------------------
  document.querySelectorAll(".close-modal").forEach((button) => {
    button.addEventListener("click", () => {
      button.closest(".modal").style.display = "none";
    });
  });

  // ----------------------------
  // 7. Thank You Page: Display Submitted Data
  // ----------------------------
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.toString()) {
    document.getElementById("display-first-name").textContent =
      urlParams.get("first-name");
    document.getElementById("display-last-name").textContent =
      urlParams.get("last-name");
    document.getElementById("display-email").textContent =
      urlParams.get("email");
    document.getElementById("display-phone").textContent =
      urlParams.get("phone");
    document.getElementById("display-business-name").textContent =
      urlParams.get("business-name");
    document.getElementById("display-timestamp").textContent =
      urlParams.get("timestamp");
  }

  // ----------------------------
  // 8. Discover Page: Last Visit Message and Dynamic Cards
  // ----------------------------
  const lastVisitMessage = document.getElementById("last-visit-message");
  if (lastVisitMessage) {
    const lastVisit = localStorage.getItem("lastVisit");
    const currentDate = Date.now();

    if (!lastVisit) {
      lastVisitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
      const daysSinceLastVisit = Math.floor((currentDate - lastVisit) / (1000 * 60 * 60 * 24));
      if (daysSinceLastVisit < 1) {
        lastVisitMessage.textContent = "Back so soon! Awesome!";
      } else {
        lastVisitMessage.textContent = `You last visited ${daysSinceLastVisit} ${daysSinceLastVisit === 1 ? 'day' : 'days'} ago.`;
      }
    }

    localStorage.setItem("lastVisit", currentDate);
  }

  const cardsContainer = document.querySelector(".cards-container");
  if (cardsContainer) {

    const items = [
      {
        title: "La Boca",
        address: "Caminito St, Buenos Aires",
        description: "Famous for its colorful houses and tango culture.",
        image: "images/laboca.jpeg"
      },
        {
          "title": "Obelisco",
          "address": "Av. 9 de Julio, Buenos Aires",
          "description": "Iconic monument and a symbol of Buenos Aires.",
          "image": "images/obelisco.jpg"
        },
        {
          "title": "Recoleta Cemetery",
          "address": "Junín 1760, Buenos Aires",
          "description": "Resting place of famous figures, known for its grand mausoleums.",
          "image": "images/recoleta-cemetery.jpg"
        },
        {
          "title": "San Telmo",
          "address": "San Telmo, Buenos Aires",
          "description": "Historic neighborhood famous for its cobblestone streets and antique markets.",
          "image": "images/san-telmo.jpg"
        },
        {
          "title": "Teatro Colón",
          "address": "Cerrito 628, Buenos Aires",
          "description": "One of the world's most renowned opera houses.",
          "image": "images/teatro-colon.jpeg"
        },
        {
          "title": "Plaza de Mayo",
          "address": "Av. Rivadavia & Bolívar, Buenos Aires",
          "description": "Historic square surrounded by important government buildings.",
          "image": "images/plaza-de-mayo.jpg"
        },
        {
          "title": "Puerto Madero",
          "address": "Puerto Madero, Buenos Aires",
          "description": "Modern waterfront district with restaurants and skyscrapers.",
          "image": "images/puerto-madero.jpg"
        },
        {
          "title": "Palermo Soho",
          "address": "Palermo, Buenos Aires",
          "description": "Trendy area known for its bars, boutiques, and vibrant nightlife.",
          "image": "images/palermo-soho.jpg"
        }
    ];

    function createCard(item) {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <h2>${item.title}</h2>
        <figure>
          <img src="${item.image}" alt="${item.title}" loading="lazy">
        </figure>
        <address>${item.address}</address>
        <p>${item.description}</p>
        <button>Learn More</button>
      `;
      return card;
    }

    items.forEach(item => {
      const card = createCard(item);
      cardsContainer.appendChild(card);
    });
  }
});