// Get a reference to the elements by their IDs
const toggleButton = document.getElementById("toggleButton");
const modeLabel = document.getElementById("modeLabel");

let studyMode = false;

// Change the text on our label to reflect the current mode
function updateLabel() {
    modeLabel.textContent = "Study Mode: " + (studyMode ? "ON" : "OFF") + "!";
}

// When the toggle button is clicked...
toggleButton.addEventListener("click", function () {
    // Change study mode and update the popup to show the right value
    studyMode = !studyMode;
    chrome.storage.sync.set({ mode: studyMode });
    updateLabel();
});

// Get the up-to-date mode from chrome storage and update the popup to show it
chrome.storage.sync.get({ mode: false }, function (result) {
    console.log("get:\n", result);
    studyMode = result.mode;
    updateLabel();
});
