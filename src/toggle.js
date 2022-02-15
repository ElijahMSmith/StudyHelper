const toggleButton = document.getElementById("toggleButton");
const modeLabel = document.getElementById("modeLabel");

let studyMode = false;

toggleButton.addEventListener("click", function () {
    studyMode = !studyMode;
    chrome.storage.sync.set({ mode: studyMode });
    updateLabel();
});

chrome.storage.sync.get({ mode: false }, function (result) {
    console.log("get:\n", result);
    studyMode = result.mode;
    updateLabel();
});

function updateLabel() {
    modeLabel.textContent = "Study Mode: " + (studyMode ? "ON" : "OFF") + "!";
}
