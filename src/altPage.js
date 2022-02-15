const minutesInput = document.getElementById("minutesInput");
const snoozeButton = document.getElementById("snooze");

snoozeButton.addEventListener("click", function () {
    const minutes = Number(minutesInput.value); // 0 if empty
    if (minutes < 0) minutes = 0;

    const now = new Date();
    const newDate = new Date(now.getTime() + 60000 * minutes);
    chrome.storage.sync.set({ endSnooze: newDate.toJSON() }, function () {
        console.log("Snoozing until", newDate);
    });
});
