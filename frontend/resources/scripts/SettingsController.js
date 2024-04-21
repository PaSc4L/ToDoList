const apiSettingsUrl = "http://localhost:8080/settings"; //getting settings url

window.onload = function () {
  getSettingsLanguage();
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
  switch (backgroundNumber) {
    case 1:
      backgroundElement.style.background = `linear-gradient(rgba(76, 110, 245, 0), rgba(76, 110, 245, 0.5)), url(../resources/images/background-${backgroundNumber}.jpg) center/cover`;
      backgroundElement.style.backgroundAttachment = "fixed";
      break;
    case 2:
      backgroundElement.style.background = `linear-gradient(rgba(250, 82, 82, 0), rgba(250, 82, 82, 0.5)), url(../resources/images/background-${backgroundNumber}.jpg) center/cover`;
      backgroundElement.style.backgroundAttachment = "fixed";
      break;
    case 3:
      backgroundElement.style.background = `linear-gradient(rgba(252, 196, 25, 0), rgba(252, 196, 25, 0.5)), url(../resources/images/background-${backgroundNumber}.jpg) center/cover`;
      backgroundElement.style.backgroundAttachment = "fixed";
      break;
    case 4:
      backgroundElement.style.background = `linear-gradient(rgba(130, 201, 30, 0), rgba(130, 201, 30, 0.5)), url(../resources/images/background-${backgroundNumber}.jpg) center/cover`;
      backgroundElement.style.backgroundAttachment = "fixed";
      break;
    default:
      backgroundElement.style.background = `linear-gradient(rgba(76, 110, 245, 0), rgba(76, 110, 245, 0.5)), url(../resources/images/background-1.jpg) center/cover`;
      backgroundElement.style.backgroundAttachment = "fixed";
  }
}

//Set language
function setSettingsLanguage(lang) {
  //set language at localstorage
  localStorage.setItem("language", lang);
  //get the language right after it set
  getSettingsLanguage();
}

//getting language of the page when page loads
function getSettingsLanguage() {
  //Getting the language
  localStorage.getItem("language") == null ? setLanguage("en") : false;
  language = localStorage.getItem("language");

  //setting up the links to jsons
  let languageUrl = "../resources/languages/" + language + ".json";
  fetch(languageUrl)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      //setting up the main parts of the page by language

      //settings form
      document.getElementById("settings-title").innerHTML = data.settings;
      document.getElementById("settings-choose-theme").innerHTML =
        data.choose_theme;
      document.getElementById("save").innerHTML = data.save;
      document.getElementById("cancel").innerHTML = data.cancel;
    })
    .catch((error) => console.error("Unable to fetch data:", error));
}
