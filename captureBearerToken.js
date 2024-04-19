(function() {
    let tokenCaptured = false;
    window.capturedToken = null;
    
    window.getCapturedToken = function() {
      return window.capturedToken;
    };
    
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      if (tokenCaptured) return originalFetch(...args);
      
      let headers = {};
      if (args[1] && args[1].headers) {
        if (args[1].headers instanceof Headers) {
          args[1].headers.forEach((value, key) => {
            headers[key] = value;
          });
        } else {
          headers = args[1].headers;
        }
      }
      
      const authorizationHeader = headers['Authorization'] || headers['authorization'];
      if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
        const token = authorizationHeader.split(' ')[1];
        console.log('Captured Bearer Token from fetch:', token);
        window.capturedToken = token;
        tokenCaptured = true;
      }
      
      return originalFetch(...args);
    };
    
    const originalOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url, async, user, password) {
      if (tokenCaptured) return originalOpen.apply(this, arguments);
      
      this.addEventListener('readystatechange', () => {
        if (this.readyState === 4 && !tokenCaptured) {
          const authorizationHeader = this.requestHeaders && (this.requestHeaders['Authorization'] || this.requestHeaders['authorization']);
          if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
            const token = authorizationHeader.split(' ')[1];
            console.log('Captured Bearer Token from XMLHttpRequest:', token);
            window.capturedToken = token;
            tokenCaptured = true;
          }
        }
      }, false);
      
      originalOpen.apply(this, arguments);
    };
    
    const originalSetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;
    XMLHttpRequest.prototype.setRequestHeader = function(header, value) {
      if (!tokenCaptured && header.toLowerCase() === 'authorization' && value.startsWith('Bearer ')) {
        this.requestHeaders = this.requestHeaders || {};
        this.requestHeaders[header] = value;
      }
      originalSetRequestHeader.apply(this, arguments);
    };
  })();