// document.addEventListener("DOMContentLoaded", function () {
//   const select = document.getElementById("imageSelect");
//   const images = document.querySelectorAll("#imageContainer img");

//   images.forEach((img) => {
//     img.addEventListener("click", function () {
//       const value = this.getAttribute("data-value");
//       select.value = value;
//     });
//   });
// });

function saveSettings() {
  let pictureNumber = document.querySelector(
    'input[name="background-select"]:checked'
  ).value;

  applyBackground(pictureNumber);
  console.log(pictureNumber);
}

function applyBackground(backgroundNumber) {
  const backgroundElement = document.getElementsByClassName("background");
  backgroundElement.style.background = `linear-gradient(rgba(76, 110, 245, 0), rgba(76, 110, 245, 0.5)), url(resources/images/background-${backgroundNumber}.jpg) center/cover`;
  backgroundElement.style.backgroundAttachment = "fixed";
}
