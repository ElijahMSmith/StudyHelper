// Get a reference to the inputs through their IDs
const minutesInput = document.getElementById("minutesInput");
const snoozeButton = document.getElementById("snooze");

// When the snooze button is clicked, snooze by however many seconds are in snoozeButton
snoozeButton.addEventListener("click", function () {
    // Get the number of minutes, 0 if empty and set to zero if it's negative
    // This value is guaranteed to be a number because of the type of the input being "number"
    const minutes = minutesInput.value;
    if (minutes < 0) minutes = 0;

    // Calculate the date the snooze will expire as newDate
    const now = new Date();
    const newDate = new Date(now.getTime() + 60000 * minutes);

    // Stick it in storage!
    chrome.storage.sync.set({ endSnooze: newDate.toJSON() }, function () {
        console.log("Snoozing until", newDate);
    });
});
