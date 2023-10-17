// Make the DIV element draggable:
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

const rangeInput = document.getElementById("rotation-speed");
const animatedElement = document.getElementById("kaleidoscope");
const krsInd = document.getElementById("krs-indicator");
const segmentsAmount = document.getElementById("segments-amount");
const saInd = document.getElementById("sa-indicator");
const particleCount = document.getElementById("particle-count");
const pcInd = document.getElementById("pc-indicator");

// kaleidoscope rotation control
rangeInput.addEventListener("input", function () {
  const durationValue = this.value;
  animatedElement.style.animationDuration = durationValue + "s";
  krsInd.innerText = durationValue + "s";
});

//segment and particle generator
segmentsAmount.addEventListener("input", function () {
  const segmentCount = this.value;
  kaleidoscope.innerHTML = "";

  const angle = 360 / segmentCount;

  const widthLookUp = [
    0, 100, 100, 174, 100, 73, 58, 48.62, 41.25, 36.66, 32.5, 29.5, 26.6,
  ];

  for (let i = 0; i < segmentCount; i++) {
    const segment = document.createElement("div");
    segment.classList.add("segment");
    segment.style.transform = `rotate(${angle * i}deg)`;
    segment.style.clipPath = `polygon(50% 0%, 0% 100%, 100% 100%)`;
    segment.style.backgroundColor =
      "#" + Math.floor(Math.random() * 16777215).toString(16);
    segment.style.width = `${widthLookUp[segmentCount]}%`;
    kaleidoscope.appendChild(segment);

    // particle count control
    particleCount.addEventListener("input", function () {
      const gemsAmount = this.value;
      segment.innerHTML = "";
      pcInd.innerText = gemsAmount;

      //add particles
      const gemBox = document.createElement("div");

      for (let i = 0; i < gemsAmount; i++) {
        const gem = document.createElement("div");
        gem.classList.add("gem");
        gem.style.borderColor =
          "#" + Math.floor(Math.random() * 16777215).toString(16);
        gem.style.left = Math.random() * segment.clientWidth + "px";
        gem.style.top = Math.random() * segment.clientHeight + "px";
        gemBox.appendChild(gem);
      }
      segment.appendChild(gemBox);
    });
  }

  saInd.innerText = segmentCount;
});
