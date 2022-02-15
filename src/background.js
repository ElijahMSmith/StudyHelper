// Gets recreated every time the service worker is restarted
filter = [
    { hostContains: "youtube.com" },
    { hostContains: "instagram.com" },
    { hostContains: "twitter.com" },
    { hostContains: "reddit.com" },
];

chrome.webNavigation.onBeforeNavigate.addListener(
    (details) => {
        chrome.storage.sync.get({ mode: false }, function (modeResult) {
            if (modeResult.mode) {
                chrome.storage.sync.get(
                    { endSnooze: null },
                    function (snoozeResult) {
                        console.log(snoozeResult);

                        console.log(
                            new Date(snoozeResult.endSnooze),
                            "<",
                            new Date()
                        );

                        // https://stackoverflow.com/questions/52838988/retrieving-date-object-from-chrome-storage-not-working
                        if (
                            !snoozeResult.endSnooze ||
                            new Date(snoozeResult.endSnooze) < new Date()
                        ) {
                            chrome.tabs.update(details.tabId, {
                                url: chrome.runtime.getURL(
                                    "/html/altPage.html"
                                ),
                            });
                        }
                    }
                );
            }
        });
    },
    { url: filter }
);
