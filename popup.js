document.addEventListener('DOMContentLoaded', () => {
    const gymToggle = document.getElementById('gymToggle');

    // Load your saved setting (Defaults to false: Gym standings are visible)
    chrome.storage.local.get(['zenInGyms'], (result) => {
        gymToggle.checked = result.zenInGyms || false;
    });

    // When you click the toggle, save it and refresh the Codeforces tab
    gymToggle.addEventListener('change', () => {
        chrome.storage.local.set({ zenInGyms: gymToggle.checked }, () => {
            chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
                if (tabs[0] && tabs[0].url.includes("codeforces.com/gym")) {
                    chrome.tabs.reload(tabs[0].id);
                }
            });
        });
    });
});