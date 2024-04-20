# Bearer Token Capture Script

This script is a JavaScript code snippet that captures Bearer tokens from HTTP requests made using `fetch` or `XMLHttpRequest`. It intercepts the requests and extracts the Bearer token from the `Authorization` header. The captured token is then stored in the `window.capturedToken` variable, which can be accessed using the `window.getCapturedToken()` function.

## Usage

The script is designed to be executed in a browser environment and can be useful for debugging or testing purposes, especially when working with authenticated APIs that require Bearer tokens.

To use this script, simply include it in your console or browser extension. The captured token can be accessed using `window.getCapturedToken()` for further processing or testing.

## Key Features

- 🎣 Intercepts `fetch` and `XMLHttpRequest` requests
- 🔑 Captures Bearer tokens from the `Authorization` header
- 💾 Stores the captured token in the `window.capturedToken` variable
- 📞 Provides a `window.getCapturedToken()` function to retrieve the captured token
- 🛑 Disables further token capture once a token is captured to avoid overwriting


## Important Note

> ⚠️ This script modifies the default behavior of `fetch` and `XMLHttpRequest`, so use it with caution and ensure it aligns with your application's security and privacy requirements.

---

# API Request/Response Capturer

This user script captures API request and response data based on a specified hostname. It allows you to monitor and log the requests and responses made to a specific API endpoint while browsing a website. The captured data is stored in the browser's local storage and can be downloaded as a JSON file for further analysis.

## Features

- Captures API request and response data based on a specified hostname
- Stores captured data in the browser's local storage
- Allows downloading the captured data as a JSON file
- Supports customizable timezone for timestamp formatting
- Easy to use with Tampermonkey or Greasemonkey browser extensions

## Installation

1. Make sure you have either [Tampermonkey](https://www.tampermonkey.net/) (for Chrome) or [Greasemonkey](https://www.greasespot.net/) (for Firefox) browser extension installed.
2. Create a new user script in Tampermonkey or Greasemonkey.
3. Copy and paste the provided script code into the user script editor.
4. Modify the `hostname` variable in the script to match the API endpoint you want to capture data from.
5. Customize the `filename` and `timezone` variables if needed.
6. Save the user script.

## Usage

1. Navigate to a website that makes requests to the specified API endpoint.
2. The script will automatically capture the request and response data for any requests made to the specified hostname.
3. The captured data will be stored in the browser's local storage.
4. To download the captured data as a JSON file, open the browser's developer console and run the following command:
  ```javascript
  downloadCapturedData();
  ```
5. To delete the captured data, run the following command in the browser's developer console:
  ```javascript
  clearCapturedData();