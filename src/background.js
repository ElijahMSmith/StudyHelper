// Define the urlFilter that we want our webNavigation listener to catch
// Gets recreated every time the service worker is restarted.
filter = [
    // If the host portion of the user's URL CONTAINS (not matches exactly)
    // any of the following, it will trigger the listener
    { hostContains: "youtube.com" },
    { hostContains: "instagram.com" },
    { hostContains: "twitter.com" },
    { hostContains: "reddit.com" },
];

// When chrome navigates to one of the urls matching our urlFilter...
chrome.webNavigation.onBeforeNavigate.addListener(
    (details) => {
        // Get the current system mode and when the most recent snooze expires
        chrome.storage.sync.get(
            { mode: false, endSnooze: null },
            function (result) {
                // If study mode is ON and our most recent snooze either
                // doesn't exist or the expiration date has already passed...
                if (
                    result.mode &&
                    (!result.endSnooze ||
                        new Date(result.endSnooze) < new Date())
                ) {
                    // Update the url of the user's current tab to point to our alternatively defined HTML page
                    // Because this depends on the user's browser, we let chrome figure out the exact URL
                    chrome.tabs.update(details.tabId, {
                        url: chrome.runtime.getURL("/html/altPage.html"),
                    });
                }
            }
        );
    },
    { url: filter }
);
