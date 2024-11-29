const exploreButton = document.getElementById("explore-button");
const formSubmitButton = document.getElementById("form-submit-button");
const searchButton = document.getElementById("search-button");
const resetButton = document.getElementById("reset-button");
const searchInput = document.getElementById("search-input");
const showDestinations = () => {
  const destinationsContainer = document.getElementById("card-container");
  destinationsContainer.innerHTML = "";
  fetch("travel_recommendation_api.json")
    .then((response) => response.json())
    .then((data) => {
      Object.entries(data).forEach(([id, destData]) => {
        destData.map((destination) => {
          if (destination.cities) {
            destination.cities.map((city) => {
              const destinationCard = document.createElement("div");
              destinationCard.classList.add("card");
              destinationCard.innerHTML = `
              <img src="${city.imageUrl}" alt="${city.name}" class="card-image"/>
                <h2>${city.name}, ${destination.name}</h2>
                <p>${city.description}</p>
              `;
              destinationsContainer.appendChild(destinationCard);
            });
          } else {
            const destinationCard = document.createElement("div");
            destinationCard.classList.add("card");
            destinationCard.innerHTML = `
            <img src="${destination.imageUrl}" alt="${destination.name}" class="card-image"/>
              <h2>${destination.name}</h2>
              <p>${destination.description}</p>
            `;
            destinationsContainer.appendChild(destinationCard);
          }
        });
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      destinationsContainer.innerHTML =
        "An error occurred while fetching data.";
    });
};

const submitForm = () => {
  const contactForm = document.querySelector(".contact-form");

  const notificationCard = document.createElement("div");
  notificationCard.classList.add("notification-card");
  notificationCard.innerHTML = `
    <p>Thank you for contacting us!</p>
  `;

  document.body.appendChild(notificationCard);

  notificationCard.style.display = "block";

  setTimeout(() => {
    notificationCard.remove();
  }, 3000);

  contactForm.reset();
};

const search = () => {
  const searchValue = document.getElementById("search-input").value;
  const destinationsContainer = document.getElementById("card-container");
  destinationsContainer.innerHTML = "";
  fetch("travel_recommendation_api.json")
    .then((response) => response.json())
    .then((data) => {
      if (searchValue.length > 0) {
        if (
          searchValue.toLowerCase() === "country" ||
          searchValue.toLowerCase() === "countries"
        ) {
          data.countries.map((country) => {
            console.log(country);
            country.cities.map((city) => {
              const destinationCard = document.createElement("div");
              destinationCard.classList.add("card");
              destinationCard.innerHTML = `
              <img src="${city.imageUrl}" alt="${city.name}" class="card-image"/>
                <h2>${city.name}, ${country.name}</h2>
                <p>${city.description}</p>
              `;
              destinationsContainer.appendChild(destinationCard);
            });
          });
        } else if (
          searchValue.toLowerCase() === "beach" ||
          searchValue.toLowerCase() === "beaches"
        ) {
          data.beaches.map((beach) => {
            const destinationCard = document.createElement("div");
            destinationCard.classList.add("card");
            destinationCard.innerHTML = `
              <img src="${beach.imageUrl}" alt="${beach.name}" class="card-image"/>
                <h2>${beach.name}</h2>
                <p>${beach.description}</p>
              `;
            destinationsContainer.appendChild(destinationCard);
          });
        } else if (
          searchValue.toLowerCase() === "temple" ||
          searchValue.toLowerCase() === "temples"
        ) {
          data.temples.map((temple) => {
            const destinationCard = document.createElement("div");
            destinationCard.classList.add("card");
            destinationCard.innerHTML = `
              <img src="${temple.imageUrl}" alt="${temple.name}" class="card-image"/>
                <h2>${temple.name}</h2>
                <p>${temple.description}</p>
              `;
            destinationsContainer.appendChild(destinationCard);
          });
        } else {
          let foundResults = false; // Track if any results are found
          Object.entries(data).forEach(([id, destData]) => {
            destData.map((destination) => {
              if (destination.cities) {
                destination.cities.map((city) => {
                  if (
                    searchValue.length > 0 &&
                    (city.name
                      .toLowerCase()
                      .includes(searchValue.toLowerCase()) ||
                      destination.name
                        .toLowerCase()
                        .includes(searchValue.toLowerCase()) ||
                      city.description
                        .toLowerCase()
                        .includes(searchValue.toLowerCase()))
                  ) {
                    foundResults = true; // Set foundResults to true
                    const destinationCard = document.createElement("div");
                    destinationCard.classList.add("card");
                    destinationCard.innerHTML = `
                      <img src="${city.imageUrl}" alt="${city.name}" class="card-image"/>
                      <h2>${city.name}, ${destination.name}</h2>
                      <p>${city.description}</p>
                    `;
                    destinationsContainer.appendChild(destinationCard);
                  }
                });
              } else {
                if (
                  searchValue.length > 0 &&
                  (destination.name
                    .toLowerCase()
                    .includes(searchValue.toLowerCase()) ||
                    destination.description
                      .toLowerCase()
                      .includes(searchValue.toLowerCase()))
                ) {
                  foundResults = true; // Set foundResults to true
                  const destinationCard = document.createElement("div");
                  destinationCard.classList.add("card");
                  destinationCard.innerHTML = `
                    <img src="${destination.imageUrl}" alt="${destination.name}" class="card-image"/>
                    <h2>${destination.name}</h2>
                    <p>${destination.description}</p>
                  `;
                  destinationsContainer.appendChild(destinationCard);
                }
              }
            });
          });

          // If no results were found, display a message
          if (!foundResults) {
            destinationsContainer.innerHTML =
              "<h2 style='text-align: center'>No results found</h2>";
          }
        }
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      destinationsContainer.innerHTML =
        "An error occurred while fetching data.";
    });
};

const reset = () => {
  const searchInput = document.getElementById("search-input");
  const cardContainer = document.getElementById("card-container");
  searchInput.value = "";
  cardContainer.innerHTML = "";
};

exploreButton.addEventListener("click", showDestinations);
formSubmitButton.addEventListener("click", (event) => {
  event.preventDefault();
  submitForm();
});
searchButton.addEventListener("click", search);
resetButton.addEventListener("click", reset);
searchInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    search();
  }
});
