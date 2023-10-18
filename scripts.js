// Make the control panel draggable:
dragElement(document.getElementById("control-panel"));

function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  document.getElementById("cp-header").onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

const rotationSpeedInput = document.getElementById("rotation-speed");
const kaleidoscope = document.getElementById("kaleidoscope");
const kaleidoSpeedIndicator = document.getElementById("krs-indicator");
const segmentsAmountInput = document.getElementById("segments-amount");
const segmentIndicator = document.getElementById("sa-indicator");
const particleCountInput = document.getElementById("particle-count");
const particleCountIndicator = document.getElementById("pc-indicator");
const closeButton = document.getElementById("closeButton");
const controlPanel = document.getElementById("control-panel");
const closeNotification = document.getElementById("hideNotification");
const mobileNotification = document.getElementById("mobileNotification");
const widthLookUp = [
  0, 100, 100, 174, 100, 73, 58, 48.62, 41.25, 36.66, 32.5, 29.5, 26.6,
];
let gemsAmount = 1;
let segmentCount = 2;

closeButton.addEventListener("click", () => {
  controlPanel.style.visibility = "hidden";
  closeNotification.style.display = "block";
  closeNotification.style.animationName = "fade-out";
  setTimeout(() => (closeNotification.style.display = "none"), 3000);
});

document.addEventListener("keydown", function () {
  if (controlPanel.style.visibility === "hidden") {
    controlPanel.style.visibility = "visible";
  }
});

// kaleidoscope rotation control

rotationSpeedInput.addEventListener("input", function () {
  const durationValue = this.max - (this.value - this.min);
  kaleidoscope.style.animationDuration = durationValue + "s";
  kaleidoSpeedIndicator.innerText = durationValue.toFixed(1) + "s";
});

// create master segment
const segment = document.createElement("div");
segment.classList.add("segment");

particleCountInput.addEventListener("input", function () {
  gemsAmount = this.value;
  segment.innerHTML = "";
  particleCountIndicator.innerText = gemsAmount;
  createGems(gemsAmount);
  createSegments(segmentCount);
  mobileNotification.style.visibility = "hidden";
});

//add random "gem" particles
function createGems() {
  for (let i = 0; i < gemsAmount; i++) {
    const gem = document.createElement("div");
    gem.classList.add("gem" + (Math.floor(Math.random() * 3) + 1));
    gem.style.borderColor =
      "#" + Math.floor(Math.random() * 16777215).toString(16);
    gem.style.left = Math.random() * 100 + "px";
    gem.style.top = Math.random() * 100 + "px";
    gem.style.animationName = "anim" + (Math.floor(Math.random() * 3) + 1);
    gem.className === "gem3"
      ? ((gem.style.width = Math.random() * 300 + 1 + "px"),
        (gem.style.height = Math.random() * 300 + 1 + "px"))
      : null;
    segment.appendChild(gem);
  }
}

//segment and particle generator
segmentsAmountInput.addEventListener("input", function () {
  segmentCount = this.value;
  createSegments(segmentCount);
});

function createSegments() {
  kaleidoscope.innerHTML = "";
  mobileNotification.style.visibility = "hidden";

  const angle = 360 / segmentCount;

  for (let i = 0; i < segmentCount; i++) {
    cloneSegment = segment.cloneNode(true);
    cloneSegment.style.transform = `rotate(${angle * i}deg)`;
    cloneSegment.style.width = `${widthLookUp[segmentCount]}%`;
    kaleidoscope.appendChild(cloneSegment);
  }

  segmentIndicator.innerText = segmentCount;
}
