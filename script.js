document.addEventListener('DOMContentLoaded', () => {
    // Function to get cookie value
    function getCookie(name) {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    // Function to set cookie
    function setCookie(name, value, options = {}) {
        options = {
            path: '/',
            // add other defaults as necessary
            ...options
        };

        if (options.expires instanceof Date) {
            options.expires = options.expires.toUTCString();
        }

        let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

        for (let optionKey in options) {
            updatedCookie += "; " + optionKey;
            let optionValue = options[optionKey];
            if (optionValue !== true) {
                updatedCookie += "=" + optionValue;
            }
        }

        document.cookie = updatedCookie;
    }

    // Apply saved preferences if they exist
    const savedFontSize = getCookie('fontsize');
    const savedFontColor = getCookie('fontcolor');

    if (savedFontSize) {
        document.documentElement.style.setProperty('--fontsize', savedFontSize + 'px');
        document.getElementById('fontsize').value = savedFontSize;
    }

    if (savedFontColor) {
        document.documentElement.style.setProperty('--fontcolor', savedFontColor);
        document.getElementById('fontcolor').value = savedFontColor;
    }

    // Handle form submission
    document.getElementById('customizationForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const fontSize = document.getElementById('fontsize').value;
        const fontColor = document.getElementById('fontcolor').value;

        // Set CSS variables
        document.documentElement.style.setProperty('--fontsize', fontSize + 'px');
        document.documentElement.style.setProperty('--fontcolor', fontColor);

        // Save preferences as cookies
        setCookie('fontsize', fontSize, { 'max-age': 3600 * 24 * 365 });
        setCookie('fontcolor', fontColor, { 'max-age': 3600 * 24 * 365 });

        alert('Preferences saved!');
    });
});
