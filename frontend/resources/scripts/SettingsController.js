const apiSettingsUrl = "http://localhost:8080/settings";

window.onload = function () {
  console.log("It is inside the onload");
  setupSettings();
};

let settingsUrl = "/../resources/settings.json";
function setupSettings() {
  fetch(settingsUrl)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      //setting up the background for the page
      applyBackground(data.background_number);
    })
    .catch((error) => console.error("Unable to fetch data:", error));
}

function saveSettings() {
  let pictureNumber = document.querySelector(
    'input[name="background-select"]:checked'
  ).value;

  fetch(apiSettingsUrl + "/save/" + pictureNumber, {
    method: "POST",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("An error accourd when saving settings");
      }

      console.log("I am here at least");
      applyBackground(pictureNumber);
      window.location.href = "../pages/index.html";
      return response.json();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function applyBackground(backgroundNumber) {
  const backgroundElement = document.getElementById("background");
  backgroundElement.style.background = `linear-gradient(rgba(76, 110, 245, 0), rgba(76, 110, 245, 0.5)), url(../resources/images/background-${backgroundNumber}.jpg) center/cover`;
  backgroundElement.style.backgroundAttachment = "fixed";
}
