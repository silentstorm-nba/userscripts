﻿# Bearer Token Capture Script

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
