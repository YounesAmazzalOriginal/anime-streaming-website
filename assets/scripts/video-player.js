var videoPlayer = document.getElementById("video-player");
var fullscreenPath = document.getElementById("fullscreen-d");
var volumePath = document.getElementById("volume-d");
var velocityInput = document.getElementById("velocity-input");
var velocityIcon = document.getElementById("velocity-icon");
var fullscreenBtn = document.getElementById("fullscreen-btn");

velocityInput.addEventListener("input", () => {
  velocityFunc();
});
velocityIcon.addEventListener("click", () => {
  velocityIconFunc();
});
//

function velocityFunc() {
  if (velocityInput.value > 40) {
    volumePath.setAttribute(
      "d",
      "M563.08-180.23v-42q83.07-29.08 133.84-100 50.77-70.92 50.77-158.77 0-87.85-50.77-158.77-50.77-70.92-133.84-100v-42q99.38 31.85 162 114.35 62.61 82.5 62.61 186.42 0 103.92-62.61 186.42-62.62 82.5-162 114.35ZM172.31-400v-160h136.92l143.08-143.08v446.16L309.23-400H172.31Zm390.77 52.31v-266.62q33.92 22 51.57 57.93 17.66 35.92 17.66 76.38 0 40.23-18.04 75.27t-51.19 57.04Z"
    );
  }
  //
  else if (velocityInput.value <= 40) {
    volumePath.setAttribute(
      "d",
      "M240-400v-160h136.92L520-703.08v446.16L376.92-400H240Zm390.77 52.31v-266.62q32.69 21 50.96 56.93Q700-521.46 700-480q0 41.46-18.27 76.38-18.27 34.93-50.96 55.93Z"
    );
  }
  //
  if (velocityInput.value == 0) {
    volumePath.setAttribute(
      "d",
      "M320-400v-160h136.92L600-703.08v446.16L456.92-400H320Z"
    );
  }
}

// Style volume path
let velocitySwitcher = false;
function velocityIconFunc() {
  if (velocitySwitcher == false) {
    velocitySwitcher = true;
    volumePath.setAttribute(
      "d",
      "M591.38-347.69 563.08-376l104-104-104-104 28.3-28.31 104 104 104-104L827.69-584l-104 104 104 104-28.31 28.31-104-104-104 104ZM172.31-400v-160h136.92l143.08-143.08v446.16L309.23-400H172.31Z"
    );

    velocityInput.value = 0;
  } else {
    velocitySwitcher = false;
    volumePath.setAttribute(
      "d",
      "M563.08-180.23v-42q83.07-29.08 133.84-100 50.77-70.92 50.77-158.77 0-87.85-50.77-158.77-50.77-70.92-133.84-100v-42q99.38 31.85 162 114.35 62.61 82.5 62.61 186.42 0 103.92-62.61 186.42-62.62 82.5-162 114.35ZM172.31-400v-160h136.92l143.08-143.08v446.16L309.23-400H172.31Zm390.77 52.31v-266.62q33.92 22 51.57 57.93 17.66 35.92 17.66 76.38 0 40.23-18.04 75.27t-51.19 57.04ZZ"
    );

    velocityInput.value = 50;
  }
}

// style progress inputs
var progressInputs = document.querySelectorAll("input[type='range']");

function inputRange(target) {
  let value = target.value;
  let max = target.max || 100;
  let percentage = (value / max) * 100;

  target.style.background = `linear-gradient(to right, crimson 0%, crimson ${percentage}%, gray ${percentage}% 100%)`;
}

progressInputs.forEach((input) => {
  input.addEventListener("input", function () {
    inputRange(this);
  });

  inputRange(input);
});

// Ful screen Function
fullscreenBtn.addEventListener("click", () => {
  fullScreen();
});

let fullScreenSwitcher = false;
function fullScreen() {
  var fullscreenPath = fullscreenBtn.querySelector("path");
  if (fullScreenSwitcher == false) {
    fullScreenSwitcher = true;

    fullscreenPath.setAttribute(
      "d",
      "M296.92-160v-136.92H160v-40h176.92V-160h-40Zm326.93 0v-176.92h176.92v40H663.85V-160h-40ZM160-623.08v-40h136.92V-800h40v176.92H160Zm463.85 0V-800h40v136.92h136.92v40H623.85Z"
    );

    videoPlayer.classList.add("w-screen", "h-screen");
  } else {
    fullScreenSwitcher = false;

    fullscreenPath.setAttribute(
      "d",
      "M160-160v-176.92h40V-200h136.92v40H160Zm463.85 0v-40h136.92v-136.92h40V-160H623.85ZM160-623.08V-800h176.92v40H200v136.92h-40Zm600.77 0V-760H623.85v-40h176.92v176.92h-40Z"
    );
    videoPlayer.classList.remove("w-screen", "h-screen");
  }
}
