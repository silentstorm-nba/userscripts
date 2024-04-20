// ==UserScript==
// @name         API Request/Response Capturer
// @namespace    http://tampermonkey.net/
// @version      2.4
// @description  Captures API request and response data based on hostname
// @author       Nagendra Adisesha
// @match        http://*/*
// @match        https://*/*
// @grant        none
// @license      MIT
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    const hostname = 'example.com';
    const filename = 'captured_data.json';
    const storageKey = 'capturedData';
    const timezone = 'Australia/Sydney'; // Change this to your preferred timezone

    let capturedData = [];

    // Load captured data from local storage
    function loadData() {
        const storedData = localStorage.getItem(storageKey);
        if (storedData) {
            capturedData = JSON.parse(storedData);
        }
    }
    loadData();

    const originalXMLHttpRequest = window.XMLHttpRequest;
    window.XMLHttpRequest = function() {
        const xhr = new originalXMLHttpRequest();
        let method, body;

        xhr.open = ((original) => function(methodArg, url, async, user, password) {
            method = methodArg; // Capture method
            original.call(this, method, url, async, user, password);
        })(xhr.open);

        xhr.send = ((original) => function(data) {
            body = data; // Capture body
            original.call(this, data);
        })(xhr.send);

        xhr.addEventListener('load', function() {
            if (this.responseURL.includes(hostname)) {
                const options = { timeZone: timezone, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
                const timestamp = new Date().toLocaleString('en-US', options).replace(/[\u200E\u200F]/g, '');

                const requestData = {
                    requestUrl: this.responseURL,
                    requestMethod: method,
                    requestBody: body,
                    timestamp: timestamp
                };

                const responseData = {
                    responseCode: this.status,
                    responseBody: this.responseText,
                    timestamp: timestamp
                };

                capturedData.push({
                    request: requestData,
                    response: responseData
                });

                // Save captured data to local storage
                localStorage.setItem(storageKey, JSON.stringify(capturedData));
            }
        });

        return xhr;
    };

    function downloadCapturedData() {
        const jsonData = JSON.stringify(capturedData, null, 2);
        const blob = new Blob([jsonData], {type: 'application/json'});
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();

        setTimeout(() => {
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }, 100);
    }

    // Function to clear both in-memory and local storage data
    function clearCapturedData() {
        localStorage.removeItem(storageKey); // Remove from local storage
        capturedData = []; // Clear the in-memory data array
        console.log('All captured data cleared.');
    }

    // Expose the clear and download functions to the global scope
    window.clearCapturedData = clearCapturedData;
    window.downloadCapturedData = downloadCapturedData;
})();
